import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get.dart' hide Trans;
import 'package:image_picker/image_picker.dart';
import 'dart:io';
import '../../core/models/delivery_tracking.dart';
import '../../services/tracking_service.dart';
import '../../services/image_storage_service.dart';

/// Screen for traveler to generate OTP and enter code from receiver
/// This ensures both parties are present during package handoff
class DeliveryOTPEntryScreen extends StatefulWidget {
  final DeliveryTracking tracking;

  const DeliveryOTPEntryScreen({
    Key? key,
    required this.tracking,
  }) : super(key: key);

  @override
  State<DeliveryOTPEntryScreen> createState() => _DeliveryOTPEntryScreenState();
}

class _DeliveryOTPEntryScreenState extends State<DeliveryOTPEntryScreen> {
  final TrackingService _trackingService = Get.find<TrackingService>();
  final ImageStorageService _imageStorage = ImageStorageService();
  final ImagePicker _imagePicker = ImagePicker();

  final TextEditingController _otpController = TextEditingController();
  final FocusNode _otpFocusNode = FocusNode();

  bool _isGeneratingOTP = false;
  bool _isVerifying = false;
  String? _generatedOTP;
  File? _deliveryPhoto;
  String? _photoUrl;
  final TextEditingController _notesController = TextEditingController();

  @override
  void dispose() {
    _otpController.dispose();
    _otpFocusNode.dispose();
    _notesController.dispose();
    super.dispose();
  }

  Future<void> _generateOTP() async {
    try {
      setState(() => _isGeneratingOTP = true);

      final otpCode =
          await _trackingService.generateDeliveryOTP(widget.tracking.id);

      setState(() {
        _generatedOTP = otpCode;
      });

      Get.snackbar(
        '✅ OTP Generated',
        'OTP has been sent to the receiver. They will share it with you.',
        backgroundColor: Colors.green.withOpacity(0.9),
        colorText: Colors.white,
        snackPosition: SnackPosition.TOP,
        duration: const Duration(seconds: 4),
      );
    } catch (e) {
      Get.snackbar(
        '❌ Error',
        'Failed to generate OTP: $e',
        backgroundColor: Colors.red.withOpacity(0.9),
        colorText: Colors.white,
        snackPosition: SnackPosition.TOP,
      );
    } finally {
      setState(() => _isGeneratingOTP = false);
    }
  }

  Future<void> _pickDeliveryPhoto() async {
    try {
      final XFile? photo =
          await _imagePicker.pickImage(source: ImageSource.camera);

      if (photo != null) {
        setState(() {
          _deliveryPhoto = File(photo.path);
        });

        // Convert photo to base64
        Get.snackbar(
          '📤 Processing Photo',
          'Please wait...',
          backgroundColor: Colors.blue.withOpacity(0.9),
          colorText: Colors.white,
          snackPosition: SnackPosition.TOP,
          duration: const Duration(seconds: 2),
        );

        final base64Image = await _imageStorage.fileToBase64(File(photo.path));

        setState(() {
          _photoUrl = base64Image;
        });

        Get.snackbar(
          '✅ Photo Ready',
          'Delivery photo is ready',
          backgroundColor: Colors.green.withOpacity(0.9),
          colorText: Colors.white,
          snackPosition: SnackPosition.TOP,
        );
      }
    } catch (e) {
      Get.snackbar(
        '❌ Error',
        'Failed to upload photo: $e',
        backgroundColor: Colors.red.withOpacity(0.9),
        colorText: Colors.white,
        snackPosition: SnackPosition.TOP,
      );
    }
  }

