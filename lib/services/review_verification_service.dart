import 'package:cloud_firestore/cloud_firestore.dart';
import '../core/models/booking.dart';

/// Service to verify if users can review each other
/// Only allows reviews after a completed transaction/booking
class ReviewVerificationService {
  static final ReviewVerificationService _instance =
      ReviewVerificationService._internal();
  factory ReviewVerificationService() => _instance;
  ReviewVerificationService._internal();

  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  /// Check if a user can review another user
  /// Returns true only if they have completed a booking together
  Future<bool> canUserReviewUser({
    required String reviewerId,
    required String targetUserId,
  }) async {
    try {
      // Check bookings where these two users interacted
      // Case 1: Reviewer is sender, target is traveler
      final senderQuery = await _firestore
          .collection('bookings')
          .where('senderId', isEqualTo: reviewerId)
          .where('travelerId', isEqualTo: targetUserId)
          .where('status', isEqualTo: BookingStatus.completed.name)
          .limit(1)
          .get();

      if (senderQuery.docs.isNotEmpty) {
        return true;
      }

      // Case 2: Reviewer is traveler, target is sender
      final travelerQuery = await _firestore
          .collection('bookings')
          .where('travelerId', isEqualTo: reviewerId)
          .where('senderId', isEqualTo: targetUserId)
          .where('status', isEqualTo: BookingStatus.completed.name)
          .limit(1)
          .get();

      if (travelerQuery.docs.isNotEmpty) {
        return true;
      }

      return false;
    } catch (e) {
      print('❌ Error checking review eligibility: $e');
      return false;
    }
  }

  /// Get all completed bookings between two users
  Future<List<String>> getCompletedBookingIds({
    required String user1Id,
    required String user2Id,
  }) async {
    try {
      final bookingIds = <String>[];

      // Get bookings where user1 is sender and user2 is traveler
      final query1 = await _firestore
          .collection('bookings')
          .where('senderId', isEqualTo: user1Id)
          .where('travelerId', isEqualTo: user2Id)
          .where('status', isEqualTo: BookingStatus.completed.name)
          .get();

      bookingIds.addAll(query1.docs.map((doc) => doc.id));

      // Get bookings where user2 is sender and user1 is traveler
      final query2 = await _firestore
          .collection('bookings')
          .where('senderId', isEqualTo: user2Id)
          .where('travelerId', isEqualTo: user1Id)
          .where('status', isEqualTo: BookingStatus.completed.name)
          .get();

      bookingIds.addAll(query2.docs.map((doc) => doc.id));

      return bookingIds;
    } catch (e) {
      print('❌ Error getting completed bookings: $e');
      return [];
    }
  }

  /// Check if user has already reviewed a booking
  Future<bool> hasUserReviewedBooking({
    required String reviewerId,
    required String bookingId,
  }) async {
    try {
      final query = await _firestore
          .collection('reviews')
          .where('reviewerId', isEqualTo: reviewerId)
          .where('bookingId', isEqualTo: bookingId)
          .limit(1)
          .get();

      return query.docs.isNotEmpty;
    } catch (e) {
      print('❌ Error checking if user reviewed booking: $e');
      return true; // Fail safe: assume already reviewed
    }
  }

  /// Get bookings that need review from a user
  /// Returns bookings where user participated but hasn't reviewed yet
  Future<List<Map<String, dynamic>>> getPendingReviewBookings(
      String userId) async {
    try {
      final pendingReviews = <Map<String, dynamic>>[];

      // Get completed bookings as sender
      final senderBookings = await _firestore
          .collection('bookings')
          .where('senderId', isEqualTo: userId)
          .where('status', isEqualTo: BookingStatus.completed.name)
          .get();

      for (var doc in senderBookings.docs) {
        final bookingId = doc.id;
        final hasReviewed = await hasUserReviewedBooking(
            reviewerId: userId, bookingId: bookingId);

        if (!hasReviewed) {
          final data = doc.data();
          pendingReviews.add({
            'bookingId': bookingId,
            'packageId': data['packageId'],
            'otherUserId': data['travelerId'],
            'otherUserRole': 'traveler',
            'completedAt': (data['completedAt'] as Timestamp?)?.toDate(),
          });
        }
      }

      // Get completed bookings as traveler
      final travelerBookings = await _firestore
          .collection('bookings')
          .where('travelerId', isEqualTo: userId)
          .where('status', isEqualTo: BookingStatus.completed.name)
          .get();

      for (var doc in travelerBookings.docs) {
        final bookingId = doc.id;
        final hasReviewed = await hasUserReviewedBooking(
            reviewerId: userId, bookingId: bookingId);

        if (!hasReviewed) {
          final data = doc.data();
          pendingReviews.add({
            'bookingId': bookingId,
            'packageId': data['packageId'],
            'otherUserId': data['senderId'],
            'otherUserRole': 'sender',
            'completedAt': (data['completedAt'] as Timestamp?)?.toDate(),
          });
        }
      }

      return pendingReviews;
    } catch (e) {
      print('❌ Error getting pending reviews: $e');
      return [];
    }
  }

  /// Verify transaction exists using delivery tracking
  Future<bool> verifyDeliveryCompleted({
    required String senderId,
    required String travelerId,
  }) async {
    try {
      final query = await _firestore
          .collection('deliveryTracking')
          .where('senderId', isEqualTo: senderId)
          .where('travelerId', isEqualTo: travelerId)
          .where('status', isEqualTo: 'delivered')
          .where('senderConfirmed', isEqualTo: true)
          .limit(1)
          .get();

      return query.docs.isNotEmpty;
    } catch (e) {
      print('❌ Error verifying delivery: $e');
      return false;
    }
  }
}
