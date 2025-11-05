import 'dart:math';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:get/get.dart';

/// Service to manage OTP verification for secure delivery confirmation
/// Ensures both traveler and receiver are present during package handoff
class DeliveryOTPService extends GetxController {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  static const int OTP_LENGTH = 6;
  static const int OTP_EXPIRY_MINUTES = 10; // OTP expires in 10 minutes

  @override
  void onInit() {
    super.onInit();
    print('✅ DeliveryOTPService initialized');
  }

  /// Generate a random 6-digit OTP code
  String _generateOTPCode() {
    final random = Random.secure();
    final code = random.nextInt(999999).toString().padLeft(OTP_LENGTH, '0');
    return code;
  }

  /// Generate OTP for delivery confirmation
  /// Called by traveler when they arrive at delivery location
  Future<String> generateDeliveryOTP({
    required String trackingId,
    required String packageRequestId,
    required String senderId,
    required String travelerId,
  }) async {
    try {
      print('🔐 Generating delivery OTP for tracking: $trackingId');

      // Generate OTP code
      final otpCode = _generateOTPCode();
      final now = DateTime.now();
      final expiresAt = now.add(Duration(minutes: OTP_EXPIRY_MINUTES));

      // Update tracking document with OTP details
      await _firestore.collection('deliveryTracking').doc(trackingId).update({
        'deliveryOTP': otpCode,
        'otpGeneratedAt': Timestamp.fromDate(now),
        'otpExpiresAt': Timestamp.fromDate(expiresAt),
        'otpVerified': false,
        'otpVerifiedAt': null,
        'updatedAt': FieldValue.serverTimestamp(),
      });

      print('✅ OTP generated successfully: $otpCode (expires at $expiresAt)');
      return otpCode;
    } catch (e) {
      print('❌ Error generating delivery OTP: $e');
      rethrow;
    }
  }

  /// Verify OTP entered by traveler
  /// Returns true if OTP is valid and not expired
  Future<bool> verifyDeliveryOTP({
    required String trackingId,
    required String enteredOTP,
  }) async {
    try {
      print('🔍 Verifying OTP for tracking: $trackingId');

      // Get tracking document
      final trackingDoc =
          await _firestore.collection('deliveryTracking').doc(trackingId).get();

      if (!trackingDoc.exists) {
        throw Exception('Tracking record not found');
      }

      final data = trackingDoc.data()!;
      final storedOTP = data['deliveryOTP'] as String?;
      final otpExpiresAt = (data['otpExpiresAt'] as Timestamp?)?.toDate();
      final otpVerified = data['otpVerified'] as bool? ?? false;

      // Check if OTP exists
      if (storedOTP == null || storedOTP.isEmpty) {
        print('❌ No OTP found for this delivery');
        throw Exception('No OTP found. Please generate OTP first.');
      }

      // Check if already verified
      if (otpVerified) {
        print('⚠️ OTP already verified');
        throw Exception('This delivery has already been verified.');
      }

      // Check if OTP has expired
      if (otpExpiresAt != null && DateTime.now().isAfter(otpExpiresAt)) {
        print('❌ OTP expired');
        throw Exception('OTP has expired. Please generate a new OTP.');
      }

      // Verify OTP matches
      if (enteredOTP.trim() != storedOTP) {
        print('❌ Invalid OTP entered');
        throw Exception('Invalid OTP code. Please try again.');
      }

      // OTP is valid - mark as verified
      await _firestore.collection('deliveryTracking').doc(trackingId).update({
        'otpVerified': true,
        'otpVerifiedAt': FieldValue.serverTimestamp(),
        'updatedAt': FieldValue.serverTimestamp(),
      });

      print('✅ OTP verified successfully');
      return true;
    } catch (e) {
      print('❌ Error verifying OTP: $e');
      rethrow;
    }
  }

  /// Check if OTP is still valid (not expired)
  Future<bool> isOTPValid(String trackingId) async {
    try {
      final trackingDoc =
          await _firestore.collection('deliveryTracking').doc(trackingId).get();

      if (!trackingDoc.exists) {
        return false;
      }

      final data = trackingDoc.data()!;
      final otpExpiresAt = (data['otpExpiresAt'] as Timestamp?)?.toDate();
      final otpVerified = data['otpVerified'] as bool? ?? false;
      final storedOTP = data['deliveryOTP'] as String?;

      if (storedOTP == null || storedOTP.isEmpty) {
        return false;
      }

      if (otpVerified) {
        return true; // Already verified
      }

      if (otpExpiresAt != null && DateTime.now().isAfter(otpExpiresAt)) {
        return false; // Expired
      }

      return true; // Valid
    } catch (e) {
      print('❌ Error checking OTP validity: $e');
      return false;
    }
  }

  /// Get OTP details for display to receiver
  Future<Map<String, dynamic>?> getOTPDetails(String trackingId) async {
    try {
      final trackingDoc =
          await _firestore.collection('deliveryTracking').doc(trackingId).get();

      if (!trackingDoc.exists) {
        return null;
      }

      final data = trackingDoc.data()!;
      final otpCode = data['deliveryOTP'] as String?;
      final otpGeneratedAt = (data['otpGeneratedAt'] as Timestamp?)?.toDate();
      final otpExpiresAt = (data['otpExpiresAt'] as Timestamp?)?.toDate();
      final otpVerified = data['otpVerified'] as bool? ?? false;

      if (otpCode == null || otpCode.isEmpty) {
        return null;
      }

      return {
        'code': otpCode,
        'generatedAt': otpGeneratedAt,
        'expiresAt': otpExpiresAt,
        'verified': otpVerified,
        'isExpired':
            otpExpiresAt != null && DateTime.now().isAfter(otpExpiresAt),
        'remainingSeconds': otpExpiresAt != null
            ? otpExpiresAt.difference(DateTime.now()).inSeconds
            : 0,
      };
    } catch (e) {
      print('❌ Error getting OTP details: $e');
      return null;
    }
  }

  /// Clear/invalidate OTP (in case of cancellation or issues)
  Future<void> clearOTP(String trackingId) async {
    try {
      await _firestore.collection('deliveryTracking').doc(trackingId).update({
        'deliveryOTP': null,
        'otpGeneratedAt': null,
        'otpExpiresAt': null,
        'otpVerified': false,
        'otpVerifiedAt': null,
        'updatedAt': FieldValue.serverTimestamp(),
      });

      print('✅ OTP cleared for tracking: $trackingId');
    } catch (e) {
      print('❌ Error clearing OTP: $e');
      rethrow;
    }
  }

  /// Check if delivery can proceed with OTP verification
  /// Returns true if tracking is in correct state for OTP flow
  Future<bool> canGenerateOTP(String trackingId) async {
    try {
      final trackingDoc =
          await _firestore.collection('deliveryTracking').doc(trackingId).get();

      if (!trackingDoc.exists) {
        return false;
      }

      final data = trackingDoc.data()!;
      final status = data['status'] as String?;
      final otpVerified = data['otpVerified'] as bool? ?? false;

      // Can generate OTP only if status is in_transit or picked_up and not yet verified
      return (status == 'in_transit' || status == 'picked_up') && !otpVerified;
    } catch (e) {
      print('❌ Error checking OTP generation eligibility: $e');
      return false;
    }
  }

  /// Get time remaining for OTP in seconds
  Future<int> getOTPRemainingTime(String trackingId) async {
    try {
      final details = await getOTPDetails(trackingId);
      if (details == null) {
        return 0;
      }
      return details['remainingSeconds'] as int? ?? 0;
    } catch (e) {
      print('❌ Error getting OTP remaining time: $e');
      return 0;
    }
  }
}
