import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/foundation.dart';

/// Platform configuration service - fetches dynamic settings from Firestore
class PlatformConfigService {
  static final PlatformConfigService _instance =
      PlatformConfigService._internal();
  factory PlatformConfigService() => _instance;
  PlatformConfigService._internal();

  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  // Cache the platform fee to avoid excessive Firestore reads
  double? _cachedPlatformFeePercent;
  DateTime? _cacheTimestamp;

  // Cache duration (5 minutes)
  static const Duration _cacheDuration = Duration(minutes: 5);

  /// Get platform fee percentage (returns decimal, e.g., 0.1 for 10%)
  /// Falls back to 0% if Firestore read fails or document doesn't exist
  Future<double> getPlatformFeePercent() async {
    try {
      // Check cache first
      if (_cachedPlatformFeePercent != null &&
          _cacheTimestamp != null &&
          DateTime.now().difference(_cacheTimestamp!) < _cacheDuration) {
        if (kDebugMode) {
          print(
              '📋 Using cached platform fee: ${_cachedPlatformFeePercent! * 100}%');
        }
        return _cachedPlatformFeePercent!;
      }

      if (kDebugMode) {
        print('🔄 Fetching platform fee from Firestore...');
      }

      // Fetch from Firestore
      final settingsDoc =
          await _firestore.collection('platformSettings').doc('general').get();

      if (settingsDoc.exists) {
        final data = settingsDoc.data();
        final feePercent =
            (data?['platformFeePercent'] as num?)?.toDouble() ?? 0.0;

        // Convert percentage to decimal (e.g., 10% -> 0.1)
        final feeDecimal = feePercent / 100;

        // Update cache
        _cachedPlatformFeePercent = feeDecimal;
        _cacheTimestamp = DateTime.now();

        if (kDebugMode) {
          print('✅ Platform fee loaded: $feePercent% (${feeDecimal})');
        }

        return feeDecimal;
      } else {
        if (kDebugMode) {
          print('⚠️ Platform settings document not found');
        }

        // Cache 0% value
        _cachedPlatformFeePercent = 0.0;
        _cacheTimestamp = DateTime.now();

        return 0.0;
      }
    } catch (e) {
      if (kDebugMode) {
        print('❌ Error fetching platform fee: $e');
        print('⚠️ Returning 0% due to error');
      }

      // Cache 0% value even on error
      _cachedPlatformFeePercent = 0.0;
      _cacheTimestamp = DateTime.now();

      return 0.0;
    }
  }

  /// Clear the cache (useful when you want to force a fresh fetch)
  void clearCache() {
    _cachedPlatformFeePercent = null;
    _cacheTimestamp = null;

    if (kDebugMode) {
      print('🗑️ Platform fee cache cleared');
    }
  }

  /// Calculate platform fee for a given amount
  Future<double> calculatePlatformFee(double amount) async {
    final feePercent = await getPlatformFeePercent();
    return amount * feePercent;
  }

  /// Calculate total amount (service fee + platform fee)
  Future<double> calculateTotalAmount(double serviceFee) async {
    final platformFee = await calculatePlatformFee(serviceFee);
    return serviceFee + platformFee;
  }

  /// Calculate traveler payout (service fee - platform fee)
  Future<double> calculateTravelerPayout(double serviceFee) async {
    final platformFee = await calculatePlatformFee(serviceFee);
    return serviceFee - platformFee;
  }

  /// Get fee breakdown for display
  Future<Map<String, double>> getFeeBreakdown(double serviceFee) async {
    final feePercent = await getPlatformFeePercent();
    final platformFee = serviceFee * feePercent;
    final totalAmount = serviceFee + platformFee;
    final travelerPayout = serviceFee - platformFee;

    return {
      'serviceFee': serviceFee,
      'platformFeePercent':
          feePercent * 100, // Convert back to percentage for display
      'platformFee': platformFee,
      'totalAmount': totalAmount,
      'travelerPayout': travelerPayout,
    };
  }
}