  Future<void> _verifyAndCompleteDelivery() async {
    final otpCode = _otpController.text.trim();

    if (otpCode.isEmpty) {
      Get.snackbar(
        '⚠️ OTP Required',
        'Please enter the OTP code from receiver',
        backgroundColor: Colors.orange.withOpacity(0.9),
        colorText: Colors.white,
        snackPosition: SnackPosition.TOP,
      );
      return;
    }

    if (otpCode.length != 6) {
      Get.snackbar(
        '⚠️ Invalid OTP',
        'OTP must be 6 digits',
        backgroundColor: Colors.orange.withOpacity(0.9),
        colorText: Colors.white,
        snackPosition: SnackPosition.TOP,
      );
      return;
    }

    if (_photoUrl == null) {
      Get.snackbar(
        '⚠️ Photo Required',
        'Please take a delivery photo',
        backgroundColor: Colors.orange.withOpacity(0.9),
        colorText: Colors.white,
        snackPosition: SnackPosition.TOP,
      );
      return;
    }

    try {
      setState(() => _isVerifying = true);

      await _trackingService.verifyDeliveryOTP(
        trackingId: widget.tracking.id,
        otpCode: otpCode,
        photoUrl: _photoUrl!,
        notes: _notesController.text.trim(),
      );

      Get.snackbar(
        '🎉 Success!',
        'Delivery completed and verified. Payment will be released shortly.',
        backgroundColor: Colors.green.withOpacity(0.9),
        colorText: Colors.white,
        snackPosition: SnackPosition.TOP,
        duration: const Duration(seconds: 4),
      );

      // Navigate back to tracking screen
      Get.back();
      Get.back(); // Go back twice to return to main tracking list
    } catch (e) {
      Get.snackbar(
        '❌ Verification Failed',
        e.toString().replaceAll('Exception: ', ''),
        backgroundColor: Colors.red.withOpacity(0.9),
        colorText: Colors.white,
        snackPosition: SnackPosition.TOP,
        duration: const Duration(seconds: 4),
      );
    } finally {
      setState(() => _isVerifying = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('🔐 Verify Delivery'),
        backgroundColor: const Color(0xFF6A5AE0),
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Instructions Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: const Color(0xFF008080).withOpacity(0.1),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: const Color(0xFF008080), width: 2),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: const [
                      Icon(Icons.info_outline,
                          color: Color(0xFF008080), size: 24),
                      SizedBox(width: 8),
                      Text(
                        'How it works',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF008080),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  _buildStep('1', 'Generate OTP to send to receiver'),
                  _buildStep('2', 'Meet with receiver and hand over package'),
                  _buildStep('3', 'Take a photo of the delivered package'),
                  _buildStep('4', 'Ask receiver for the OTP code'),
                  _buildStep('5', 'Enter code to complete delivery'),
                ],
              ),
            ),

            const SizedBox(height: 24),

