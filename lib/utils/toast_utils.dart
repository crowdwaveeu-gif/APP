import 'package:flutter/material.dart';
import 'package:get/get.dart';

class ToastUtils {
  /// Shows a visible bottom toast with proper background.
  /// If [title] is provided, it's concatenated with the [message].
  static void show(String message, {String? title, Duration? duration}) {
    final text = (title != null && title.trim().isNotEmpty)
        ? '${title.trim()} — ${message.trim()}'
        : message.trim();

    if (text.isEmpty) return;

    // Dismiss any existing snackbar to avoid stacking
    if (Get.isSnackbarOpen) {
      Get.back();
    }

    Get.rawSnackbar(
      messageText: Container(
        padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 12),
        decoration: BoxDecoration(
          color: Colors.green.shade700,
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.3),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.2),
                shape: BoxShape.circle,
              ),
              child: const Icon(
                Icons.check_circle,
                color: Colors.white,
                size: 20,
              ),
            ),
            const SizedBox(width: 12),
            Flexible(
              child: Text(
                text,
                textAlign: TextAlign.center,
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 15,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ],
        ),
      ),
      backgroundColor: Colors.transparent,
      borderRadius: 16,
      margin: const EdgeInsets.only(left: 20, right: 20, bottom: 80),
      padding: EdgeInsets.zero,
      snackPosition: SnackPosition.BOTTOM,
      duration: duration ?? const Duration(seconds: 3),
      isDismissible: true,
      dismissDirection: DismissDirection.down,
      forwardAnimationCurve: Curves.easeOutCubic,
      reverseAnimationCurve: Curves.easeInCubic,
    );
  }
}
