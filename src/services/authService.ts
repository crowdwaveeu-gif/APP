import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  User,
  updatePassword as firebaseUpdatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential
} from 'firebase/auth';
import { auth } from './firebase';
import { otpService } from './otpService';

// Admin credentials for CRM access
export const ADMIN_EMAIL = 'crowdwave.eu@gmail.com';
export const ADMIN_PASSWORD = 'Admin123@';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export interface Session {
  userId: string;
  email: string;
  loginTime: number;
  expiresAt: number;
}

class AuthService {
  private currentUser: User | null = null;
  private readonly SESSION_DURATION_DAYS = 7;
  private readonly SESSION_KEY = 'crm_session';

  constructor() {
    // Listen for auth state changes
    onAuthStateChanged(auth, (user) => {
      this.currentUser = user;
    });
  }

  // Step 1: Validate credentials and send OTP
  async initiateLogin(email: string, password: string): Promise<{ success: boolean; message: string }> {
    try {
      // Validate credentials with Firebase
      await signInWithEmailAndPassword(auth, email, password);
      
      // Immediately sign out to prevent auto-login
      await signOut(auth);
      
      // Generate and send OTP
      const otp = await otpService.initiateOTP(email);
      
      console.log('OTP sent successfully to:', email);
      console.log('🔐 OTP FOR TESTING:', otp); // Remove in production
      
      return {
        success: true,
        message: 'OTP sent to your email. Please check your inbox.'
      };
    } catch (error: any) {
      console.error('Login initiation failed:', error);
      
      if (error.code === 'auth/user-not-found') {
        return { success: false, message: 'Invalid email or password' };
      } else if (error.code === 'auth/wrong-password') {
        return { success: false, message: 'Invalid email or password' };
      } else if (error.code === 'auth/too-many-requests') {
        return { success: false, message: 'Too many failed attempts. Please try again later.' };
      }
      
      return { success: false, message: 'Login failed. Please try again.' };
    }
  }

  // Step 2: Verify OTP and complete login
  async verifyOTPAndLogin(email: string, password: string, otp: string): Promise<{ success: boolean; message: string; user?: AuthUser }> {
    try {
      // Verify OTP
      const isOTPValid = await otpService.verifyOTP(email, otp);
      
      if (!isOTPValid) {
        return { success: false, message: 'Invalid or expired OTP. Please try again.' };
      }

      // OTP is valid, proceed with login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      const authUser: AuthUser = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName || 'CRM Admin'
      };

      // Create session
      this.createSession(authUser);
      
      console.log('Login successful for:', email);
      return {
        success: true,
        message: 'Login successful!',
        user: authUser
      };
    } catch (error: any) {
      console.error('OTP verification/login failed:', error);
      return { success: false, message: 'Login failed. Please try again.' };
    }
  }

  // Create session with expiry
  private createSession(user: AuthUser): void {
    const loginTime = Date.now();
    const expiresAt = loginTime + (this.SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000);
    
    const session: Session = {
      userId: user.uid,
      email: user.email || '',
      loginTime,
      expiresAt
    };

    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    console.log('Session created, expires in', this.SESSION_DURATION_DAYS, 'days');
  }

  // Get current session
  getSession(): Session | null {
    try {
      const sessionData = localStorage.getItem(this.SESSION_KEY);
      if (!sessionData) return null;

      const session: Session = JSON.parse(sessionData);
      
      // Check if session has expired
      if (Date.now() > session.expiresAt) {
        console.log('Session expired');
        this.clearSession();
        return null;
      }

      return session;
    } catch (error) {
      console.error('Error reading session:', error);
      return null;
    }
  }

  // Check if session is valid
  isSessionValid(): boolean {
    const session = this.getSession();
    return session !== null && this.currentUser !== null;
  }

  // Clear session
  clearSession(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }

  // Sign out
  async logout(): Promise<void> {
    try {
      await signOut(auth);
      this.clearSession();
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  // Change password
  async changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    try {
      if (!this.currentUser || !this.currentUser.email) {
        return { success: false, message: 'No user is currently logged in' };
      }

      // Re-authenticate user before changing password
      const credential = EmailAuthProvider.credential(
        this.currentUser.email,
        currentPassword
      );
      
      await reauthenticateWithCredential(this.currentUser, credential);
      
      // Update password
      await firebaseUpdatePassword(this.currentUser, newPassword);
      
      console.log('Password changed successfully');
      return { success: true, message: 'Password changed successfully!' };
    } catch (error: any) {
      console.error('Password change failed:', error);
      
      if (error.code === 'auth/wrong-password') {
        return { success: false, message: 'Current password is incorrect' };
      } else if (error.code === 'auth/weak-password') {
        return { success: false, message: 'New password is too weak' };
      }
      
      return { success: false, message: 'Failed to change password. Please try again.' };
    }
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.currentUser !== null && this.isSessionValid();
  }

  // Wait for auth state to be ready
  async waitForAuthReady(): Promise<User | null> {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        resolve(user);
      });
    });
  }

  // Step 1: Initiate password reset - verify email and send OTP
  async initiatePasswordReset(email: string): Promise<{ success: boolean; message: string }> {
    try {
      // Generate and send OTP with password-reset purpose
      const otp = await otpService.initiateOTP(email, 'password-reset');
      
      console.log('Password reset OTP sent to:', email);
      console.log('🔐 OTP FOR TESTING:', otp); // Remove in production
      
      return {
        success: true,
        message: 'OTP has been sent to your email. Please check your inbox.'
      };
    } catch (error: any) {
      console.error('Password reset initiation failed:', error);
      
      return {
        success: false,
        message: 'Failed to send OTP. Please try again.'
      };
    }
  }

  // Step 2: Verify OTP and reset password
  async verifyOTPAndResetPassword(
    email: string, 
    otp: string, 
    newPassword: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Call Firebase Cloud Function to reset password with OTP
      const { httpsCallable } = await import('firebase/functions');
      const { functions } = await import('./firebase');
      
      const resetPasswordWithOTP = httpsCallable(functions, 'resetPasswordWithOTP');
      
      const result = await resetPasswordWithOTP({
        email,
        otp,
        newPassword
      });

      const resultData = result.data as { success: boolean; message: string };
      
      if (resultData.success) {
        return {
          success: true,
          message: 'Password has been reset successfully! You can now login with your new password.'
        };
      } else {
        return {
          success: false,
          message: resultData.message || 'Password reset failed. Please try again.'
        };
      }
    } catch (error: any) {
      console.error('Password reset failed:', error);
      
      // Handle Firebase Functions errors
      if (error.code === 'functions/not-found') {
        return { success: false, message: 'Invalid or expired OTP. Please try again.' };
      } else if (error.code === 'functions/deadline-exceeded') {
        return { success: false, message: 'OTP has expired. Please request a new one.' };
      } else if (error.code === 'functions/permission-denied') {
        return { success: false, message: 'Invalid OTP. Please try again.' };
      } else if (error.code === 'auth/user-not-found') {
        return { success: false, message: 'No account found with this email address.' };
      } else if (error.code === 'auth/weak-password') {
        return { success: false, message: 'Password is too weak. Please use a stronger password.' };
      }
      
      return { success: false, message: error.message || 'Password reset failed. Please try again.' };
    }
  }
}

export const authService = new AuthService();