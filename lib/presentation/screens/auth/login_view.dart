import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart'
    show kIsWeb, TargetPlatform, defaultTargetPlatform;
import 'package:flutter/gestures.dart';
import 'package:firebase_auth/firebase_auth.dart';

import 'package:get/get.dart' hide Trans;
import 'package:easy_localization/easy_localization.dart';
import 'package:lottie/lottie.dart';

import '../../../core/constants.dart';
import '../../../controllers/simple_ui_controller.dart';
import '../../../services/enhanced_firebase_auth_service.dart';
import '../../../services/username_service.dart';
import '../../../services/static_content_service.dart';
import '../../../services/otp_service.dart';
import '../../../routes/app_routes.dart';
import '../../../core/validation_messages.dart';
import '../../widgets/static_content_viewer.dart';
import 'otp_verification_screen.dart';

class LoginView extends StatefulWidget {
  const LoginView({Key? key}) : super(key: key);

  @override
  State<LoginView> createState() => _LoginViewState();
}

class _LoginViewState extends State<LoginView> {
  TextEditingController nameController = TextEditingController();
  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  final _formKey = GlobalKey<FormState>();
  final EnhancedFirebaseAuthService _authService =
      EnhancedFirebaseAuthService();
  final UsernameService _usernameService = UsernameService();
  final OTPService _otpService = OTPService();

  @override
  void dispose() {
    nameController.dispose();
    emailController.dispose();
    passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    SimpleUIController simpleUIController = Get.put(SimpleUIController());
    return GestureDetector(
      onTap: () => FocusManager.instance.primaryFocus?.unfocus(),
      child: Scaffold(
        backgroundColor: Colors.white,
        resizeToAvoidBottomInset: true,
        body: LayoutBuilder(
          builder: (context, constraints) {
            if (constraints.maxWidth > 600) {
              return SafeArea(
                child: _buildLargeScreen(size, simpleUIController),
              );
            } else {
              return _buildSmallScreenWithFullTopAnimation(
                  size, simpleUIController);
            }
          },
        ),
      ),
    );
  }

  /// For large screens
  Widget _buildLargeScreen(
    Size size,
    SimpleUIController simpleUIController,
  ) {
    return Row(
      children: [
        Expanded(
          flex: 4,
          child: RotatedBox(
            quarterTurns: 3,
            child: Lottie.asset(
              'assets/animations/coin.json',
              height: size.height * 0.3,
              width: double.infinity,
              fit: BoxFit.fill,
            ),
          ),
        ),
        SizedBox(width: size.width * 0.06),
        Expanded(
          flex: 5,
          child: _buildMainBody(
            size,
            simpleUIController,
          ),
        ),
      ],
    );
  }

  /// For Small screens with full-top animation (no gap)
  Widget _buildSmallScreenWithFullTopAnimation(
    Size size,
    SimpleUIController simpleUIController,
  ) {
    return Column(
      children: [
        // Wave animation positioned at the very top with no gap
        Lottie.asset(
          'assets/animations/wave.json',
          height: size.height * 0.2,
          width: size.width,
          fit: BoxFit.fill,
        ),
        // Content wrapped in SafeArea to avoid status bar overlap
        Expanded(
          child: SafeArea(
            top: false, // Don't add top padding since animation handles the top
            child: SingleChildScrollView(
              physics: const BouncingScrollPhysics(),
              child: _buildMainBodyWithoutAnimation(
                size,
                simpleUIController,
              ),
            ),
          ),
        ),
      ],
    );
  }

