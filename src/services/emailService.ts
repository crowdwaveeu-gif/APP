/**
 * Email Service for CrowdWave CRM
 * Handles OTP email sending via Firebase Cloud Functions
 */

import { getFunctions, httpsCallable } from 'firebase/functions';
import app from './firebase'; // Adjust this import based on your Firebase setup

const functions = getFunctions(app);

/**
 * Send CRM Login OTP Email
 * @param email - Admin email address
 * @param otp - 6-digit OTP code
 * @returns Promise with success status
 */
export const sendCrmLoginOTP = async (email: string, otp: string) => {
  try {
    const sendOTPFunction = httpsCallable(functions, 'sendCrmLoginOTP');
    
    const result = await sendOTPFunction({
      email,
      otp
    });

    return {
      success: true,
      data: result.data
    };
  } catch (error: any) {
    console.error('Error sending CRM login OTP:', error);
    
    return {
      success: false,
      error: error.message || 'Failed to send OTP email'
    };
  }
};

/**
 * Generate a 6-digit OTP
 * @returns 6-digit OTP string
 */
export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Example usage:
 * 
 * import { sendCrmLoginOTP, generateOTP } from '@/services/emailService';
 * 
 * const handleSendOTP = async () => {
 *   const email = 'admin@example.com';
 *   const otp = generateOTP();
 *   
 *   // Store OTP in Firestore with expiry time
 *   await db.collection('otpCodes').doc(email).set({
 *     otp: otp,
 *     expiresAt: Date.now() + (10 * 60 * 1000), // 10 minutes
 *     createdAt: Date.now()
 *   });
 *   
 *   // Send email
 *   const result = await sendCrmLoginOTP(email, otp);
 *   
 *   if (result.success) {
 *     alert('OTP sent to your email!');
 *   } else {
 *     alert('Failed to send OTP: ' + result.error);
 *   }
 * };
 */
