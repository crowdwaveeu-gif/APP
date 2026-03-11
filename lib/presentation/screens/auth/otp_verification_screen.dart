import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:get/get.dart';
import 'dart:async';

import '../../../services/otp_service.dart';

class OTPVerificationScreen extends StatefulWidget {
  final String email;
  final User user;
  final String verificationType; // 'email_verification' or 'password_reset'

  const OTPVerificationScreen({
    Key? key,
    required this.email,
    required this.user,
    this.verificationType = 'email_verification',
  }) : super(key: key);

  @override
  State<OTPVerificationScreen> createState() => _OTPVerificationScreenState();
}

class _OTPVerificationScreenState extends State<OTPVerificationScreen> {
  final OTPService _otpService = OTPService();
  final List<TextEditingController> _otpControllers =
      List.generate(6, (_) => TextEditingController());
  final List<FocusNode> _focusNodes = List.generate(6, (_) => FocusNode());

  bool _isVerifying = false;
  bool _isResending = false;
  int _resendCountdown = 60;
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _startResendTimer();
  }

  @override
  void dispose() {
    _timer?.cancel();
    for (var controller in _otpControllers) {
      controller.dispose();
    }
    for (var node in _focusNodes) {
      node.dispose();
    }
    super.dispose();
  }

  void _startResendTimer() {
    _resendCountdown = 60;
    _timer?.cancel();
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (mounted) {
        setState(() {
          if (_resendCountdown > 0) {
            _resendCountdown--;
          } else {
            timer.cancel();
          }
        });
      }
    });
  }

  String _getOTPCode() {
    return _otpControllers.map((c) => c.text).join();
  }

  Future<void> _verifyOTP() async {
    final otpCode = _getOTPCode();

    if (otpCode.length != 6) {
      _showSnackbar('Error', 'Please enter all 6 digits', isError: true);
      return;
    }

    setState(() {
      _isVerifying = true;
    });

    try {
      final isValid =
          await _otpService.verifyEmailVerificationOTP(widget.email, otpCode);

      if (isValid) {
        // Reload user to update email verification status
        await widget.user.reload();
        final updatedUser = FirebaseAuth.instance.currentUser;

        if (updatedUser != null && updatedUser.emailVerified) {
          _showSnackbar('Success', 'Email verified successfully!');
          // Navigate to main app
          await Future.delayed(const Duration(seconds: 1));
          Get.offAllNamed('/main-navigation');
        } else {
          // Manual verification succeeded, but Firebase status not updated yet
          _showSnackbar(
              'Success', 'Verification complete! You can now log in.');
          await Future.delayed(const Duration(seconds: 1));
          Get.offAllNamed('/login-screen');
        }
      }
    } catch (e) {
      String errorMessage = e.toString().replaceFirst('Exception: ', '');
      _showSnackbar('Error', errorMessage, isError: true);
    } finally {
      if (mounted) {
        setState(() {
          _isVerifying = false;
        });
      }
    }
  }

  Future<void> _resendOTP() async {
    if (_resendCountdown > 0) {
      _showSnackbar(
        'Please Wait',
        'You can resend OTP in $_resendCountdown seconds',
        isInfo: true,
      );
      return;
    }

    setState(() {
      _isResending = true;
    });

    try {
      await _otpService.sendSignUpVerificationOTP(widget.email);
      _showSnackbar('Success', 'OTP sent to ${widget.email}');
      _startResendTimer();

      // Clear existing OTP input
      for (var controller in _otpControllers) {
        controller.clear();
      }
      _focusNodes[0].requestFocus();
    } catch (e) {
      String errorMessage = e.toString().replaceFirst('Exception: ', '');
      _showSnackbar('Error', errorMessage, isError: true);
    } finally {
      if (mounted) {
        setState(() {
          _isResending = false;
        });
      }
    }
  }

  void _showSnackbar(String title, String message,
      {bool isError = false, bool isInfo = false}) {
    Color backgroundColor;
    IconData iconData;

    if (isError) {
      backgroundColor = Colors.red.shade600;
      iconData = Icons.error_outline;
    } else if (isInfo) {
      backgroundColor = const Color(0xFF008080);
      iconData = Icons.info_outline;
    } else {
      backgroundColor = Colors.green.shade600;
      iconData = Icons.check_circle_outline;
    }

    Get.snackbar(
      title,
      message,
      snackPosition: SnackPosition.TOP,
      backgroundColor: backgroundColor,
      colorText: Colors.white,
      borderRadius: 12,
      margin: const EdgeInsets.all(16),
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
      icon: Icon(iconData, color: Colors.white, size: 28),
      shouldIconPulse: false,
      duration: const Duration(seconds: 4),
      isDismissible: true,
      dismissDirection: DismissDirection.horizontal,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Color(0xFF008080)),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              // Verification Icon
              Container(
                width: 100,
                height: 100,
                decoration: BoxDecoration(
                  color: const Color(0xFF008080).withOpacity(0.1),
                  shape: BoxShape.circle,
                ),
                child: const Icon(
                  Icons.mail_outline,
                  size: 50,
                  color: Color(0xFF008080),
                ),
              ),
              const SizedBox(height: 24),

              // Title
              Text(
                'Email Verification',
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                  color: Colors.black87,
                ),
              ),
              const SizedBox(height: 12),

              // Subtitle
              Text(
                'We\'ve sent a verification code to',
                style: TextStyle(
                  fontSize: 16,
                  color: Colors.grey[600],
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 8),
              Text(
                widget.email,
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                  color: Color(0xFF008080),
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 40),

              // OTP Input Fields
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: List.generate(6, (index) {
                  return SizedBox(
                    width: 50,
                    height: 60,
                    child: TextFormField(
                      controller: _otpControllers[index],
                      focusNode: _focusNodes[index],
                      textAlign: TextAlign.center,
                      keyboardType: TextInputType.number,
                      maxLength: 1,
                      style: const TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                      ),
                      decoration: InputDecoration(
                        counterText: '',
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12),
                          borderSide: BorderSide(color: Colors.grey[300]!),
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12),
                          borderSide: BorderSide(color: Colors.grey[300]!),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12),
                          borderSide: const BorderSide(
                              color: Color(0xFF008080), width: 2),
                        ),
                      ),
                      inputFormatters: [
                        FilteringTextInputFormatter.digitsOnly,
                      ],
                      onChanged: (value) {
                        if (value.isNotEmpty && index < 5) {
                          _focusNodes[index + 1].requestFocus();
                        } else if (value.isEmpty && index > 0) {
                          _focusNodes[index - 1].requestFocus();
                        }

                        // Auto-verify when all digits are entered
                        if (index == 5 && value.isNotEmpty) {
                          _verifyOTP();
                        }
                      },
                    ),
                  );
                }),
              ),
              const SizedBox(height: 40),

              // Verify Button
              SizedBox(
                width: double.infinity,
                height: 55,
                child: ElevatedButton(
                  style: ButtonStyle(
                    backgroundColor:
                        WidgetStateProperty.all(const Color(0xFF008080)),
                    shape: WidgetStateProperty.all(
                      RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(15),
                      ),
                    ),
                  ),
                  onPressed: _isVerifying ? null : _verifyOTP,
                  child: _isVerifying
                      ? const SizedBox(
                          height: 24,
                          width: 24,
                          child: CircularProgressIndicator(
                            color: Colors.white,
                            strokeWidth: 2,
                          ),
                        )
                      : const Text(
                          'Verify',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.w600,
                            color: Colors.white,
                          ),
                        ),
                ),
              ),
              const SizedBox(height: 24),

              // Resend OTP
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    'Didn\'t receive the code? ',
                    style: TextStyle(
                      color: Colors.grey[600],
                      fontSize: 14,
                    ),
                  ),
                  if (_resendCountdown > 0)
                    Text(
                      'Resend in $_resendCountdown s',
                      style: TextStyle(
                        color: Colors.grey[400],
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                      ),
                    )
                  else
                    GestureDetector(
                      onTap: _isResending ? null : _resendOTP,
                      child: Text(
                        _isResending ? 'Sending...' : 'Resend',
                        style: TextStyle(
                          color: _isResending
                              ? Colors.grey[400]
                              : const Color(0xFF008080),
                          fontSize: 14,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                ],
              ),
              const SizedBox(height: 24),

              // Help Text
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.grey[100],
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Row(
                  children: [
                    Icon(
                      Icons.info_outline,
                      color: Colors.grey[600],
                      size: 20,
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Text(
                        'Check your spam folder if you don\'t see the email in your inbox.',
                        style: TextStyle(
                          color: Colors.grey[600],
                          fontSize: 12,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