  /// Main Body
  Widget _buildMainBody(
    Size size,
    SimpleUIController simpleUIController,
  ) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisAlignment:
          size.width > 600 ? MainAxisAlignment.center : MainAxisAlignment.start,
      children: [
        size.width > 600
            ? Container()
            : Lottie.asset(
                'assets/animations/wave.json',
                height: size.height * 0.2,
                width: size.width,
                fit: BoxFit.fill,
              ),
        SizedBox(
          height: size.height * 0.03,
        ),
        Padding(
          padding: const EdgeInsets.only(left: 20.0),
          child: Text(
            'auth.login'.tr(),
            style: kLoginTitleStyle(size),
          ),
        ),
        const SizedBox(
          height: 10,
        ),
        Padding(
          padding: const EdgeInsets.only(left: 20.0),
          child: RichText(
            text: TextSpan(
              text: 'Join the ',
              style: kLoginSubtitleStyle(size).copyWith(
                color: Colors.black87, // Changed to dark color for visibility
              ),
              children: [
                TextSpan(
                  text: 'common.wave'.tr(),
                  style: kLoginSubtitleStyle(size).copyWith(
                    color: Color(0xFF008080),
                    fontWeight: FontWeight.bold,
                    shadows: [
                      Shadow(
                        blurRadius: 8.0,
                        color: Color(0xFF008080).withOpacity(0.3),
                        offset: const Offset(0, 2),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
        SizedBox(
          height: size.height * 0.03,
        ),
        Padding(
          padding: const EdgeInsets.only(left: 20.0, right: 20),
          child: Form(
            key: _formKey,
            child: Column(
              children: [
                /// username or Gmail
                TextFormField(
                  style: kTextFormFieldStyle(),
                  decoration: InputDecoration(
                    prefixIcon: const Icon(Icons.person),
                    hintText: 'common.username_or_gmail'.tr(),
                    border: const OutlineInputBorder(
                      borderRadius: BorderRadius.all(Radius.circular(15)),
                    ),
                  ),
                  controller: nameController,
                  // The validator receives the text that the user has entered.
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter username or email';
                    } else if (value.length < 3) {
                      return 'Must be at least 3 characters';
                    } else if (value.length > 30) {
                      return 'Cannot exceed 30 characters';
                    }
                    return null;
                  },
                ),
                // SizedBox(
                //   height: size.height * 0.02,
                // ),
                // TextFormField(
                //   controller: emailController,
                //   decoration: const InputDecoration(
                //     prefixIcon: Icon(Icons.email_rounded),
                //     hintText: 'gmail',
                //     border: OutlineInputBorder(
                //       borderRadius: BorderRadius.all(Radius.circular(15)),
                //     ),
                //   ),
                //   // The validator receives the text that the user has entered.
                //   validator: (value) {
                //     if (value == null || value.isEmpty) {
                //       return 'Please enter gmail';
                //     } else if (!value.endsWith('@gmail.com')) {
                //       return 'please enter valid gmail';
                //     }
                //     return null;
                //   },
                // ),
                SizedBox(
                  height: size.height * 0.02,
                ),

                /// password
                Obx(
                  () => TextFormField(
                    style: kTextFormFieldStyle(),
                    controller: passwordController,
                    obscureText: simpleUIController.isObscure.value,
                    decoration: InputDecoration(
                      prefixIcon: const Icon(Icons.lock_open),
                      suffixIcon: IconButton(
                        icon: Icon(
                          simpleUIController.isObscure.value
                              ? Icons.visibility
                              : Icons.visibility_off,
                        ),
                        onPressed: () {
                          simpleUIController.isObscureActive();
                        },
                      ),
                      hintText: 'auth.password'.tr(),
                      border: const OutlineInputBorder(
                        borderRadius: BorderRadius.all(Radius.circular(15)),
                      ),
                    ),
                    // The validator receives the text that the user has entered.
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter your password';
                      }
                      return null;
                    },
                  ),
                ),
                SizedBox(
                  height: size.height * 0.01,
                ),

                /// Forgot Password Link
                Align(
                  alignment: Alignment.centerRight,
                  child: GestureDetector(
                    onTap: () {
                      Get.toNamed('/password-reset');
                    },
                    child: Text(
                      'auth.forgot_password'.tr(),
                      style: TextStyle(
                        color: Color(0xFF008080),
                        fontWeight: FontWeight.w600,
                        fontSize: 14,
                      ),
                    ),
                  ),
                ),
                SizedBox(
                  height: size.height * 0.02,
                ),
                _buildTermsAndPrivacyText(size),
                SizedBox(
                  height: size.height * 0.02,
                ),

                /// Login Button
                loginButton(),
                SizedBox(
                  height: size.height * 0.02,
                ),

                /// Social Login Buttons
                _socialLoginButtons(),
                SizedBox(
                  height: size.height * 0.03,
                ),

                /// Navigate To Login Screen
                GestureDetector(
                  onTap: () {
                    Navigator.pushNamed(context, AppRoutes.registration);
                    nameController.clear();
                    emailController.clear();
                    passwordController.clear();
                    _formKey.currentState?.reset();
                    simpleUIController.isObscure.value = true;
                  },
                  child: RichText(
                    text: TextSpan(
                      text: 'Don\'t have an account?',
                      style: kHaveAnAccountStyle(size),
                      children: [
                        TextSpan(
                          text: " Sign up",
                          style: kLoginOrSignUpTextStyle(
                            size,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                // Add bottom padding for keyboard
                const SizedBox(height: 20),
              ],
            ),
          ),
        ),
      ],
    );
  }

  // --- Added Social Login Section (Google & Apple) with robust error handling ---
  Widget _socialLoginButtons() {
    // Platform gating: we intentionally hide Google on iOS (App Store rules encourage Apple sign-in)
    // and hide Apple on Android where it adds little UX value. Web shows both.
    final bool isIOS = !kIsWeb && defaultTargetPlatform == TargetPlatform.iOS;
    final bool isAndroid =
        !kIsWeb && defaultTargetPlatform == TargetPlatform.android;

    return Column(
      children: [
        if (!isIOS) // Hide Google on iOS devices
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Expanded(
                child: ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.white,
                    foregroundColor: Colors.black87,
                    side: const BorderSide(color: Color(0xFF008080), width: 1),
                    padding: const EdgeInsets.symmetric(vertical: 12),
                  ),
                  icon: const Icon(Icons.g_mobiledata, size: 24),
                  label: const Text('Continue with Google'),
                  onPressed: _handleGoogleSignIn,
                ),
              ),
            ],
          ),
        if (!isIOS) const SizedBox(height: 12),
        if (!isAndroid) // Hide Apple on Android devices
          Row(
            children: [
              Expanded(
                child: ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.black,
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 12),
                  ),
                  icon: const Icon(Icons.apple, size: 20),
                  label: const Text('Continue with Apple'),
                  onPressed: _handleAppleSignIn,
                ),
              ),
            ],
          ),
      ],
    );
  }

  Future<void> _handleGoogleSignIn() async {
    if (!mounted) return;
    ScaffoldMessenger.of(context).clearSnackBars();
    final messenger = ScaffoldMessenger.of(context);
    try {
      final user = await _authService.signInWithGoogle();
      if (user == null) {
        messenger.showSnackBar(
          const SnackBar(content: Text('Google sign-in cancelled')),
        );
        return;
      }
      messenger.showSnackBar(
        SnackBar(content: Text('Welcome, ${user.displayName ?? 'User'}')),
      );
      // AuthWrapper will rebuild automatically due to provider listener
    } catch (e) {
      messenger.showSnackBar(
        SnackBar(
            content: Text('Google sign-in failed: $e'),
            backgroundColor: Colors.red),
      );
    }
  }

  Future<void> _handleAppleSignIn() async {
    if (!mounted) return;
    ScaffoldMessenger.of(context).clearSnackBars();
    final messenger = ScaffoldMessenger.of(context);
    try {
      final user = await _authService.signInWithApple();
      if (user == null) {
        messenger.showSnackBar(
          const SnackBar(content: Text('Apple sign-in cancelled')),
        );
        return;
      }
      messenger.showSnackBar(
        SnackBar(content: Text('Welcome, ${user.displayName ?? 'User'}')),
      );
    } catch (e) {
      messenger.showSnackBar(
        SnackBar(
            content: Text('Apple sign-in failed: $e'),
            backgroundColor: Colors.red),
      );
    }
  }

  /// Main Body Without Animation (for when animation is positioned separately)
  Widget _buildMainBodyWithoutAnimation(
    Size size,
    SimpleUIController simpleUIController,
  ) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(
          height: size.height * 0.03,
        ),
        Padding(
          padding: const EdgeInsets.only(left: 20.0),
          child: Text(
            'auth.login'.tr(),
            style: kLoginTitleStyle(size),
          ),
        ),
        const SizedBox(
          height: 10,
        ),
        Padding(
          padding: const EdgeInsets.only(left: 20.0),
          child: RichText(
            text: TextSpan(
              text: 'Join the ',
              style: kLoginSubtitleStyle(size).copyWith(
                color: Colors.black87, // Changed to dark color for visibility
              ),
              children: [
                TextSpan(
                  text: 'Wave',
                  style: kLoginSubtitleStyle(size).copyWith(
                    color: Color(0xFF008080),
                    fontWeight: FontWeight.bold,
                    shadows: [
                      Shadow(
                        blurRadius: 8.0,
                        color: Color(0xFF008080).withOpacity(0.3),
                        offset: const Offset(0, 2),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
        SizedBox(
          height: size.height * 0.03,
        ),
        Padding(
          padding: const EdgeInsets.only(left: 20.0, right: 20),
          child: Form(
            key: _formKey,
            child: Column(
              children: [
                /// username or Gmail
                TextFormField(
                  controller: nameController,
                  style: kTextFormFieldStyle(),
                  decoration: InputDecoration(
                    prefixIcon: const Icon(Icons.person),
                    hintText: 'common.username_or_email'.tr(),
                    border: const OutlineInputBorder(
                      borderRadius: BorderRadius.all(Radius.circular(15)),
                    ),
                  ),
                  validator: (value) {
                    // Basic validation for username or email
                    if (value == null || value.trim().isEmpty) {
                      return 'Please enter your username or email';
                    } else if (value.length < 3) {
                      return 'Username must be at least 3 characters';
                    } else if (value.length > 30) {
                      return 'Username must be less than 30 characters';
                    }
                    return null;
                  },
                ),
                SizedBox(
                  height: size.height * 0.02,
                ),

                /// password
                Obx(
                  () => TextFormField(
                    controller: passwordController,
                    style: kTextFormFieldStyle(),
                    obscureText: simpleUIController.isObscure.value,
                    decoration: InputDecoration(
                      prefixIcon: const Icon(Icons.lock_open),
                      suffixIcon: IconButton(
                        onPressed: simpleUIController.isObscureActive,
                        icon: Icon(
                          simpleUIController.isObscure.value
                              ? Icons.visibility
                              : Icons.visibility_off,
                        ),
                      ),
                      hintText: 'auth.password'.tr(),
                      border: const OutlineInputBorder(
                        borderRadius: BorderRadius.all(Radius.circular(15)),
                      ),
                    ),
                    validator: (value) {
                      return ValidationMessages.validatePassword(value);
                    },
                  ),
                ),
                SizedBox(
                  height: size.height * 0.01,
                ),

                /// Forgot Password Link
                Align(
                  alignment: Alignment.centerRight,
                  child: GestureDetector(
                    onTap: () {
                      Get.toNamed('/password-reset');
                    },
                    child: Text(
                      'auth.forgot_password'.tr(),
                      style: TextStyle(
                        color: Color(0xFF008080),
                        fontWeight: FontWeight.w600,
                        fontSize: 14,
                      ),
                    ),
                  ),
                ),

                SizedBox(
                  height: size.height * 0.03,
                ),

                /// Login Button
                loginButton(),
                SizedBox(
                  height: size.height * 0.03,
                ),

                /// Social Login Buttons
                socialLoginButtons(),
                SizedBox(
                  height: size.height * 0.03,
                ),

                /// Navigate To Login Screen
                GestureDetector(
                  onTap: () {
                    Navigator.pushNamed(context, AppRoutes.registration);
                    nameController.clear();
                    emailController.clear();
                    passwordController.clear();
                    _formKey.currentState?.reset();
                    simpleUIController.isObscure.value = true;
                  },
                  child: RichText(
                    text: TextSpan(
                      text: 'Don\'t have an account?',
                      style: kHaveAnAccountStyle(size),
                      children: [
                        TextSpan(
                          text: " Sign up",
                          style: kLoginOrSignUpTextStyle(
                            size,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                // Add bottom padding for keyboard
                const SizedBox(height: 20),
              ],
            ),
          ),
        ),
      ],
    );
  }

  // Login Button
  Widget loginButton() {
    return SizedBox(
      width: double.infinity,
      height: 55,
      child: ElevatedButton(
        style: ButtonStyle(
          backgroundColor: WidgetStateProperty.all(const Color(0xFF008080)),
          shape: WidgetStateProperty.all(
            RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(15),
            ),
          ),
        ),
        onPressed: () async {
          // Validate returns true if the form is valid, or false otherwise.
          if (_formKey.currentState!.validate()) {
            try {
              String loginIdentifier = nameController.text.trim();
              String email = loginIdentifier;

              // Check if the input is a username (not an email)
              if (!loginIdentifier.contains('@')) {
                // It's a username, so we need to get the email
                final userEmail = await _usernameService
                    .getUserEmailByUsername(loginIdentifier);
                if (userEmail == null) {
                  _showCustomSnackbar('Error',
                      'Username not found. Please check and try again.',
                      isError: true);
                  return;
                }
                email = userEmail;
              } else {
                // It's an email, validate format
                if (!RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$')
                    .hasMatch(email)) {
                  _showCustomSnackbar(
                      'Error', 'Please enter a valid email address',
                      isError: true);
                  return;
                }
              }

              // Now authenticate with Firebase using email and password
              final user = await _authService.signInWithEmailAndPassword(
                email,
                passwordController.text.trim(),
              );

              if (user != null) {
                // Check if email is verified
                if (!user.emailVerified) {
                  // Send OTP and navigate to verification screen
                  await _handleEmailVerificationRequired(user, email);
                  return;
                }

                // Navigate to home or dashboard
                _showCustomSnackbar('Success', 'Login successful!');
                Get.offAllNamed('/main-navigation');
              }
            } catch (e) {
              // Show user-friendly error message instead of development error
              String errorMessage =
                  e.toString().replaceFirst('Exception: ', '');
              _showCustomSnackbar('Error', errorMessage, isError: true);
            }
          }
        },
        child: Text('auth.login'.tr()),
      ),
    );
  }

  // Social Login Buttons
  Widget socialLoginButtons() {
    // Platform gating: hide Google button on iOS, hide Apple button on Android.
    // Keep Facebook everywhere. Web gets all providers.
    final bool isIOS = !kIsWeb && defaultTargetPlatform == TargetPlatform.iOS;
    final bool isAndroid =
        !kIsWeb && defaultTargetPlatform == TargetPlatform.android;

    // Build the list of social buttons conditionally
    final List<Widget> buttons = [];

    // Google (hidden on iOS)
    if (!isIOS) {
      buttons.add(
        _socialIconButton(
          iconPath: 'assets/icons8-google-color/icons8-google-48.png',
          onPressed: () async {
            try {
              final user = await _authService.signInWithGoogle();
              if (user != null) {
                _showCustomSnackbar('Success', 'Google login successful!');
                Get.offAllNamed('/main-navigation');
              }
            } catch (e) {
              String errorMessage =
                  e.toString().replaceFirst('Exception: ', '');
              _showCustomSnackbar('Error', errorMessage, isError: true);
            }
          },
        ),
      );
    }

    // Facebook (always shown)
    buttons.add(
      _socialIconButton(
        iconPath: 'assets/images/facebook-icon.png',
        onPressed: () async {
          try {
            final user = await _authService.signInWithFacebook();
            if (user != null) {
              _showCustomSnackbar('Success', 'Facebook login successful!');
              Get.offAllNamed('/main-navigation');
            }
          } catch (e) {
            String errorMessage = e.toString().replaceFirst('Exception: ', '');
            _showCustomSnackbar('Error', errorMessage, isError: true);
          }
        },
      ),
    );

    // Apple (hidden on Android)
    if (!isAndroid) {
      buttons.add(
        _socialIconButton(
          iconPath: 'assets/icons8-apple-ios-17-outlined/icons8-apple-100.png',
          onPressed: () async {
            try {
              final user = await _authService.signInWithApple();
              if (user != null) {
                _showCustomSnackbar('Success', 'Apple login successful!');
                Get.offAllNamed('/main-navigation');
              }
            } catch (e) {
              String errorMessage =
                  e.toString().replaceFirst('Exception: ', '');
              _showCustomSnackbar('Error', errorMessage, isError: true);
            }
          },
        ),
      );
    }

    return Column(
      children: [
        // Divider with "or" text
        Row(
          children: [
            Expanded(child: Divider(color: Colors.grey[400])),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Text(
                'or',
                style: TextStyle(color: Colors.grey[600], fontSize: 14),
              ),
            ),
            Expanded(child: Divider(color: Colors.grey[400])),
          ],
        ),
        const SizedBox(height: 16),

        // Compact Social Login Buttons Row
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: buttons,
        ),
      ],
    );
  }

  // Helper method for social icon buttons
  Widget _socialIconButton({
    required String iconPath,
    required VoidCallback onPressed,
  }) {
    return Container(
      width: 60,
      height: 60,
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey[300]!),
        borderRadius: BorderRadius.circular(12),
      ),
      child: IconButton(
        onPressed: onPressed,
        icon: Image.asset(
          iconPath,
          height: 28,
          width: 28,
        ),
      ),
    );
  }

  // Enhanced snackbar method
  void _showCustomSnackbar(String title, String message,
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
      icon: Icon(
        iconData,
        color: Colors.white,
        size: 28,
      ),
      shouldIconPulse: false,
      duration: const Duration(seconds: 4),
      isDismissible: true,
      dismissDirection: DismissDirection.horizontal,
      forwardAnimationCurve: Curves.easeOutBack,
      boxShadows: [
        BoxShadow(
          color: Colors.black.withOpacity(0.2),
          spreadRadius: 1,
          blurRadius: 8,
          offset: const Offset(0, 3),
        ),
      ],
    );
  }

  // Handle Email Verification Required - Send OTP and navigate to verification screen
  Future<void> _handleEmailVerificationRequired(User user, String email) async {
    try {
      // Send OTP to email
      _showCustomSnackbar(
        'Sending OTP',
        'Sending verification code to $email...',
        isInfo: true,
      );

      await _otpService.sendSignUpVerificationOTP(email);

      _showCustomSnackbar(
        'Success',
        'Verification code sent! Please check your email.',
      );

      // Navigate to OTP verification screen
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => OTPVerificationScreen(
            email: email,
            user: user,
            verificationType: 'email_verification',
          ),
        ),
      );
    } catch (e) {
      String errorMessage = e.toString().replaceFirst('Exception: ', '');
      _showCustomSnackbar('Error', errorMessage, isError: true);

      // Sign out the user since verification failed
      await _authService.signOut();
    }
  }

  /// Build Terms and Privacy Policy Text with clickable links
  Widget _buildTermsAndPrivacyText(Size size) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20.0),
      child: RichText(
        textAlign: TextAlign.center,
        text: TextSpan(
          style: kLoginTermsAndPrivacyStyle(size),
          children: [
            const TextSpan(
              text: 'Creating an account means you\'re okay with our ',
            ),
            TextSpan(
              text: 'Terms of Service',
              style: kLoginTermsAndPrivacyStyle(size).copyWith(
                decoration: TextDecoration.underline,
                color: const Color(0xFF008080),
                fontWeight: FontWeight.w600,
              ),
              recognizer: TapGestureRecognizer()
                ..onTap = () {
                  showStaticContentSheet(
                    context,
                    StaticContentType.termsOfService,
                  );
                },
            ),
            const TextSpan(
              text: ' and our ',
            ),
            TextSpan(
              text: 'Privacy Policy',
              style: kLoginTermsAndPrivacyStyle(size).copyWith(
                decoration: TextDecoration.underline,
                color: const Color(0xFF008080),
                fontWeight: FontWeight.w600,
              ),
              recognizer: TapGestureRecognizer()
                ..onTap = () {
                  showStaticContentSheet(
                    context,
                    StaticContentType.privacyPolicy,
                  );
                },
            ),
          ],
        ),
      ),
    );
  }
}
