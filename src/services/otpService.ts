// OTP Service for email-based authentication
import { db } from './firebase';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';

interface OTPRecord {
  code: string;
  email: string;
  expiresAt: number;
  createdAt: number;
}

class OTPService {
  private readonly OTP_COLLECTION = 'otp_codes';
  private readonly OTP_EXPIRY_MINUTES = 10;

  // Generate a 6-digit OTP code
  generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Store OTP in Firestore
  async storeOTP(email: string, otp: string): Promise<void> {
    try {
      const otpDoc = doc(db, this.OTP_COLLECTION, email);
      const expiresAt = Date.now() + (this.OTP_EXPIRY_MINUTES * 60 * 1000);
      
      const otpRecord: OTPRecord = {
        code: otp,
        email,
        expiresAt,
        createdAt: Date.now()
      };

      await setDoc(otpDoc, otpRecord);
    } catch (error) {
      console.error('Error storing OTP:', error);
      throw new Error('Failed to store OTP');
    }
  }

  // Verify OTP from Firestore
  async verifyOTP(email: string, otp: string): Promise<boolean> {
    try {
      const otpDoc = doc(db, this.OTP_COLLECTION, email);
      const otpSnap = await getDoc(otpDoc);

      if (!otpSnap.exists()) {
        return false;
      }

      const otpRecord = otpSnap.data() as OTPRecord;

      // Check if OTP has expired
      if (Date.now() > otpRecord.expiresAt) {
        await this.deleteOTP(email);
        return false;
      }

      // Check if OTP matches
      if (otpRecord.code !== otp) {
        return false;
      }

      // OTP is valid, delete it after successful verification
      await this.deleteOTP(email);
      return true;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return false;
    }
  }

  // Delete OTP from Firestore
  async deleteOTP(email: string): Promise<void> {
    try {
      const otpDoc = doc(db, this.OTP_COLLECTION, email);
      await deleteDoc(otpDoc);
    } catch (error) {
      console.error('Error deleting OTP:', error);
    }
  }

  // Send OTP via email using Firebase Cloud Functions
  async sendOTPEmail(email: string, otp: string, purpose: 'login' | 'password-reset' = 'login'): Promise<void> {
    try {
      // Import Firebase Functions dynamically to avoid circular dependencies
      const { getFunctions, httpsCallable } = await import('firebase/functions');
      const { default: app } = await import('./firebase');
      
      const functions = getFunctions(app);
      const sendCrmLoginOTP = httpsCallable(functions, 'sendCrmLoginOTP');
      
      await sendCrmLoginOTP({
        email,
        otp,
        purpose
      });
      
    } catch (error: any) {
      console.error('Failed to send OTP email:', error);
      throw new Error('Failed to send OTP email. Please try again.');
    }
  }

  // Complete OTP flow: generate, store, and send
  async initiateOTP(email: string, purpose: 'login' | 'password-reset' = 'login'): Promise<string> {
    try {
      const otp = this.generateOTP();
      await this.storeOTP(email, otp);
      await this.sendOTPEmail(email, otp, purpose);
      return otp; // Return for development/testing purposes
    } catch (error) {
      console.error('Error initiating OTP:', error);
      throw new Error('Failed to initiate OTP');
    }
  }
}

export const otpService = new OTPService();
