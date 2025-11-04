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
      console.log('OTP stored successfully for:', email);
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
        console.log('No OTP found for email:', email);
        return false;
      }

      const otpRecord = otpSnap.data() as OTPRecord;

      // Check if OTP has expired
      if (Date.now() > otpRecord.expiresAt) {
        console.log('OTP expired for:', email);
        await this.deleteOTP(email);
        return false;
      }

      // Check if OTP matches
      if (otpRecord.code !== otp) {
        console.log('OTP mismatch for:', email);
        return false;
      }

      // OTP is valid, delete it after successful verification
      await this.deleteOTP(email);
      console.log('OTP verified successfully for:', email);
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
      console.log('OTP deleted for:', email);
    } catch (error) {
      console.error('Error deleting OTP:', error);
    }
  }

  // Send OTP via email using Firebase Cloud Functions
  async sendOTPEmail(email: string, otp: string, purpose: 'login' | 'password-reset' = 'login'): Promise<void> {
    try {
      console.log('📧 Sending OTP email via Firebase Cloud Functions to:', email, 'Purpose:', purpose);
      
      // Import Firebase Functions dynamically to avoid circular dependencies
      const { getFunctions, httpsCallable } = await import('firebase/functions');
      const { default: app } = await import('./firebase');
      
      const functions = getFunctions(app);
      const sendCrmLoginOTP = httpsCallable(functions, 'sendCrmLoginOTP');
      
      await sendCrmLoginOTP({
        email,
        otp
      });

      console.log('✅ OTP email sent successfully via Firebase Cloud Functions');
      console.log('🔐 OTP FOR TESTING:', otp); // Keep this for testing, remove in production
      
    } catch (error: any) {
      console.error('❌ Error sending OTP email:', error);
      
      // Fallback: Log to console if Firebase Functions are unavailable
      const subject = purpose === 'password-reset' 
        ? 'Your Password Reset Code' 
        : 'Your CRM Login OTP Code';
      const message = purpose === 'password-reset'
        ? 'You have requested to reset your password.'
        : 'You have requested to login to CrowdWave CRM.';
      
      console.log('='.repeat(60));
      console.log('📧 OTP EMAIL (Firebase Functions unavailable - Using console fallback)');
      console.log('='.repeat(60));
      console.log(`To: ${email}`);
      console.log(`Subject: ${subject}`);
      console.log(`\n${message}`);
      console.log(`Your OTP code is: ${otp}`);
      console.log(`This code will expire in ${this.OTP_EXPIRY_MINUTES} minutes.`);
      console.log('='.repeat(60));
      
      // Don't throw error - allow flow to continue with console OTP
      // In production, you might want to throw the error instead
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
