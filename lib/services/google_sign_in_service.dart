/// Google Sign-In service (implemented because original file was empty and caused runtime issues)
///
/// This wraps the `EnhancedFirebaseAuthService` Google sign-in logic to keep
/// UI widgets thin and provide centralized error handling & optional telemetry.
///
/// Usage:
/// ```dart
/// final googleAuth = GoogleSignInService();
/// final user = await googleAuth.signIn();
/// ```
/// If `user` is null the user cancelled the flow.
import 'package:firebase_auth/firebase_auth.dart';
import 'enhanced_firebase_auth_service.dart';

class GoogleSignInService {
  GoogleSignInService._();
  static final GoogleSignInService _instance = GoogleSignInService._();
  factory GoogleSignInService() => _instance;

  final EnhancedFirebaseAuthService _auth =
      EnhancedFirebaseAuthService.instance;

  /// Perform Google Sign-In. Returns the Firebase [User] or null if the user cancelled.
  /// Throws a wrapped [Exception] with a user-friendly message on failure.
  Future<User?> signIn() async {
    try {
      final user = await _auth.signInWithGoogle();
      return user; // null means cancelled
    } catch (e) {
      throw Exception(_friendlyError(e));
    }
  }

  /// Sign out of all auth providers (Google + Firebase)
  Future<void> signOut() async {
    try {
      await _auth.signOut();
    } catch (_) {
      // swallow; sign out best-effort
    }
  }

  String _friendlyError(Object e) {
    final msg = e.toString();
    if (msg.contains('network'))
      return 'Network issue – check your connection and try again.';
    if (msg.contains('restricted')) return msg; // account blocked message
    if (msg.contains('sign in failed'))
      return 'Google sign in failed. Please try again.';
    return 'Unable to sign in with Google right now. Please retry.';
  }
}
