import 'package:flutter/material.dart';
import 'package:get/get.dart' hide Trans;
import 'package:sizer/sizer.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../core/models/dispute.dart';
import '../../services/dispute_service.dart';
import 'dispute_details_screen.dart';

class MyDisputesScreen extends StatefulWidget {
  const MyDisputesScreen({Key? key}) : super(key: key);

  @override
  State<MyDisputesScreen> createState() => _MyDisputesScreenState();
}

class _MyDisputesScreenState extends State<MyDisputesScreen>
    with SingleTickerProviderStateMixin {
  final DisputeService _disputeService = DisputeService();
  late TabController _tabController;

  List<Dispute> _allDisputes = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
    _loadDisputes();
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  Future<void> _loadDisputes() async {
    setState(() => _isLoading = true);
    try {
      final disputes = await _disputeService.getUserDisputes();
      setState(() {
        _allDisputes = disputes;
        _isLoading = false;
      });
    } catch (e) {
      setState(() => _isLoading = false);
      Get.snackbar(
        'disputes.error'.tr(),
        '${'disputes.load_error'.tr()}: $e',
        backgroundColor: Colors.red,
        colorText: Colors.white,
        snackPosition: SnackPosition.TOP,
      );
    }
  }

  List<Dispute> get _openDisputes => _allDisputes
      .where((d) =>
          d.status == DisputeStatus.pending ||
          d.status == DisputeStatus.underReview ||
          d.status == DisputeStatus.escalated)
      .toList();

  List<Dispute> get _resolvedDisputes =>
      _allDisputes.where((d) => d.status == DisputeStatus.resolved).toList();

  List<Dispute> get _allListDisputes => _allDisputes;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('disputes.my_disputes'.tr()),
        backgroundColor: Colors.white,
        foregroundColor: Colors.black,
        elevation: 0,
        bottom: TabBar(
          controller: _tabController,
          labelColor: Colors.orange,
          unselectedLabelColor: Colors.grey,
          indicatorColor: Colors.orange,
          tabs: [
            Tab(text: '${'disputes.open'.tr()} (${_openDisputes.length})'),
            Tab(
                text:
                    '${'disputes.resolved'.tr()} (${_resolvedDisputes.length})'),
            Tab(text: '${'disputes.all'.tr()} (${_allListDisputes.length})'),
          ],
        ),
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : TabBarView(
              controller: _tabController,
              children: [
                _buildDisputesList(_openDisputes),
                _buildDisputesList(_resolvedDisputes),
                _buildDisputesList(_allListDisputes),
              ],
            ),
    );
  }

  Widget _buildDisputesList(List<Dispute> disputes) {
    if (disputes.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.check_circle_outline,
                size: 20.w, color: Colors.grey[300]),
            SizedBox(height: 2.h),
            Text(
              'disputes.no_disputes'.tr(),
              style: TextStyle(
                fontSize: 18.sp,
                fontWeight: FontWeight.bold,
                color: Colors.grey[600],
              ),
            ),
            SizedBox(height: 1.h),
            Text(
              'disputes.no_disputes_message'.tr(),
              style: TextStyle(
                fontSize: 12.sp,
                color: Colors.grey[500],
              ),
            ),
          ],
        ),
      );
    }

    return RefreshIndicator(
      onRefresh: _loadDisputes,
      child: ListView.builder(
        padding: EdgeInsets.all(4.w),
        itemCount: disputes.length,
        itemBuilder: (context, index) {
          final dispute = disputes[index];
          return _buildDisputeCard(dispute);
        },
      ),
    );
  }

  Widget _buildDisputeCard(Dispute dispute) {
    return GestureDetector(
      onTap: () => Get.to(() => DisputeDetailsScreen(dispute: dispute)),
      child: Container(
        margin: EdgeInsets.only(bottom: 2.h),
        padding: EdgeInsets.all(4.w),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.05),
              blurRadius: 10,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header with status
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Row(
                    children: [
                      Icon(
                        _getReasonIcon(dispute.reason),
                        color: _getStatusColor(dispute.status),
                        size: 20,
                      ),
                      SizedBox(width: 2.w),
                      Expanded(
                        child: Text(
                          dispute.reasonDisplayText,
                          style: TextStyle(
                            fontSize: 14.sp,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                _buildStatusBadge(dispute.status),
              ],
            ),
            SizedBox(height: 1.h),

            // Description
            Text(
              dispute.description,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                fontSize: 12.sp,
                color: Colors.grey[700],
              ),
            ),
            SizedBox(height: 1.5.h),

            // Footer with booking ID and date
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    Icon(Icons.receipt_outlined,
                        size: 14, color: Colors.grey[500]),
                    SizedBox(width: 1.w),
                    Text(
                      dispute.bookingId,
                      style: TextStyle(
                        fontSize: 10.sp,
                        color: Colors.grey[600],
                        fontFamily: 'monospace',
                      ),
                    ),
                  ],
                ),
                Text(
                  _formatDate(dispute.createdAt),
                  style: TextStyle(
                    fontSize: 10.sp,
                    color: Colors.grey[500],
                  ),
                ),
              ],
            ),

            // Evidence indicator
            if (dispute.evidence.isNotEmpty) ...[
              SizedBox(height: 1.h),
              Row(
                children: [
                  Icon(Icons.attach_file, size: 14, color: Colors.blue),
                  SizedBox(width: 1.w),
                  Text(
                    '${dispute.evidence.length} ${'disputes.attachments'.tr()}',
                    style: TextStyle(
                      fontSize: 10.sp,
                      color: Colors.blue,
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

  Widget _buildStatusBadge(DisputeStatus status) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 0.5.h),
      decoration: BoxDecoration(
        color: _getStatusColor(status).withOpacity(0.1),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Text(
        status.name.toUpperCase(),
        style: TextStyle(
          fontSize: 9.sp,
          fontWeight: FontWeight.bold,
          color: _getStatusColor(status),
        ),
      ),
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

  IconData _getReasonIcon(DisputeReason reason) {
    switch (reason) {
      case DisputeReason.noShow:
        return Icons.person_off;
      case DisputeReason.damagedPackage:
        return Icons.broken_image;
      case DisputeReason.lateDelivery:
        return Icons.schedule;
      case DisputeReason.inappropriateBehavior:
        return Icons.report;
      case DisputeReason.paymentIssue:
        return Icons.payment;
      case DisputeReason.fraudulentActivity:
        return Icons.security;
      case DisputeReason.safetyyConcern:
        return Icons.warning;
      case DisputeReason.other:
        return Icons.help_outline;
    }
  }

  String _formatDate(DateTime date) {
    final now = DateTime.now();
    final difference = now.difference(date);

    if (difference.inDays == 0) {
      if (difference.inHours == 0) {
        return '${difference.inMinutes}m ago';
      }
      return '${difference.inHours}h ago';
    } else if (difference.inDays < 7) {
      return '${difference.inDays}d ago';
    } else {
      return '${date.day}/${date.month}/${date.year}';
    }
  }
}
