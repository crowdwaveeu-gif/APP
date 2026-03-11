import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';
import 'dart:convert';
import '../../core/models/dispute.dart';

class DisputeDetailsScreen extends StatelessWidget {
  final Dispute dispute;

  const DisputeDetailsScreen({
    Key? key,
    required this.dispute,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Dispute Details'),
        backgroundColor: Colors.white,
        foregroundColor: Colors.black,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(4.w),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Status Card
            _buildStatusCard(),
            SizedBox(height: 3.h),

            // Dispute Information
            _buildSection(
              'Dispute Information',
              [
                _buildInfoRow('Booking ID', dispute.bookingId),
                _buildInfoRow('Reason', dispute.reasonDisplayText),
                _buildInfoRow('Status', dispute.statusDisplayText),
                _buildInfoRow('Filed On', _formatDateTime(dispute.createdAt)),
                if (dispute.resolvedAt != null)
                  _buildInfoRow(
                      'Resolved On', _formatDateTime(dispute.resolvedAt!)),
              ],
            ),
            SizedBox(height: 3.h),

            // Description
            _buildSection(
              'Description',
              [
                Text(
                  dispute.description,
                  style: TextStyle(
                    fontSize: 13.sp,
                    color: Colors.grey[700],
                    height: 1.5,
                  ),
                ),
              ],
            ),
            SizedBox(height: 3.h),

            // Evidence
            if (dispute.evidence.isNotEmpty) ...[
              _buildSection(
                'Evidence (${dispute.evidence.length})',
                [
                  _buildEvidenceGrid(),
                ],
              ),
              SizedBox(height: 3.h),
            ],

            // Admin Response
            if (dispute.isResolved && dispute.resolution != null) ...[
              _buildSection(
                'Admin Response',
                [
                  Container(
                    padding: EdgeInsets.all(3.w),
                    decoration: BoxDecoration(
                      color: Colors.blue.shade50,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: Colors.blue.shade200),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        if (dispute.resolutionType != null) ...[
                          Row(
                            children: [
                              Icon(Icons.gavel,
                                  size: 16, color: Colors.blue.shade700),
                              SizedBox(width: 2.w),
                              Text(
                                _getResolutionTypeText(dispute.resolutionType!),
                                style: TextStyle(
                                  fontSize: 12.sp,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.blue.shade900,
                                ),
                              ),
                            ],
                          ),
                          SizedBox(height: 1.h),
                        ],
                        Text(
                          dispute.resolution!,
                          style: TextStyle(
                            fontSize: 12.sp,
                            color: Colors.blue.shade900,
                            height: 1.5,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              SizedBox(height: 3.h),
            ],

            // Admin Notes
            if (dispute.adminNotes != null &&
                dispute.adminNotes!.isNotEmpty) ...[
              _buildSection(
                'Admin Notes',
                [
                  Container(
                    padding: EdgeInsets.all(3.w),
                    decoration: BoxDecoration(
                      color: Colors.grey.shade50,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: Colors.grey.shade300),
                    ),
                    child: Text(
                      dispute.adminNotes!,
                      style: TextStyle(
                        fontSize: 12.sp,
                        color: Colors.grey[700],
                        height: 1.5,
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildStatusCard() {
    return Container(
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            _getStatusColor(dispute.status),
            _getStatusColor(dispute.status).withOpacity(0.7),
          ],
        ),
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: _getStatusColor(dispute.status).withOpacity(0.3),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Row(
        children: [
          Container(
            padding: EdgeInsets.all(3.w),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.3),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(
              _getStatusIcon(dispute.status),
              color: Colors.white,
              size: 30,
            ),
          ),
          SizedBox(width: 4.w),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  dispute.statusDisplayText,
                  style: TextStyle(
                    fontSize: 18.sp,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
                SizedBox(height: 0.5.h),
                Text(
                  _getStatusMessage(dispute.status),
                  style: TextStyle(
                    fontSize: 11.sp,
                    color: Colors.white.withOpacity(0.9),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSection(String title, List<Widget> children) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: TextStyle(
            fontSize: 16.sp,
            fontWeight: FontWeight.bold,
            color: Colors.grey[800],
          ),
        ),
        SizedBox(height: 1.5.h),
        ...children,
      ],
    );
  }

  Widget _buildInfoRow(String label, String value) {
    return Padding(
      padding: EdgeInsets.only(bottom: 1.h),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 30.w,
            child: Text(
              '$label:',
              style: TextStyle(
                fontSize: 12.sp,
                color: Colors.grey[600],
              ),
            ),
          ),
          Expanded(
            child: Text(
              value,
              style: TextStyle(
                fontSize: 12.sp,
                fontWeight: FontWeight.w600,
                color: Colors.grey[800],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildEvidenceGrid() {
    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 3,
        crossAxisSpacing: 2.w,
        mainAxisSpacing: 2.w,
      ),
      itemCount: dispute.evidence.length,
      itemBuilder: (context, index) {
        final evidenceUrl = dispute.evidence[index];

        return GestureDetector(
          onTap: () => _showFullImage(context, evidenceUrl),
          child: Container(
            decoration: BoxDecoration(
              color: Colors.grey[200],
              borderRadius: BorderRadius.circular(8),
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(8),
              child: _buildEvidenceImage(evidenceUrl),
            ),
          ),
        );
      },
    );
  }

  Color _getStatusColor(DisputeStatus status) {
    switch (status) {
      case DisputeStatus.pending:
        return Colors.orange;
      case DisputeStatus.underReview:
        return Colors.blue;
      case DisputeStatus.resolved:
        return Colors.green;
      case DisputeStatus.dismissed:
        return Colors.grey;
      case DisputeStatus.escalated:
        return Colors.red;
    }
  }

  IconData _getStatusIcon(DisputeStatus status) {
    switch (status) {
      case DisputeStatus.pending:
        return Icons.schedule;
      case DisputeStatus.underReview:
        return Icons.visibility;
      case DisputeStatus.resolved:
        return Icons.check_circle;
      case DisputeStatus.dismissed:
        return Icons.cancel;
      case DisputeStatus.escalated:
        return Icons.priority_high;
    }
  }

  String _getStatusMessage(DisputeStatus status) {
    switch (status) {
      case DisputeStatus.pending:
        return 'Your dispute is awaiting review';
      case DisputeStatus.underReview:
        return 'Our team is currently reviewing your dispute';
      case DisputeStatus.resolved:
        return 'This dispute has been resolved';
      case DisputeStatus.dismissed:
        return 'This dispute has been dismissed';
      case DisputeStatus.escalated:
        return 'This dispute has been escalated for priority review';
    }
  }

  String _getResolutionTypeText(DisputeResolution type) {
    switch (type) {
      case DisputeResolution.favorReporter:
        return 'Resolved in Your Favor';
      case DisputeResolution.favorReported:
        return 'Resolved in Favor of Other Party';
      case DisputeResolution.partialRefund:
        return 'Partial Refund Issued';
      case DisputeResolution.fullRefund:
        return 'Full Refund Issued';
      case DisputeResolution.warningIssued:
        return 'Warning Issued';
      case DisputeResolution.accountSuspended:
        return 'Account Action Taken';
      case DisputeResolution.dismissed:
        return 'Dispute Dismissed';
    }
  }

  String _formatDateTime(DateTime date) {
    return '${date.day}/${date.month}/${date.year} at ${date.hour}:${date.minute.toString().padLeft(2, '0')}';
  }

  /// Build evidence image - handles both base64 and URL images
  Widget _buildEvidenceImage(String evidenceUrl) {
    if (evidenceUrl.startsWith('data:image/')) {
      // Base64 image
      try {
        final base64String = evidenceUrl.split(',')[1];
        final bytes = base64Decode(base64String);
        return Image.memory(
          bytes,
          fit: BoxFit.cover,
          errorBuilder: (context, error, stackTrace) {
            return _buildErrorPlaceholder();
          },
        );
      } catch (e) {
        return _buildErrorPlaceholder();
      }
    } else {
      // URL image
      return Image.network(
        evidenceUrl,
        fit: BoxFit.cover,
        errorBuilder: (context, error, stackTrace) {
          return _buildErrorPlaceholder();
        },
      );
    }
  }

  /// Show full-screen image viewer
  void _showFullImage(BuildContext context, String evidenceUrl) {
    showDialog(
      context: context,
      builder: (context) => Dialog(
        backgroundColor: Colors.black,
        child: Stack(
          children: [
            Center(
              child: InteractiveViewer(
                child: _buildEvidenceImage(evidenceUrl),
              ),
            ),
            Positioned(
              top: 10,
              right: 10,
              child: IconButton(
                icon: const Icon(Icons.close, color: Colors.white, size: 30),
                onPressed: () => Navigator.pop(context),
              ),
            ),
          ],
        ),
      ),
    );
  }

  /// Build error placeholder for failed image loads
  Widget _buildErrorPlaceholder() {
    return Container(
      color: Colors.grey[300],
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.broken_image, size: 40, color: Colors.grey[600]),
            SizedBox(height: 1.h),
            Text(
              'Image unavailable',
              style: TextStyle(
                fontSize: 10.sp,
                color: Colors.grey[600],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