            // Step 1: Generate OTP
            if (_generatedOTP == null) ...[
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.grey.shade300),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.05),
                      blurRadius: 10,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                child: Column(
                  children: [
                    const Icon(Icons.vpn_key,
                        size: 48, color: Color(0xFF6A5AE0)),
                    const SizedBox(height: 12),
                    const Text(
                      'Step 1: Generate OTP',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Tap the button below to generate an OTP code.\nIt will be sent to the receiver.',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 14,
                        color: Colors.grey[600],
                      ),
                    ),
                    const SizedBox(height: 16),
                    SizedBox(
                      width: double.infinity,
                      height: 50,
                      child: ElevatedButton(
                        onPressed: _isGeneratingOTP ? null : _generateOTP,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF6A5AE0),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12),
                          ),
                        ),
                        child: _isGeneratingOTP
                            ? const SizedBox(
                                height: 20,
                                width: 20,
                                child: CircularProgressIndicator(
                                  color: Colors.white,
                                  strokeWidth: 2,
                                ),
                              )
                            : const Text(
                                'Generate OTP',
                                style: TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white,
                                ),
                              ),
                      ),
                    ),
                  ],
                ),
              ),
            ],

            // Steps 2-5: After OTP is generated
            if (_generatedOTP != null) ...[
              // OTP Generated Confirmation
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.green.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.green, width: 2),
                ),
                child: Row(
                  children: const [
                    Icon(Icons.check_circle, color: Colors.green, size: 24),
                    SizedBox(width: 12),
                    Expanded(
                      child: Text(
                        'OTP sent to receiver!\nThey will share it with you.',
                        style: TextStyle(
                          fontSize: 14,
                          color: Colors.green,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 24),

              // Step 2: Take Photo
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.grey.shade300),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.05),
                      blurRadius: 10,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                child: Column(
                  children: [
                    const Text(
                      'Step 2: Take Delivery Photo',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 16),
                    if (_deliveryPhoto != null) ...[
                      ClipRRect(
                        borderRadius: BorderRadius.circular(8),
                        child: Image.file(
                          _deliveryPhoto!,
                          height: 200,
                          width: double.infinity,
                          fit: BoxFit.cover,
                        ),
                      ),
                      const SizedBox(height: 12),
                      if (_photoUrl == null) const CircularProgressIndicator(),
                      if (_photoUrl != null)
                        const Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(Icons.check_circle,
                                color: Colors.green, size: 20),
                            SizedBox(width: 8),
                            Text(
                              'Photo uploaded',
                              style: TextStyle(
                                color: Colors.green,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ],
                        ),
                    ],
                    const SizedBox(height: 12),
                    SizedBox(
                      width: double.infinity,
                      height: 50,
                      child: OutlinedButton.icon(
                        onPressed: _pickDeliveryPhoto,
                        icon: const Icon(Icons.camera_alt),
                        label: Text(
                          _deliveryPhoto == null
                              ? 'Take Photo'
                              : 'Retake Photo',
                        ),
                        style: OutlinedButton.styleFrom(
                          foregroundColor: const Color(0xFF6A5AE0),
                          side: const BorderSide(
                            color: Color(0xFF6A5AE0),
                            width: 2,
                          ),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 24),

              // Step 3: Optional Notes
              TextField(
                controller: _notesController,
                maxLines: 3,
                decoration: InputDecoration(
                  labelText: 'Delivery Notes (Optional)',
                  hintText: 'Add any notes about the delivery...',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  prefixIcon: const Icon(Icons.note),
                ),
              ),

              const SizedBox(height: 24),

              // Step 4: Enter OTP
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.grey.shade300),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.05),
                      blurRadius: 10,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                child: Column(
                  children: [
                    const Text(
                      'Step 3: Enter OTP from Receiver',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 16),
                    TextField(
                      controller: _otpController,
                      focusNode: _otpFocusNode,
                      keyboardType: TextInputType.number,
                      maxLength: 6,
                      textAlign: TextAlign.center,
                      style: const TextStyle(
                        fontSize: 32,
                        fontWeight: FontWeight.bold,
                        letterSpacing: 8,
                      ),
                      inputFormatters: [
                        FilteringTextInputFormatter.digitsOnly,
                      ],
                      decoration: InputDecoration(
                        hintText: '000000',
                        counterText: '',
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12),
                          borderSide: const BorderSide(width: 2),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12),
                          borderSide: const BorderSide(
                            color: Color(0xFF6A5AE0),
                            width: 2,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Ask the receiver to provide their 6-digit code',
                      style: TextStyle(
                        fontSize: 12,
                        color: Colors.grey[600],
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 24),

              // Verify Button
              SizedBox(
                width: double.infinity,
                height: 56,
                child: ElevatedButton(
                  onPressed: _isVerifying ? null : _verifyAndCompleteDelivery,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.green,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  child: _isVerifying
                      ? const SizedBox(
                          height: 20,
                          width: 20,
                          child: CircularProgressIndicator(
                            color: Colors.white,
                            strokeWidth: 2,
                          ),
                        )
                      : const Text(
                          '✓ Verify & Complete Delivery',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                ),
              ),

              const SizedBox(height: 16),

              // Help Text
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: Colors.orange.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: Colors.orange, width: 1),
                ),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Icon(Icons.help_outline,
                        color: Colors.orange, size: 20),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        'The receiver received the OTP via notification and email. Once you enter it correctly, the delivery will be completed and payment will be released.',
                        style: TextStyle(
                          fontSize: 12,
                          color: Colors.orange[800],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildStep(String number, String text) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Row(
        children: [
          Container(
            width: 24,
            height: 24,
            decoration: BoxDecoration(
              color: const Color(0xFF008080),
              shape: BoxShape.circle,
            ),
            child: Center(
              child: Text(
                number,
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 12,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              text,
              style: const TextStyle(
                fontSize: 14,
                color: Colors.black87,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
