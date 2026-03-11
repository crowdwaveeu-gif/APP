import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../core/models/dispute.dart';

class DisputeService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  static const String _collectionName = 'disputes';

  /// Generate a unique dispute ID
  String _generateDisputeId() {
    final timestamp = DateTime.now().millisecondsSinceEpoch;
    final random = DateTime.now().microsecondsSinceEpoch % 1000;
    return 'DSP-$timestamp-$random';
  }

  /// Create a new dispute
  Future<String> createDispute({
    required String bookingId,
    required String reportedUserId,
    required DisputeReason reason,
    required String description,
    List<String> evidence = const [],
  }) async {
    try {
      final currentUser = FirebaseAuth.instance.currentUser;
      if (currentUser == null) {
        throw Exception('User not authenticated');
      }

      // Fetch reporter user details for admin display
      String reporterName = 'Unknown User';
      String reporterEmail = currentUser.email ?? 'No email';
      try {
        final reporterDoc =
            await _firestore.collection('users').doc(currentUser.uid).get();
        if (reporterDoc.exists) {
          final reporterData = reporterDoc.data();
          reporterName = reporterData?['fullName'] ??
              reporterData?['username'] ??
              'Unknown User';
          reporterEmail =
              reporterData?['email'] ?? currentUser.email ?? 'No email';
        }
      } catch (e) {
        print('⚠️ Could not fetch reporter details: $e');
      }

      // Fetch reported user details for admin display
      String reportedUserName = 'Unknown User';
      String reportedUserEmail = 'No email';
      try {
        final reportedDoc =
            await _firestore.collection('users').doc(reportedUserId).get();
        if (reportedDoc.exists) {
          final reportedData = reportedDoc.data();
          reportedUserName = reportedData?['fullName'] ??
              reportedData?['username'] ??
              'Unknown User';
          reportedUserEmail = reportedData?['email'] ?? 'No email';
        }
      } catch (e) {
        print('⚠️ Could not fetch reported user details: $e');
      }

      final dispute = Dispute(
        id: '', // Will be set by Firestore
        bookingId: bookingId,
        reporterId: currentUser.uid,
        reportedUserId: reportedUserId,
        reason: reason,
        description: description,
        evidence: evidence,
        status: DisputeStatus.pending,
        createdAt: DateTime.now(),
      );

      // Generate dispute ID for easy reference
      final disputeId = _generateDisputeId();

      final docRef = await _firestore.collection(_collectionName).add({
        ...dispute.toFirestore(),
        'disputeId': disputeId,
        // Add user-friendly fields for admin panel
        'reporterName': reporterName,
        'reporterEmail': reporterEmail,
        'reportedUserName': reportedUserName,
        'reportedUserEmail': reportedUserEmail,
        'reasonDisplayText': dispute.reasonDisplayText,
        'statusDisplayText': dispute.statusDisplayText,
        'evidenceCount': evidence.length,
      });

      print('✅ Dispute created: ${docRef.id}');
      print('   Dispute ID: $disputeId');
      print('   Reporter: $reporterName ($reporterEmail)');
      print('   Reported: $reportedUserName ($reportedUserEmail)');
      print('   Reason: ${dispute.reasonDisplayText}');
      print('   Evidence: ${evidence.length} file(s)');

      return docRef.id;
    } catch (e) {
      print('❌ Error creating dispute: $e');
      rethrow;
    }
  }

  /// Get all disputes for the current user (as reporter or reported)
  Future<List<Dispute>> getUserDisputes() async {
    try {
      final currentUser = FirebaseAuth.instance.currentUser;
      if (currentUser == null) {
        throw Exception('User not authenticated');
      }

      // Get disputes where user is the reporter
      final reporterQuery = await _firestore
          .collection(_collectionName)
          .where('reporterId', isEqualTo: currentUser.uid)
          .orderBy('createdAt', descending: true)
          .get();

      // Get disputes where user is reported
      final reportedQuery = await _firestore
          .collection(_collectionName)
          .where('reportedUserId', isEqualTo: currentUser.uid)
          .orderBy('createdAt', descending: true)
          .get();

      final disputes = <Dispute>[];
      final disputeIds = <String>{};

      // Add reporter disputes
      for (var doc in reporterQuery.docs) {
        if (!disputeIds.contains(doc.id)) {
          disputeIds.add(doc.id);
          disputes.add(Dispute.fromFirestore(doc));
        }
      }

      // Add reported disputes
      for (var doc in reportedQuery.docs) {
        if (!disputeIds.contains(doc.id)) {
          disputeIds.add(doc.id);
          disputes.add(Dispute.fromFirestore(doc));
        }
      }

      // Sort by creation date
      disputes.sort((a, b) => b.createdAt.compareTo(a.createdAt));

      return disputes;
    } catch (e) {
      print('❌ Error fetching user disputes: $e');
      rethrow;
    }
  }

  /// Get disputes for a specific booking
  Future<List<Dispute>> getBookingDisputes(String bookingId) async {
    try {
      final querySnapshot = await _firestore
          .collection(_collectionName)
          .where('bookingId', isEqualTo: bookingId)
          .get();

      // Sort in memory instead of using Firestore orderBy to avoid index requirement
      final disputes =
          querySnapshot.docs.map((doc) => Dispute.fromFirestore(doc)).toList();

      disputes.sort((a, b) => b.createdAt.compareTo(a.createdAt));

      return disputes;
    } catch (e) {
      print('❌ Error fetching booking disputes: $e');
      rethrow;
    }
  }

  /// Get a single dispute by ID
  Future<Dispute?> getDispute(String disputeId) async {
    try {
      final doc =
          await _firestore.collection(_collectionName).doc(disputeId).get();

      if (!doc.exists) {
        return null;
      }

      return Dispute.fromFirestore(doc);
    } catch (e) {
      print('❌ Error fetching dispute: $e');
      rethrow;
    }
  }

  /// Add evidence to an existing dispute
  Future<void> addEvidence(String disputeId, List<String> newEvidence) async {
    try {
      final dispute = await getDispute(disputeId);
      if (dispute == null) {
        throw Exception('Dispute not found');
      }

      final updatedEvidence = [...dispute.evidence, ...newEvidence];

      await _firestore.collection(_collectionName).doc(disputeId).update({
        'evidence': updatedEvidence,
      });

      print('✅ Evidence added to dispute: $disputeId');
    } catch (e) {
      print('❌ Error adding evidence: $e');
      rethrow;
    }
  }

  /// Stream disputes for real-time updates
  Stream<List<Dispute>> streamUserDisputes() {
    final currentUser = FirebaseAuth.instance.currentUser;
    if (currentUser == null) {
      return Stream.value([]);
    }

    // Stream disputes where user is reporter
    final reporterStream = _firestore
        .collection(_collectionName)
        .where('reporterId', isEqualTo: currentUser.uid)
        .orderBy('createdAt', descending: true)
        .snapshots();

    return reporterStream.map((snapshot) {
      return snapshot.docs.map((doc) => Dispute.fromFirestore(doc)).toList();
    });
  }

  /// Stream a single dispute
  Stream<Dispute?> streamDispute(String disputeId) {
    return _firestore
        .collection(_collectionName)
        .doc(disputeId)
        .snapshots()
        .map((doc) {
      if (!doc.exists) {
        return null;
      }
      return Dispute.fromFirestore(doc);
    });
  }

  /// Check if user can create a dispute for a booking
  Future<bool> canCreateDispute(String bookingId) async {
    try {
      final currentUser = FirebaseAuth.instance.currentUser;
      if (currentUser == null) {
        print('❌ Cannot create dispute: User not authenticated');
        return false;
      }

      // Check if user already has an open dispute for this booking
      // Use a simpler query that doesn't require a composite index
      final existingDisputes = await _firestore
          .collection(_collectionName)
          .where('bookingId', isEqualTo: bookingId)
          .where('reporterId', isEqualTo: currentUser.uid)
          .get();

      if (existingDisputes.docs.isEmpty) {
        print('✅ No existing disputes found - user can create dispute');
        return true;
      }

      // Check if any of the disputes are still open
      final disputes = existingDisputes.docs
          .map((doc) => Dispute.fromFirestore(doc))
          .toList();

      final openDisputes = disputes
          .where((dispute) =>
              dispute.status == DisputeStatus.pending ||
              dispute.status == DisputeStatus.underReview ||
              dispute.status == DisputeStatus.escalated)
          .toList();

      if (openDisputes.isEmpty) {
        print('✅ No open disputes found - user can create dispute');
        return true;
      } else {
        print(
            '⚠️ Found ${openDisputes.length} open dispute(s) - cannot create new one');
        return false;
      }
    } catch (e) {
      print('❌ Error checking dispute eligibility: $e');
      // If there's an error checking, allow the user to proceed
      // This prevents blocking users when there are Firebase issues
      print('⚠️ Allowing dispute creation due to check error');
      return true;
    }
  }

  /// Get dispute statistics for user
  Future<Map<String, int>> getUserDisputeStats() async {
    try {
      final disputes = await getUserDisputes();

      return {
        'total': disputes.length,
        'pending':
            disputes.where((d) => d.status == DisputeStatus.pending).length,
        'underReview':
            disputes.where((d) => d.status == DisputeStatus.underReview).length,
        'resolved':
            disputes.where((d) => d.status == DisputeStatus.resolved).length,
        'dismissed':
            disputes.where((d) => d.status == DisputeStatus.dismissed).length,
        'escalated':
            disputes.where((d) => d.status == DisputeStatus.escalated).length,
      };
    } catch (e) {
      print('❌ Error fetching dispute stats: $e');
      return {};
    }
  }
}
