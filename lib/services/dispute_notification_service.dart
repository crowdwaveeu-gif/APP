import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../core/models/dispute.dart';
import '../models/notification_model.dart';
import 'notification_service.dart';

/// Service to handle dispute-related notifications
class DisputeNotificationService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final NotificationService _notificationService = NotificationService.instance;

  static const String _collectionName = 'disputes';

  /// Start listening to dispute updates for the current user
  void startListening() {
    final currentUser = FirebaseAuth.instance.currentUser;
    if (currentUser == null) return;

    // Listen to disputes where user is the reporter
    _firestore
        .collection(_collectionName)
        .where('reporterId', isEqualTo: currentUser.uid)
        .snapshots()
        .listen((snapshot) {
      for (var change in snapshot.docChanges) {
        if (change.type == DocumentChangeType.modified) {
          _handleDisputeUpdate(change.doc);
        }
      }
    });
  }

  /// Handle dispute update and send notification if needed
  void _handleDisputeUpdate(DocumentSnapshot doc) {
    try {
      final dispute = Dispute.fromFirestore(doc);
      final currentUser = FirebaseAuth.instance.currentUser;
      if (currentUser == null) return;

      // Only notify the reporter
      if (dispute.reporterId != currentUser.uid) return;

      // Check if admin responded
      if (dispute.resolution != null && dispute.resolution!.isNotEmpty) {
        _sendDisputeResponseNotification(dispute);
      }

      // Check if status changed to resolved or dismissed
      if (dispute.status == DisputeStatus.resolved ||
          dispute.status == DisputeStatus.dismissed) {
        _sendDisputeStatusNotification(dispute);
      }
    } catch (e) {
      print('❌ Error handling dispute update: $e');
    }
  }

  /// Send notification when admin responds to dispute
  void _sendDisputeResponseNotification(Dispute dispute) {
    try {
      _notificationService.createNotification(
        userId: dispute.reporterId,
        type: NotificationType.disputeResponse,
        title: 'disputes.notification.title'.tr(),
        body: 'disputes.notification.response'.tr(),
        data: {
          'disputeId': dispute.id,
          'bookingId': dispute.bookingId,
          'reason': dispute.reason.name,
        },
      );

      print('✅ Dispute response notification sent for dispute: ${dispute.id}');
    } catch (e) {
      print('❌ Error sending dispute response notification: $e');
    }
  }

  /// Send notification when dispute status changes
  void _sendDisputeStatusNotification(Dispute dispute) {
    try {
      _notificationService.createNotification(
        userId: dispute.reporterId,
        type: NotificationType.disputeUpdate,
        title: 'disputes.notification.title'.tr(),
        body:
            '${'disputes.notification.status_change'.tr()} ${dispute.statusDisplayText}',
        data: {
          'disputeId': dispute.id,
          'bookingId': dispute.bookingId,
          'status': dispute.status.name,
          'resolutionType': dispute.resolutionType?.name,
        },
      );

      print('✅ Dispute status notification sent for dispute: ${dispute.id}');
    } catch (e) {
      print('❌ Error sending dispute status notification: $e');
    }
  }

  /// Send test notification (for debugging)
  Future<void> sendTestDisputeNotification() async {
    try {
      final currentUser = FirebaseAuth.instance.currentUser;
      if (currentUser == null) {
        print('❌ No user logged in');
        return;
      }

      await _notificationService.createNotification(
        userId: currentUser.uid,
        type: NotificationType.disputeUpdate,
        title: 'Test Dispute Notification',
        body: 'This is a test dispute notification',
        data: {
          'disputeId': 'TEST-123',
          'bookingId': 'TEST-BOOKING',
        },
      );

      print('✅ Test dispute notification sent');
    } catch (e) {
      print('❌ Error sending test notification: $e');
    }
  }
}
