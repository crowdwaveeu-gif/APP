import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import '../models/review_model.dart';
import '../services/review_verification_service.dart';
import '../services/auth_state_service.dart';
import '../presentation/reviews/create_review_screen.dart';

/// Widget to prompt users to review after completing a booking
class ReviewPromptWidget extends StatelessWidget {
  final String bookingId;
  final String packageId;
  final String otherUserId;
  final String otherUserName;
  final String otherUserRole; // 'traveler' or 'sender'
  final VoidCallback? onReviewSubmitted;

  const ReviewPromptWidget({
    Key? key,
    required this.bookingId,
    required this.packageId,
    required this.otherUserId,
    required this.otherUserName,
    required this.otherUserRole,
    this.onReviewSubmitted,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.all(16),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            const Color(0xFF215C5C),
            const Color(0xFF2D7A6E),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: const Color(0xFF215C5C).withOpacity(0.3),
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.2),
              shape: BoxShape.circle,
            ),
            child: const Icon(
              Icons.rate_review,
              size: 48,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 16),
          Text(
            'reviews.how_was_experience'.tr(),
            style: const TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 8),
          Text(
            'reviews.help_community'.tr(args: [otherUserName]),
            style: TextStyle(
              fontSize: 14,
              color: Colors.white.withOpacity(0.9),
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 20),
          Row(
            children: [
              Expanded(
                child: OutlinedButton(
                  onPressed: () => Navigator.pop(context),
                  style: OutlinedButton.styleFrom(
                    foregroundColor: Colors.white,
                    side: const BorderSide(color: Colors.white, width: 2),
                    padding: const EdgeInsets.symmetric(vertical: 14),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                  child: Text('common.maybe_later'.tr()),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                flex: 2,
                child: ElevatedButton(
                  onPressed: () => _navigateToCreateReview(context),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.white,
                    foregroundColor: const Color(0xFF215C5C),
                    padding: const EdgeInsets.symmetric(vertical: 14),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                    elevation: 0,
                  ),
                  child: Text(
                    'reviews.write_review'.tr(),
                    style: const TextStyle(
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  void _navigateToCreateReview(BuildContext context) async {
    final result = await Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => CreateReviewScreen(
          targetId: otherUserId,
          reviewType: otherUserRole == 'traveler'
              ? ReviewType.traveler
              : ReviewType.sender,
          targetName: otherUserName,
          isVerifiedBooking: true,
        ),
      ),
    );

    if (result == true) {
      onReviewSubmitted?.call();
      if (context.mounted) {
        Navigator.pop(context);
      }
    }
  }
}

/// Show review prompt dialog after booking completion
void showReviewPrompt(
  BuildContext context, {
  required String bookingId,
  required String packageId,
  required String otherUserId,
  required String otherUserName,
  required String otherUserRole,
  VoidCallback? onReviewSubmitted,
}) {
  showDialog(
    context: context,
    barrierDismissible: true,
    builder: (context) => Dialog(
      backgroundColor: Colors.transparent,
      insetPadding: const EdgeInsets.symmetric(horizontal: 20),
      child: ReviewPromptWidget(
        bookingId: bookingId,
        packageId: packageId,
        otherUserId: otherUserId,
        otherUserName: otherUserName,
        otherUserRole: otherUserRole,
        onReviewSubmitted: onReviewSubmitted,
      ),
    ),
  );
}

/// Check and show pending review prompts for a user
Future<void> checkAndShowPendingReviews(BuildContext context) async {
  try {
    final currentUser = AuthStateService().currentUser;
    if (currentUser == null) return;

    final verificationService = ReviewVerificationService();
    final pendingReviews =
        await verificationService.getPendingReviewBookings(currentUser.uid);

    if (pendingReviews.isNotEmpty && context.mounted) {
      // Show prompt for the most recent completed booking
      final mostRecent = pendingReviews.first;

      showReviewPrompt(
        context,
        bookingId: mostRecent['bookingId'],
        packageId: mostRecent['packageId'],
        otherUserId: mostRecent['otherUserId'],
        otherUserName: 'the ${mostRecent['otherUserRole']}',
        otherUserRole: mostRecent['otherUserRole'],
      );
    }
  } catch (e) {
    debugPrint('Error checking pending reviews: $e');
  }
}
