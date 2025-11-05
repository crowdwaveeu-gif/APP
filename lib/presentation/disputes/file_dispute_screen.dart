import 'package:flutter/material.dart';
import 'package:get/get.dart' hide Trans;
import 'package:sizer/sizer.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';
import 'dart:convert';
import 'package:easy_localization/easy_localization.dart';
import '../../core/models/dispute.dart';
import '../../core/models/delivery_tracking.dart';
import '../../services/dispute_service.dart';

class FileDisputeScreen extends StatefulWidget {
  final String bookingId;
  final String reportedUserId;
  final DeliveryTracking? tracking;

  const FileDisputeScreen({
    Key? key,
    required this.bookingId,
    required this.reportedUserId,
    this.tracking,
  }) : super(key: key);

  @override
  State<FileDisputeScreen> createState() => _FileDisputeScreenState();
}

class _FileDisputeScreenState extends State<FileDisputeScreen> {
  final _formKey = GlobalKey<FormState>();
  final _descriptionController = TextEditingController();
  final DisputeService _disputeService = DisputeService();
  final ImagePicker _imagePicker = ImagePicker();

  DisputeReason _selectedReason = DisputeReason.other;
  List<File> _selectedImages = [];
  bool _isSubmitting = false;

  @override
  void dispose() {
    _descriptionController.dispose();
    super.dispose();
  }

  Future<void> _pickImages() async {
    try {
      final pickedFiles = await _imagePicker.pickMultiImage(
        imageQuality: 70,
      );

      if (pickedFiles.isNotEmpty) {
        setState(() {
          _selectedImages =
              pickedFiles.map((xFile) => File(xFile.path)).toList();
        });
      }
    } catch (e) {
      Get.snackbar(
        'Error',
        'Failed to pick images: $e',
        backgroundColor: Colors.red,
        colorText: Colors.white,
        snackPosition: SnackPosition.TOP,
      );
    }
  }

