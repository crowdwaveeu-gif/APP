import 'package:flutter/material.dart';
import 'package:get/get.dart';

class AccountBlockedScreen extends StatelessWidget {
  final String? message;

  const AccountBlockedScreen({
    Key? key,
    this.message,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Center(
          child: Padding(
            padding: const EdgeInsets.all(24.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // Error Icon
                Container(
                  width: 120,
                  height: 120,
                  decoration: BoxDecoration(
                    color: Colors.red.shade50,
                    shape: BoxShape.circle,
                  ),
                  child: Icon(
                    Icons.block,
                    size: 64,
                    color: Colors.red.shade400,
                  ),
                ),
                const SizedBox(height: 32),

                // Title
                Text(
                  'Account Restricted',
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    color: Colors.grey.shade900,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 16),

                // Message
                Text(
                  message ??
                      'Your account has been restricted. Please contact support for assistance.',
                  style: TextStyle(
                    fontSize: 16,
                    color: Colors.grey.shade600,
                    height: 1.5,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 32),

                // Contact Support Button
                ElevatedButton.icon(
                  onPressed: () {
                    // TODO: Add support contact functionality
                    // For now, just show a dialog with contact information
                    showDialog(
                      context: context,
                      builder: (context) => AlertDialog(
                        title: const Text('Contact Support'),
                        content: const Column(
                          mainAxisSize: MainAxisSize.min,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('Please contact our support team:'),
                            SizedBox(height: 16),
                            Text(
                              'Email: support@crowdwave.com',
                              style: TextStyle(fontWeight: FontWeight.bold),
                            ),
                          ],
                        ),
                        actions: [
                          TextButton(
                            onPressed: () => Navigator.pop(context),
                            child: const Text('OK'),
                          ),
                        ],
                      ),
                    );
                  },
                  icon: const Icon(Icons.support_agent),
                  label: const Text('Contact Support'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF008080),
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(
                      horizontal: 32,
                      vertical: 16,
                    ),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                ),
                const SizedBox(height: 16),

                // Back to Login Button
                TextButton(
                  onPressed: () {
                    // Navigate back to login
                    Get.offAllNamed('/login');
                  },
                  child: const Text('Back to Login'),
                  style: TextButton.styleFrom(
                    foregroundColor: Colors.grey.shade600,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
