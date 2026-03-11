import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/foundation.dart';
import 'package:package_info_plus/package_info_plus.dart';
import 'dart:io' show Platform;

/// Service for handling user moderation: reporting content and blocking users
/// Implements Apple App Store Guideline 1.2 requirements for user-generated content
class ModerationService {
  static final ModerationService _instance = ModerationService._internal();
  factory ModerationService() => _instance;
  ModerationService._internal();

  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final FirebaseAuth _auth = FirebaseAuth.instance;

  String? get _currentUserId => _auth.currentUser?.uid;

  // Rate limiting for reports (max 10 reports per hour per user)
  final Map<String, List<DateTime>> _reportTimestamps = {};
  static const int _maxReportsPerHour = 10;

  /// Report user-generated content for moderation review
  ///
  /// [reportedUserId] - ID of the user who created the content
  /// [contentId] - ID of the content being reported (message ID, post ID, etc.)
  /// [contentType] - Type of content: 'message', 'post', 'comment', 'trip', 'package', 'profile'
  /// [reason] - Reason for report: 'spam', 'harassment', 'hate_speech', 'inappropriate', 'violence', 'scam', 'other'
  /// [notes] - Optional additional details from the reporter
  Future<bool> reportContent({
    required String reportedUserId,
    required String contentId,
    required String contentType,
    required String reason,
    String? notes,
  }) async {
    try {
      if (_currentUserId == null) {
        throw Exception('User not authenticated');
      }

      // Cannot report own content
      if (_currentUserId == reportedUserId &&
          !['message', 'comment', 'post'].contains(contentType)) {
        throw Exception('Cannot report your own content');
      }

      // Rate limiting check
      if (!_checkRateLimit()) {
        throw Exception(
            'Too many reports. Please wait before reporting again.');
      }

      // Get app version and device info
      final packageInfo = await PackageInfo.fromPlatform();
      final deviceInfo = kIsWeb
          ? 'web'
          : Platform.isAndroid
              ? 'android'
              : Platform.isIOS
                  ? 'ios'
                  : 'unknown';

      final report = {
        'reporterId': _currentUserId,
        'reportedUserId': reportedUserId,
        'contentId': contentId,
        'contentType': contentType,
        'reason': reason,
        'notes': notes ?? '',
        'appVersion': packageInfo.version,
        'deviceInfo': deviceInfo,
        'timestamp': FieldValue.serverTimestamp(),
        'status': 'open',
      };

      await _firestore.collection('reports').add(report);

      // Update rate limit tracker
      _recordReport();

      if (kDebugMode) {
        print('✅ Content reported successfully: $contentType ($contentId)');
      }

      return true;
    } catch (e) {
      if (kDebugMode) {
        print('❌ Error reporting content: $e');
      }
      rethrow;
    }
  }

  /// Block a user - prevents seeing their content in the app
  ///
  /// [blockedUserId] - ID of the user to block
  /// Returns true if successful, throws exception on error
  Future<bool> blockUser(String blockedUserId) async {
    try {
      if (_currentUserId == null) {
        throw Exception('User not authenticated');
      }

      if (_currentUserId == blockedUserId) {
        throw Exception('Cannot block yourself');
      }

      final blockRef = _firestore
          .collection('users')
          .doc(_currentUserId)
          .collection('blocked')
          .doc(blockedUserId);

      await blockRef.set({
        'blockedAt': FieldValue.serverTimestamp(),
      });

      if (kDebugMode) {
        print('✅ User blocked successfully: $blockedUserId');
      }

      return true;
    } catch (e) {
      if (kDebugMode) {
        print('❌ Error blocking user: $e');
      }
      rethrow;
    }
  }

  /// Unblock a previously blocked user
  ///
  /// [blockedUserId] - ID of the user to unblock
  Future<bool> unblockUser(String blockedUserId) async {
    try {
      if (_currentUserId == null) {
        throw Exception('User not authenticated');
      }

      final blockRef = _firestore
          .collection('users')
          .doc(_currentUserId)
          .collection('blocked')
          .doc(blockedUserId);

      await blockRef.delete();

      if (kDebugMode) {
        print('✅ User unblocked successfully: $blockedUserId');
      }

      return true;
    } catch (e) {
      if (kDebugMode) {
        print('❌ Error unblocking user: $e');
      }
      rethrow;
    }
  }

  /// Check if a user is blocked by the current user
  Future<bool> isUserBlocked(String userId) async {
    if (_currentUserId == null) return false;

    final blockRef = _firestore
        .collection('users')
        .doc(_currentUserId)
        .collection('blocked')
        .doc(userId);

    final doc = await blockRef.get();
    return doc.exists;
  }

  /// Get list of all blocked user IDs for current user
  Future<List<String>> getBlockedUserIds() async {
    if (_currentUserId == null) return [];

    final snapshot = await _firestore
        .collection('users')
        .doc(_currentUserId)
        .collection('blocked')
        .get();

    return snapshot.docs.map((doc) => doc.id).toList();
  }

  /// Stream of blocked user IDs for real-time updates
  Stream<List<String>> blockedUsersStream() {
    if (_currentUserId == null) {
      return Stream.value([]);
    }

    return _firestore
        .collection('users')
        .doc(_currentUserId)
        .collection('blocked')
        .snapshots()
        .map((snapshot) => snapshot.docs.map((doc) => doc.id).toList());
  }

  // Rate limiting helpers
  bool _checkRateLimit() {
    if (_currentUserId == null) return false;

    final now = DateTime.now();
    final oneHourAgo = now.subtract(const Duration(hours: 1));

    // Clean old timestamps
    _reportTimestamps[_currentUserId!] =
        (_reportTimestamps[_currentUserId] ?? [])
            .where((timestamp) => timestamp.isAfter(oneHourAgo))
            .toList();

    // Check if under limit
    return (_reportTimestamps[_currentUserId!] ?? []).length <
        _maxReportsPerHour;
  }

  void _recordReport() {
    if (_currentUserId == null) return;

    _reportTimestamps[_currentUserId!] =
        (_reportTimestamps[_currentUserId!] ?? [])..add(DateTime.now());
  }

  /// Get available report reasons for UI display
  static List<Map<String, String>> getReportReasons() {
    return [
      {'value': 'spam', 'label': 'Spam or misleading'},
      {'value': 'harassment', 'label': 'Harassment or bullying'},
      {'value': 'hate_speech', 'label': 'Hate speech'},
      {'value': 'inappropriate', 'label': 'Inappropriate content'},
      {'value': 'violence', 'label': 'Violence or threats'},
      {'value': 'scam', 'label': 'Scam or fraud'},
      {'value': 'other', 'label': 'Other'},
    ];
  }
}