  Future<void> _submitDispute() async {
    if (!_formKey.currentState!.validate()) {
      return;
    }

    // Check if can create dispute
    final canCreate = await _disputeService.canCreateDispute(widget.bookingId);
    if (!canCreate) {
      Get.snackbar(
        'disputes.exists'.tr(),
        'disputes.exists_message'.tr(),
        backgroundColor: Colors.orange,
        colorText: Colors.white,
        snackPosition: SnackPosition.TOP,
      );
      return;
    }

    setState(() => _isSubmitting = true);

    try {
      // Convert images to base64 (FREE storage!)
      List<String> evidenceBase64 = [];
      for (var image in _selectedImages) {
        try {
          final bytes = await image.readAsBytes();
          final base64String = 'data:image/jpeg;base64,${base64Encode(bytes)}';
          evidenceBase64.add(base64String);
        } catch (e) {
          print('❌ Error converting image to base64: $e');
        }
      }

      // Create dispute
      await _disputeService.createDispute(
        bookingId: widget.bookingId,
        reportedUserId: widget.reportedUserId,
        reason: _selectedReason,
        description: _descriptionController.text.trim(),
        evidence: evidenceBase64,
      );

      Get.back();
      Get.snackbar(
        'disputes.filed'.tr(),
        'disputes.filed_message'.tr(),
        backgroundColor: Colors.green,
        colorText: Colors.white,
        snackPosition: SnackPosition.TOP,
        duration: const Duration(seconds: 4),
      );
    } catch (e) {
      Get.snackbar(
        'disputes.error'.tr(),
        '${'disputes.error_message'.tr()}: $e',
        backgroundColor: Colors.red,
        colorText: Colors.white,
        snackPosition: SnackPosition.TOP,
      );
    } finally {
      setState(() => _isSubmitting = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('disputes.report_issue'.tr()),
        backgroundColor: Colors.white,
        foregroundColor: Colors.black,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(4.w),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header
              Container(
                padding: EdgeInsets.all(4.w),
                decoration: BoxDecoration(
                  color: Colors.orange.shade50,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.orange.shade200),
                ),
                child: Row(
                  children: [
                    Icon(Icons.info_outline, color: Colors.orange.shade700),
                    SizedBox(width: 3.w),
                    Expanded(
                      child: Text(
                        'disputes.info_message'.tr(),
                        style: TextStyle(
                          fontSize: 12.sp,
                          color: Colors.orange.shade900,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              SizedBox(height: 3.h),

              // Booking Info
              _buildInfoCard(),
              SizedBox(height: 3.h),

              // Reason Selection
              Text(
                'disputes.issue_type'.tr(),
                style: TextStyle(
                  fontSize: 14.sp,
                  fontWeight: FontWeight.bold,
                  color: Colors.grey[800],
                ),
              ),
              SizedBox(height: 1.h),
              _buildReasonGrid(),
              SizedBox(height: 3.h),

              // Description
              Text(
                'disputes.description'.tr(),
                style: TextStyle(
                  fontSize: 14.sp,
                  fontWeight: FontWeight.bold,
                  color: Colors.grey[800],
                ),
              ),
              SizedBox(height: 1.h),
              TextFormField(
                controller: _descriptionController,
                maxLines: 5,
                maxLength: 500,
                decoration: InputDecoration(
                  hintText: 'disputes.description_hint'.tr(),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  filled: true,
                  fillColor: Colors.grey[50],
                ),
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return 'disputes.description_required'.tr();
                  }
                  if (value.trim().length < 20) {
                    return 'disputes.description_min_length'.tr();
                  }
                  return null;
                },
              ),
              SizedBox(height: 3.h),

              // Evidence Upload
              Text(
                'disputes.evidence'.tr(),
                style: TextStyle(
                  fontSize: 14.sp,
                  fontWeight: FontWeight.bold,
                  color: Colors.grey[800],
                ),
              ),
              SizedBox(height: 1.h),
              _buildEvidenceSection(),
              SizedBox(height: 4.h),

              // Submit Button
              SizedBox(
                width: double.infinity,
                height: 6.h,
                child: ElevatedButton(
                  onPressed: _isSubmitting ? null : _submitDispute,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.orange,
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                    elevation: 2,
                  ),
                  child: _isSubmitting
                      ? const SizedBox(
                          height: 20,
                          width: 20,
                          child: CircularProgressIndicator(
                            strokeWidth: 2,
                            valueColor:
                                AlwaysStoppedAnimation<Color>(Colors.white),
                          ),
                        )
                      : Text(
                          'disputes.submit'.tr(),
                          style: TextStyle(
                            fontSize: 16.sp,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                ),
              ),
              // Add bottom padding after submit button
              SizedBox(height: 3.h),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildInfoCard() {
    return Container(
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.grey.shade200),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'disputes.booking_info'.tr(),
            style: TextStyle(
              fontSize: 14.sp,
              fontWeight: FontWeight.bold,
            ),
          ),
          SizedBox(height: 1.h),
          _buildInfoRow('Booking ID', widget.bookingId),
          if (widget.tracking != null) ...[
            _buildInfoRow('Status', widget.tracking!.status.name.toUpperCase()),
          ],
        ],
      ),
    );
  }

  Widget _buildInfoRow(String label, String value) {
    return Padding(
      padding: EdgeInsets.only(top: 0.5.h),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 25.w,
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
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildReasonGrid() {
    final reasons = DisputeReason.values;

    return Wrap(
      spacing: 2.w,
      runSpacing: 1.h,
      children: reasons.map((reason) {
        final isSelected = _selectedReason == reason;
        return GestureDetector(
          onTap: () => setState(() => _selectedReason = reason),
          child: Container(
            padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
            decoration: BoxDecoration(
              color: isSelected ? Colors.orange : Colors.white,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(
                color: isSelected ? Colors.orange : Colors.grey.shade300,
                width: isSelected ? 2 : 1,
              ),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(
                  _getReasonIcon(reason),
                  size: 16,
                  color: isSelected ? Colors.white : Colors.grey[700],
                ),
                SizedBox(width: 2.w),
                Text(
                  _getReasonDisplayText(reason),
                  style: TextStyle(
                    fontSize: 11.sp,
                    color: isSelected ? Colors.white : Colors.grey[800],
                    fontWeight:
                        isSelected ? FontWeight.bold : FontWeight.normal,
                  ),
                ),
              ],
            ),
          ),
        );
      }).toList(),
    );
  }

  Widget _buildEvidenceSection() {
    return Column(
      children: [
        if (_selectedImages.isNotEmpty) ...[
          SizedBox(
            height: 20.h,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: _selectedImages.length,
              itemBuilder: (context, index) {
                return Container(
                  width: 30.w,
                  margin: EdgeInsets.only(right: 2.w),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(12),
                    image: DecorationImage(
                      image: FileImage(_selectedImages[index]),
                      fit: BoxFit.cover,
                    ),
                  ),
                  child: Stack(
                    children: [
                      Positioned(
                        top: 4,
                        right: 4,
                        child: GestureDetector(
                          onTap: () {
                            setState(() {
                              _selectedImages.removeAt(index);
                            });
                          },
                          child: Container(
                            padding: const EdgeInsets.all(4),
                            decoration: const BoxDecoration(
                              color: Colors.red,
                              shape: BoxShape.circle,
                            ),
                            child: const Icon(
                              Icons.close,
                              color: Colors.white,
                              size: 16,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
          SizedBox(height: 2.h),
        ],
        OutlinedButton.icon(
          onPressed: _pickImages,
          icon: const Icon(Icons.add_photo_alternate),
          label: Text(
            _selectedImages.isEmpty
                ? 'disputes.add_photos'.tr()
                : 'disputes.add_more_photos'.tr(),
          ),
          style: OutlinedButton.styleFrom(
            padding: EdgeInsets.symmetric(horizontal: 6.w, vertical: 1.5.h),
            side: BorderSide(color: Colors.grey.shade400),
          ),
        ),
        SizedBox(height: 1.h),
        Text(
          'disputes.upload_hint'.tr(),
          style: TextStyle(
            fontSize: 11.sp,
            color: Colors.grey[600],
          ),
        ),
      ],
    );
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

  String _getReasonDisplayText(DisputeReason reason) {
    switch (reason) {
      case DisputeReason.noShow:
        return 'disputes.reason.no_show'.tr();
      case DisputeReason.damagedPackage:
        return 'disputes.reason.damaged_package'.tr();
      case DisputeReason.lateDelivery:
        return 'disputes.reason.late_delivery'.tr();
      case DisputeReason.inappropriateBehavior:
        return 'disputes.reason.inappropriate_behavior'.tr();
      case DisputeReason.paymentIssue:
        return 'disputes.reason.payment_issue'.tr();
      case DisputeReason.fraudulentActivity:
        return 'disputes.reason.fraudulent_activity'.tr();
      case DisputeReason.safetyyConcern:
        return 'disputes.reason.safety_concern'.tr();
      case DisputeReason.other:
        return 'disputes.reason.other'.tr();
    }
  }
}
