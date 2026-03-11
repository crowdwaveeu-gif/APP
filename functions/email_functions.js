// Updated: Logo implementation fixed
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

/**
 * Email branding - using text-only header (no logo images)
 */



/**
 * Email Configuration
 * Using Zoho SMTP settings from Firebase config
 */
const getEmailTransporter = () => {
  const emailConfig = {
    host: 'smtp.zoho.eu',
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.SMTP_USER || functions.config().smtp?.user || 'nauman@crowdwave.eu',
      pass: process.env.SMTP_PASSWORD || functions.config().smtp?.password,
    },
  };

  return nodemailer.createTransport(emailConfig);
};

/**
 * Email Templates
 */
const emailTemplates = {
  verification: (displayName, verificationLink) => ({
    subject: 'Verify your email for CrowdWave',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify your email</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f5f5f5;
          }
          .email-container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          .email-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 30px;
            text-align: center;
          }
          .email-logo {
            color: #ffffff;
            font-size: 32px;
            font-weight: bold;
            margin: 0;
          }
          .email-body {
            padding: 40px 30px;
          }
          .email-title {
            font-size: 24px;
            font-weight: 600;
            color: #333333;
            margin: 0 0 20px 0;
          }
          .email-text {
            font-size: 16px;
            line-height: 24px;
            color: #666666;
            margin: 0 0 30px 0;
          }
          .email-button {
            display: inline-block;
            padding: 16px 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #ffffff;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            font-size: 16px;
            margin: 10px 0;
            transition: transform 0.2s;
          }
          .email-button:hover {
            transform: translateY(-2px);
          }
          .email-link {
            word-break: break-all;
            color: #667eea;
            font-size: 14px;
            margin-top: 20px;
            display: block;
          }
          .email-footer {
            background-color: #f9f9f9;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #eeeeee;
          }
          .footer-text {
            font-size: 14px;
            color: #999999;
            margin: 5px 0;
          }
          .warning-box {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
          }
          .warning-text {
            font-size: 14px;
            color: #856404;
            margin: 0;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <h1 class="email-logo">CrowdWave</h1>
            <p class="email-tagline">Crowd-Powered Package Delivery</p>
          </div>
          
          <div class="email-body">
            <h2 class="email-title">Hello ${displayName || 'there'}! 👋</h2>
            
            <p class="email-text">
              Welcome to CrowdWave! We're excited to have you on board. 
              To get started, please verify your email address by clicking the button below:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationLink}" class="email-button">
                ✅ Verify Email Address
              </a>
            </div>
            
            <p class="email-text" style="font-size: 14px;">
              Or copy and paste this link into your browser:
            </p>
            <a href="${verificationLink}" class="email-link">${verificationLink}</a>
            
            <div class="warning-box">
              <p class="warning-text">
                ⚠️ <strong>Security Notice:</strong><br>
                • This link expires in 1 hour for your protection<br>
                • If you didn't create a CrowdWave account, please ignore this email<br>
                • Never share this link with anyone
              </p>
            </div>
          </div>
          
          <div class="email-footer">
            <p class="footer-text">
              Questions? Contact us at 
              <a href="mailto:support@crowdwave.eu" style="color: #667eea;">support@crowdwave.eu</a>
            </p>
            <p class="footer-text">
              © ${new Date().getFullYear()} CrowdWave. All rights reserved.
            </p>
            <p class="footer-text" style="font-size: 12px;">
              CrowdWave - Connecting couriers with packages worldwide
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Hello ${displayName || 'there'}!

Welcome to CrowdWave! Please verify your email address by visiting this link:

${verificationLink}

Security Notice:
- This link expires in 1 hour for your protection
- If you didn't create a CrowdWave account, please ignore this email
- Never share this link with anyone

Questions? Email us at support@crowdwave.eu

© ${new Date().getFullYear()} CrowdWave. All rights reserved.
    `.trim(),
  }),

  passwordReset: (displayName, resetLink) => ({
    subject: 'Reset your CrowdWave password',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset your password</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f5f5f5;
          }
          .email-container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          .email-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 30px;
            text-align: center;
          }
          .email-logo {
            color: #ffffff;
            font-size: 32px;
            font-weight: bold;
            margin: 0;
          }
          .email-body {
            padding: 40px 30px;
          }
          .email-title {
            font-size: 24px;
            font-weight: 600;
            color: #333333;
            margin: 0 0 20px 0;
          }
          .email-text {
            font-size: 16px;
            line-height: 24px;
            color: #666666;
            margin: 0 0 30px 0;
          }
          .email-button {
            display: inline-block;
            padding: 16px 40px;
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
            color: #ffffff;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            font-size: 16px;
            margin: 10px 0;
            transition: transform 0.2s;
          }
          .email-button:hover {
            transform: translateY(-2px);
          }
          .email-link {
            word-break: break-all;
            color: #667eea;
            font-size: 14px;
            margin-top: 20px;
            display: block;
          }
          .email-footer {
            background-color: #f9f9f9;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #eeeeee;
          }
          .footer-text {
            font-size: 14px;
            color: #999999;
            margin: 5px 0;
          }
          .warning-box {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
          }
          .warning-text {
            font-size: 14px;
            color: #856404;
            margin: 0;
          }
          .info-box {
            background-color: #e3f2fd;
            border-left: 4px solid #2196F3;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
          }
          .info-text {
            font-size: 14px;
            color: #1565c0;
            margin: 0;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <h1 class="email-logo">CrowdWave</h1>
            <p class="email-tagline">Crowd-Powered Package Delivery</p>
          </div>
          
          <div class="email-body">
            <h2 class="email-title">Hi there! 🔐</h2>
            
            <p class="email-text">
              Someone requested a password reset for your CrowdWave account.
            </p>
            
            <p class="email-text">
              If this was you, click the button below to create a new password:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" class="email-button">
                🔑 Reset Your Password
              </a>
            </div>
            
            <p class="email-text" style="font-size: 14px;">
              Or copy and paste this link into your browser:
            </p>
            <a href="${resetLink}" class="email-link">${resetLink}</a>
            
            <div class="warning-box">
              <p class="warning-text">
                ⚠️ <strong>Security Notice:</strong><br>
                • This link expires in 1 hour for your protection<br>
                • If you didn't request this reset, please ignore this email<br>
                • Your current password remains unchanged until you create a new one
              </p>
            </div>
            
            <div class="info-box">
              <p class="info-text">
                💡 <strong>For a strong password, include:</strong><br>
                • At least 8 characters<br>
                • Upper and lowercase letters<br>
                • Numbers and symbols
              </p>
            </div>
          </div>
          
          <div class="email-footer">
            <p class="footer-text">
              Questions? Email us at 
              <a href="mailto:security@crowdwave.eu" style="color: #667eea;">security@crowdwave.eu</a>
            </p>
            <p class="footer-text">
              © ${new Date().getFullYear()} CrowdWave. All rights reserved.
            </p>
            <p class="footer-text" style="font-size: 12px;">
              CrowdWave Security Team
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Hi there!

Someone requested a password reset for your CrowdWave account.

If this was you, click the link below to create a new password:

${resetLink}

Security Notice:
- This link expires in 1 hour for your protection
- If you didn't request this reset, please ignore this email
- Your current password remains unchanged until you create a new one

For a strong password, include:
• At least 8 characters
• Upper and lowercase letters
• Numbers and symbols

Questions? Email us at security@crowdwave.eu

© ${new Date().getFullYear()} CrowdWave Security Team
    `.trim(),
  }),

  deliveryUpdate: (packageDetails, status, trackingUrl) => ({
    subject: `📦 Package Update: ${status}`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Delivery Update</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f5f5f5;
          }
          .email-container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          .email-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 30px;
            text-align: center;
          }
          .email-logo {
            color: #ffffff;
            font-size: 32px;
            font-weight: bold;
            margin: 0;
          }
          .email-body {
            padding: 40px 30px;
          }
          .status-badge {
            display: inline-block;
            padding: 8px 20px;
            background-color: #4caf50;
            color: white;
            border-radius: 20px;
            font-weight: 600;
            font-size: 14px;
            margin: 10px 0 20px 0;
          }
          .package-details {
            background-color: #f9f9f9;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
          }
          .detail-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #eeeeee;
          }
          .detail-label {
            font-weight: 600;
            color: #666666;
          }
          .detail-value {
            color: #333333;
          }
          .email-button {
            display: inline-block;
            padding: 16px 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #ffffff;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            font-size: 16px;
            margin: 20px 0;
            transition: transform 0.2s;
          }
          .email-footer {
            background-color: #f9f9f9;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #eeeeee;
          }
          .footer-text {
            font-size: 14px;
            color: #999999;
            margin: 5px 0;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <h1 class="email-logo">CrowdWave</h1>
            <p class="email-tagline">Crowd-Powered Package Delivery</p>
          </div>
          
          <div class="email-body">
            <h2>📦 Your Package Has Been Updated!</h2>
            <div class="status-badge">${status}</div>
            
            <div class="package-details">
              ${packageDetails.trackingNumber ? `
                <div class="detail-row">
                  <span class="detail-label">Tracking Number:</span>
                  <span class="detail-value">${packageDetails.trackingNumber}</span>
                </div>
              ` : ''}
              ${packageDetails.from ? `
                <div class="detail-row">
                  <span class="detail-label">From:</span>
                  <span class="detail-value">${packageDetails.from}</span>
                </div>
              ` : ''}
              ${packageDetails.to ? `
                <div class="detail-row">
                  <span class="detail-label">To:</span>
                  <span class="detail-value">${packageDetails.to}</span>
                </div>
              ` : ''}
              ${packageDetails.estimatedDelivery ? `
                <div class="detail-row">
                  <span class="detail-label">Estimated Delivery:</span>
                  <span class="detail-value">${packageDetails.estimatedDelivery}</span>
                </div>
              ` : ''}
            </div>
            
            ${trackingUrl ? `
              <div style="text-align: center;">
                <a href="${trackingUrl}" class="email-button">
                  🔍 Track Your Package
                </a>
              </div>
            ` : ''}
          </div>
          
          <div class="email-footer">
            <p class="footer-text">
              Questions? Contact us at 
              <a href="mailto:support@crowdwave.eu" style="color: #667eea;">support@crowdwave.eu</a>
            </p>
            <p class="footer-text">
              © ${new Date().getFullYear()} CrowdWave. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
📦 Your Package Has Been Updated!

Status: ${status}

Package Details:
${packageDetails.trackingNumber ? `Tracking Number: ${packageDetails.trackingNumber}\n` : ''}
${packageDetails.from ? `From: ${packageDetails.from}\n` : ''}
${packageDetails.to ? `To: ${packageDetails.to}\n` : ''}
${packageDetails.estimatedDelivery ? `Estimated Delivery: ${packageDetails.estimatedDelivery}\n` : ''}

${trackingUrl ? `Track your package: ${trackingUrl}\n` : ''}

Questions? Email us at support@crowdwave.eu

© ${new Date().getFullYear()} CrowdWave. All rights reserved.
    `.trim(),
  }),

  // Delivery OTP Email Template - OTP sent to receiver for delivery verification
  deliveryOTP: (packageDetails, otpCode) => ({
    subject: `🔐 Your Delivery Verification Code: ${otpCode}`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Delivery Verification Code</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f5f5f5;
          }
          .email-container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          .email-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 30px;
            text-align: center;
          }
          .email-header img {
            height: 50px;
            margin-bottom: 10px;
          }
          .email-logo {
            color: #ffffff;
            font-size: 32px;
            font-weight: bold;
            margin: 0;
          }
          .email-tagline {
            color: rgba(255,255,255,0.9);
            font-size: 14px;
            margin-top: 8px;
          }
          .email-body {
            padding: 40px 30px;
          }
          .email-title {
            font-size: 24px;
            font-weight: 600;
            color: #333333;
            margin: 0 0 20px 0;
          }
          .email-text {
            font-size: 16px;
            line-height: 24px;
            color: #666666;
            margin: 0 0 30px 0;
          }
          .otp-container {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 12px;
            padding: 30px;
            text-align: center;
            margin: 30px 0;
          }
          .otp-label {
            color: rgba(255,255,255,0.9);
            font-size: 14px;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 2px;
          }
          .otp-code {
            font-size: 48px;
            font-weight: bold;
            color: #ffffff;
            letter-spacing: 8px;
            margin: 0;
          }
          .otp-expiry {
            color: rgba(255,255,255,0.8);
            font-size: 12px;
            margin-top: 15px;
          }
          .package-details {
            background-color: #f9f9f9;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
          }
          .detail-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #eeeeee;
          }
          .detail-row:last-child {
            border-bottom: none;
          }
          .detail-label {
            font-weight: 600;
            color: #666666;
          }
          .detail-value {
            color: #333333;
          }
          .warning-box {
            background-color: #fff3cd;
            border: 1px solid #ffc107;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
          }
          .warning-text {
            color: #856404;
            font-size: 14px;
            margin: 0;
          }
          .email-footer {
            background-color: #f9f9f9;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #eeeeee;
          }
          .footer-text {
            font-size: 14px;
            color: #999999;
            margin: 5px 0;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <img src="https://firebasestorage.googleapis.com/v0/b/crowdwave-85e10.firebasestorage.app/o/email_assets%2Fcrowdwave_logo.png?alt=media" alt="CrowdWave" style="height: 50px;">
            <h1 class="email-logo">CrowdWave</h1>
            <p class="email-tagline">Crowd-Powered Package Delivery</p>
          </div>
          
          <div class="email-body">
            <h2 class="email-title">🔐 Delivery Verification Code</h2>
            <p class="email-text">
              Your package is ready for delivery! Please share the following verification code with the traveler to confirm receipt of your package.
            </p>
            
            <div class="otp-container">
              <p class="otp-label">Your Verification Code</p>
              <p class="otp-code">${otpCode}</p>
              <p class="otp-expiry">⏱️ This code expires in 30 minutes</p>
            </div>
            
            <div class="package-details">
              <h3 style="margin: 0 0 15px 0; color: #333;">Package Details</h3>
              ${packageDetails.trackingNumber ? `
                <div class="detail-row">
                  <span class="detail-label">Tracking Number:</span>
                  <span class="detail-value">${packageDetails.trackingNumber}</span>
                </div>
              ` : ''}
              ${packageDetails.description ? `
                <div class="detail-row">
                  <span class="detail-label">Description:</span>
                  <span class="detail-value">${packageDetails.description}</span>
                </div>
              ` : ''}
            </div>
            
            <div class="warning-box">
              <p class="warning-text">
                ⚠️ <strong>Security Notice:</strong> Only share this code when you have received your package and verified its contents. Never share this code before receiving your package.
              </p>
            </div>
          </div>
          
          <div class="email-footer">
            <p class="footer-text">
              Questions? Contact us at 
              <a href="mailto:support@crowdwave.eu" style="color: #667eea;">support@crowdwave.eu</a>
            </p>
            <p class="footer-text">
              © ${new Date().getFullYear()} CrowdWave. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
🔐 Delivery Verification Code

Your package is ready for delivery!

YOUR VERIFICATION CODE: ${otpCode}

⏱️ This code expires in 30 minutes.

Package Details:
${packageDetails.trackingNumber ? `Tracking Number: ${packageDetails.trackingNumber}\n` : ''}
${packageDetails.description ? `Description: ${packageDetails.description}\n` : ''}

⚠️ IMPORTANT: Only share this code when you have received your package and verified its contents. Never share this code before receiving your package.

Questions? Email us at support@crowdwave.eu

© ${new Date().getFullYear()} CrowdWave. All rights reserved.
    `.trim(),
  }),
};

/**
 * Send Email Verification
 * DISABLED: This Firebase Auth trigger was sending duplicate emails.
 * We now use the OTP-based email verification system (sendOTPEmail function).
 * Keeping this commented for reference but disabled to prevent duplicate emails.
 */
// exports.sendEmailVerification = functions.auth.user().onCreate(async (user) => {
//   // Only send verification email for email/password sign-ups
//   const providerData = user.providerData || [];
//   const isEmailPasswordSignup = providerData.some(
//     provider => provider.providerId === 'password'
//   );

//   if (!isEmailPasswordSignup || user.emailVerified) {
//     functions.logger.info('Skipping email verification', {
//       uid: user.uid,
//       emailVerified: user.emailVerified,
//       providers: providerData.map(p => p.providerId),
//     });
//     return null;
//   }

//   try {
//     // Generate email verification link
//     const link = await admin.auth().generateEmailVerificationLink(user.email, {
//       url: 'https://crowdwave.eu/__/auth/action',
//       handleCodeInApp: false,
//     });

//     const transporter = getEmailTransporter();
//     const template = emailTemplates.verification(user.displayName, link);

//     await transporter.sendMail({
//       from: '"CrowdWave Support" <nauman@crowdwave.eu>',
//       to: user.email,
//       replyTo: 'nauman@crowdwave.eu',
//       subject: template.subject,
//       text: template.text,
//       html: template.html,
//     });

//     functions.logger.info('Email verification sent successfully', {
//       uid: user.uid,
//       email: user.email,
//     });

//     return { success: true };
//   } catch (error) {
//     functions.logger.error('Failed to send email verification', {
//       uid: user.uid,
//       email: user.email,
//       error: error.message,
//     });
//     throw error;
//   }
// });

/**
 * Send Password Reset Email
 * Custom function to send password reset emails with better formatting
 */
exports.sendPasswordResetEmail = functions.https.onCall(async (data, context) => {
  const { email } = data;

  if (!email) {
    throw new functions.https.HttpsError('invalid-argument', 'Email is required');
  }

  try {
    // Check if user exists
    let userRecord;
    try {
      userRecord = await admin.auth().getUserByEmail(email);
    } catch (error) {
      // Don't reveal if user exists or not for security
      throw new functions.https.HttpsError('not-found', 'If an account exists with this email, a password reset link has been sent.');
    }

    // Generate password reset link
    const link = await admin.auth().generatePasswordResetLink(email, {
      url: 'https://crowdwave.eu/__/auth/action',
      handleCodeInApp: false,
    });

    const transporter = getEmailTransporter();
    const template = emailTemplates.passwordReset(userRecord.displayName, link);

    await transporter.sendMail({
      from: '"CrowdWave Security" <nauman@crowdwave.eu>',
      to: email,
      replyTo: 'security@crowdwave.eu',
      subject: template.subject,
      text: template.text,
      html: template.html,
    });

    functions.logger.info('Password reset email sent successfully', {
      email: email,
    });

    return { 
      success: true,
      message: 'If an account exists with this email, a password reset link has been sent.',
    };
  } catch (error) {
    functions.logger.error('Failed to send password reset email', {
      email: email,
      error: error.message,
    });
    
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    
    throw new functions.https.HttpsError('internal', 'Failed to send password reset email');
  }
});

/**
 * Send Delivery Update Email
 * Called when package status changes
 */
exports.sendDeliveryUpdateEmail = functions.https.onCall(async (data, context) => {
  // Require authentication
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Must be authenticated');
  }

  const { recipientEmail, packageDetails, status, trackingUrl } = data;

  if (!recipientEmail || !packageDetails || !status) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing required fields');
  }

  try {
    const transporter = getEmailTransporter();
    const template = emailTemplates.deliveryUpdate(packageDetails, status, trackingUrl);

    await transporter.sendMail({
      from: '"CrowdWave Deliveries" <nauman@crowdwave.eu>',
      to: recipientEmail,
      replyTo: 'support@crowdwave.eu',
      subject: template.subject,
      text: template.text,
      html: template.html,
    });

    functions.logger.info('Delivery update email sent successfully', {
      recipientEmail: recipientEmail,
      status: status,
      trackingNumber: packageDetails.trackingNumber,
    });

    return { success: true };
  } catch (error) {
    functions.logger.error('Failed to send delivery update email', {
      recipientEmail: recipientEmail,
      error: error.message,
    });
    throw new functions.https.HttpsError('internal', 'Failed to send delivery update email');
  }
});

/**
 * Send Delivery OTP Email
 * Called when traveler generates OTP for delivery verification
 * OTP is sent to the receiver (sender) so they can verify the delivery
 */
exports.sendDeliveryOTPEmail = functions.https.onCall(async (data, context) => {
  // Require authentication
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Must be authenticated');
  }

  const { recipientEmail, packageDetails, otpCode } = data;

  if (!recipientEmail || !packageDetails || !otpCode) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing required fields: recipientEmail, packageDetails, and otpCode are required');
  }

  try {
    const transporter = getEmailTransporter();
    const template = emailTemplates.deliveryOTP(packageDetails, otpCode);

    await transporter.sendMail({
      from: '"CrowdWave Deliveries" <nauman@crowdwave.eu>',
      to: recipientEmail,
      replyTo: 'support@crowdwave.eu',
      subject: template.subject,
      text: template.text,
      html: template.html,
    });

    functions.logger.info('Delivery OTP email sent successfully', {
      recipientEmail: recipientEmail,
      trackingNumber: packageDetails.trackingNumber,
      // Don't log OTP for security
    });

    return { success: true };
  } catch (error) {
    functions.logger.error('Failed to send delivery OTP email', {
      recipientEmail: recipientEmail,
      error: error.message,
    });
    throw new functions.https.HttpsError('internal', 'Failed to send delivery OTP email');
  }
});

/**
 * Test Email Configuration
 * Utility function to test email setup
 */
exports.testEmailConfig = functions.https.onCall(async (data, context) => {
  // Require authentication for security
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Must be authenticated');
  }

  try {
    const transporter = getEmailTransporter();
    
    // Verify transporter configuration
    await transporter.verify();

    functions.logger.info('Email configuration test successful');

    return {
      success: true,
      message: 'Email configuration is valid',
      config: {
        host: 'smtp.zoho.eu',
        port: 465,
        secure: true,
        user: transporter.options.auth.user,
      },
    };
  } catch (error) {
    functions.logger.error('Email configuration test failed', {
      error: error.message,
    });
    
    throw new functions.https.HttpsError('internal', `Email configuration test failed: ${error.message}`);
  }
});

/**
 * Send CRM Login OTP Email
 * Sends OTP for CRM login or password reset
 */
exports.sendCrmLoginOTP = functions.https.onCall(async (data, context) => {
  const { email, otp, purpose } = data;

  if (!email || !otp) {
    throw new functions.https.HttpsError('invalid-argument', 'Email and OTP are required');
  }

  try {
    const transporter = getEmailTransporter();

    const isPasswordReset = purpose === 'password-reset';
    const subject = isPasswordReset ? 'Your Password Reset Code' : 'Your CRM Login Code';
    const title = isPasswordReset ? 'Password Reset Request' : 'CRM Login Code';
    const message = isPasswordReset 
      ? 'We received a request to reset your password.'
      : 'You have requested to login to CrowdWave CRM.';

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f5f5f5;
          }
          .email-container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          .email-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 30px;
            text-align: center;
          }
          .email-logo {
            color: #ffffff;
            font-size: 32px;
            font-weight: bold;
            margin: 0;
            letter-spacing: 2px;
          }
          .email-body {
            padding: 40px 30px;
          }
          .email-title {
            font-size: 24px;
            font-weight: 600;
            color: #333333;
            margin: 0 0 20px 0;
          }
          .email-text {
            font-size: 16px;
            line-height: 24px;
            color: #666666;
            margin: 0 0 30px 0;
          }
          .otp-container {
            background-color: #f8f9fa;
            border: 2px dashed #667eea;
            border-radius: 8px;
            padding: 30px;
            text-align: center;
            margin: 30px 0;
          }
          .otp-code {
            font-size: 48px;
            font-weight: bold;
            color: #667eea;
            letter-spacing: 8px;
            margin: 0;
            font-family: 'Courier New', monospace;
          }
          .otp-label {
            font-size: 14px;
            color: #999999;
            margin-top: 10px;
          }
          .warning-box {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
          }
          .warning-text {
            font-size: 14px;
            color: #856404;
            margin: 0;
          }
          .email-footer {
            background-color: #f9f9f9;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #eeeeee;
          }
          .footer-text {
            font-size: 14px;
            color: #999999;
            margin: 5px 0;
          }
        </style>
      </head>
      <body>
      <div class="email-container">
        <div class="email-header">
          <h1 class="email-logo">CrowdWave</h1>
        </div>
        
        <div class="email-body">
          <h2 class="email-title">${title}</h2>            <p class="email-text">${message}</p>
            
            <div class="otp-container">
              <p class="otp-code">${otp}</p>
              <p class="otp-label">Your 6-digit code</p>
            </div>
            
            <p class="email-text" style="text-align: center; font-weight: 600;">
              Enter this code to continue.
            </p>
            
            <div class="warning-box">
              <p class="warning-text">
                ⚠️ <strong>Security Notice:</strong><br>
                • This code expires in 10 minutes<br>
                • If you didn't request this code, please ignore this email<br>
                • Never share this code with anyone
              </p>
            </div>
          </div>
          
          <div class="email-footer">
            <p class="footer-text">
              Questions? Contact us at 
              <a href="mailto:support@crowdwave.eu" style="color: #667eea;">support@crowdwave.eu</a>
            </p>
            <p class="footer-text">
              © ${new Date().getFullYear()} CrowdWave. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
${title}

${message}

Your code is: ${otp}

Enter this code to continue.

Security Notice:
- This code expires in 10 minutes
- If you didn't request this code, please ignore this email
- Never share this code with anyone

Questions? Email us at support@crowdwave.eu

© ${new Date().getFullYear()} CrowdWave. All rights reserved.
    `.trim();

    const mailOptions = {
      from: '"CrowdWave CRM" <nauman@crowdwave.eu>',
      to: email,
      subject: subject,
      text: text,
      html: html,
    };

    await transporter.sendMail(mailOptions);

    functions.logger.info('CRM OTP email sent successfully', { email, purpose });

    return { success: true, message: 'OTP email sent successfully' };

  } catch (error) {
    functions.logger.error('Failed to send CRM OTP email', {
      error: error.message,
      email,
    });
    
    throw new functions.https.HttpsError('internal', `Failed to send CRM OTP email: ${error.message}`);
  }
});

/**
 * Send OTP Email for Email Verification
 * Sends a 6-digit OTP code to verify email
 */
exports.sendOTPEmail = functions.https.onCall(async (data, context) => {
  // Require authentication
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const { email, otp, type } = data;

  if (!email || !otp) {
    throw new functions.https.HttpsError('invalid-argument', 'Email and OTP are required');
  }

  try {
    const transporter = getEmailTransporter();

    let subject, html, text;

    if (type === 'email_verification') {
      subject = 'Verify your email for CrowdWave';
      html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify your email</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              background-color: #f5f5f5;
            }
            .email-container {
              max-width: 600px;
              margin: 40px auto;
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            .email-header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              padding: 40px 30px;
              text-align: center;
            }
            .email-logo {
              color: #ffffff;
              font-size: 36px;
              font-weight: bold;
              margin: 0;
              letter-spacing: 1px;
            }
            .email-tagline {
              color: rgba(255, 255, 255, 0.9);
              font-size: 14px;
              margin-top: 8px;
            }
            .email-body {
              padding: 40px 30px;
            }
            .email-title {
              font-size: 24px;
              font-weight: 600;
              color: #333333;
              margin: 0 0 20px 0;
            }
            .email-text {
              font-size: 16px;
              line-height: 24px;
              color: #666666;
              margin: 0 0 30px 0;
            }
            .otp-container {
              background-color: #f8f9fa;
              border: 2px dashed #667eea;
              border-radius: 8px;
              padding: 30px;
              text-align: center;
              margin: 30px 0;
            }
            .otp-code {
              font-size: 48px;
              font-weight: bold;
              color: #667eea;
              letter-spacing: 8px;
              margin: 0;
            }
            .otp-label {
              font-size: 14px;
              color: #999999;
              margin-top: 10px;
            }
            .warning-box {
              background-color: #fff3cd;
              border-left: 4px solid #ffc107;
              padding: 20px;
              border-radius: 4px;
              margin: 20px 0;
            }
            .warning-text {
              font-size: 14px;
              color: #856404;
              margin: 0;
              line-height: 1.6;
            }
            .email-footer {
              background-color: #f9f9f9;
              padding: 30px;
              text-align: center;
              border-top: 1px solid #eeeeee;
            }
            .footer-text {
              font-size: 14px;
              color: #999999;
              margin: 5px 0;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              <h1 class="email-logo">CrowdWave</h1>
              <p class="email-tagline">Crowd-Powered Package Delivery</p>
            </div>
            
            <div class="email-body">
              <h2 class="email-title">Welcome to CrowdWave! 🎉</h2>
              
              <p class="email-text">
                Thank you for joining our community! To complete your registration and verify your email address, please use this verification code:
              </p>
              
              <div class="otp-container">
                <p class="otp-code">${otp}</p>
                <p class="otp-label">Your 6-digit verification code</p>
              </div>
              
              <p class="email-text" style="text-align: center; font-weight: 600;">
                Enter this code in the app to verify your email address.
              </p>
              
              <div class="warning-box">
                <p class="warning-text">
                  ⚠️ <strong>Security Notice:</strong><br>
                  • This code expires in 10 minutes<br>
                  • If you didn't create a CrowdWave account, please ignore this email<br>
                  • Never share this code with anyone
                </p>
              </div>
            </div>
            
            <div class="email-footer">
              <p class="footer-text">
                Questions? Contact us at 
                <a href="mailto:support@crowdwave.eu" style="color: #667eea;">support@crowdwave.eu</a>
              </p>
              <p class="footer-text">
                © ${new Date().getFullYear()} CrowdWave. All rights reserved.
              </p>
            </div>
          </div>
        </body>
        </html>
      `;

      text = `
Welcome to CrowdWave! 🎉

Thank you for joining our community! Your email verification code is: ${otp}

Enter this code in the app to verify your email address.

Security Notice:
- This code expires in 10 minutes
- If you didn't create a CrowdWave account, please ignore this email
- Never share this code with anyone

Questions? Email us at support@crowdwave.eu

© ${new Date().getFullYear()} CrowdWave. All rights reserved.
      `.trim();

    } else if (type === 'password_reset') {
      subject = 'Reset your CrowdWave password';
      html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset your password</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              background-color: #f5f5f5;
            }
            .email-container {
              max-width: 600px;
              margin: 40px auto;
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            .email-header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              padding: 40px 30px;
              text-align: center;
            }
            .email-logo {
              color: #ffffff;
              font-size: 36px;
              font-weight: bold;
              margin: 0;
              letter-spacing: 1px;
            }
            .email-tagline {
              color: rgba(255, 255, 255, 0.9);
              font-size: 14px;
              margin-top: 8px;
            }
            .email-body {
              padding: 40px 30px;
            }
            .email-title {
              font-size: 24px;
              font-weight: 600;
              color: #333333;
              margin: 0 0 20px 0;
            }
            .email-text {
              font-size: 16px;
              line-height: 24px;
              color: #666666;
              margin: 0 0 30px 0;
            }
            .otp-container {
              background-color: #f8f9fa;
              border: 2px dashed #667eea;
              border-radius: 8px;
              padding: 30px;
              text-align: center;
              margin: 30px 0;
            }
            .otp-code {
              font-size: 48px;
              font-weight: bold;
              color: #667eea;
              letter-spacing: 8px;
              margin: 0;
              font-family: 'Courier New', monospace;
            }
            .otp-label {
              font-size: 14px;
              color: #999999;
              margin-top: 10px;
            }
            .warning-box {
              background-color: #fff3cd;
              border-left: 4px solid #ffc107;
              padding: 15px;
              margin: 20px 0;
              border-radius: 4px;
            }
            .warning-text {
              font-size: 14px;
              color: #856404;
              margin: 0;
            }
            .email-footer {
              background-color: #f9f9f9;
              padding: 30px;
              text-align: center;
              border-top: 1px solid #eeeeee;
            }
            .footer-text {
              font-size: 14px;
              color: #999999;
              margin: 5px 0;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              <h1 class="email-logo">CrowdWave</h1>
              <p class="email-tagline">Crowd-Powered Package Delivery</p>
            </div>
            
            <div class="email-body">
              <h2 class="email-title">Password Reset Request</h2>
              
              <p class="email-text">
                We received a request to reset your password. Use this code to reset your password:
              </p>
              
              <div class="otp-container">
                <p class="otp-code">${otp}</p>
                <p class="otp-label">Your 6-digit reset code</p>
              </div>
              
              <p class="email-text" style="text-align: center; font-weight: 600;">
                Enter this code in the app to reset your password.
              </p>
              
              <div class="warning-box">
                <p class="warning-text">
                  ⚠️ <strong>Security Notice:</strong><br>
                  • This code expires in 10 minutes<br>
                  • If you didn't request a password reset, please ignore this email<br>
                  • Never share this code with anyone
                </p>
              </div>
            </div>
            
            <div class="email-footer">
              <p class="footer-text">
                Questions? Contact us at 
                <a href="mailto:support@crowdwave.eu" style="color: #667eea;">support@crowdwave.eu</a>
              </p>
              <p class="footer-text">
                © ${new Date().getFullYear()} CrowdWave. All rights reserved.
              </p>
            </div>
          </div>
        </body>
        </html>
      `;

      text = `
Password Reset Request

Your password reset code is: ${otp}

Enter this code in the app to reset your password.

Security Notice:
- This code expires in 10 minutes
- If you didn't request a password reset, please ignore this email
- Never share this code with anyone

Questions? Email us at support@crowdwave.eu

© ${new Date().getFullYear()} CrowdWave. All rights reserved.
      `.trim();
    }

    const mailOptions = {
      from: '"CrowdWave" <nauman@crowdwave.eu>',
      to: email,
      subject: subject,
      text: text,
      html: html,
    };

    await transporter.sendMail(mailOptions);

    functions.logger.info('OTP email sent successfully', {
      email,
      type,
    });

    return { success: true, message: 'OTP email sent successfully' };

  } catch (error) {
    functions.logger.error('Failed to send OTP email', {
      error: error.message,
      email,
      type,
    });
    
    throw new functions.https.HttpsError('internal', `Failed to send OTP email: ${error.message}`);
  }
});

/**
 * Verify Password Reset OTP and Update Password
 * Verifies the OTP code and updates the user's password
 */
exports.verifyPasswordResetOTP = functions.https.onCall(async (data, context) => {
  const { email, otp, newPassword } = data;

  if (!email || !otp || !newPassword) {
    throw new functions.https.HttpsError('invalid-argument', 'Email, OTP, and new password are required');
  }

  try {
    // Get OTP document from Firestore
    const otpDoc = await admin.firestore().collection('otp_codes').doc(email).get();
    
    if (!otpDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'No verification code found. Please request a new one.');
    }

    const otpData = otpDoc.data();
    const storedOTP = otpData.otp;
    const expiresAt = otpData.expiresAt.toDate();
    const used = otpData.used;
    const type = otpData.type;

    // Validate OTP
    if (type !== 'password_reset') {
      throw new functions.https.HttpsError('invalid-argument', 'Invalid code type');
    }

    if (used) {
      throw new functions.https.HttpsError('failed-precondition', 'This code has already been used. Please request a new one.');
    }

    if (new Date() > expiresAt) {
      throw new functions.https.HttpsError('deadline-exceeded', 'Verification code has expired. Please request a new one.');
    }

    if (storedOTP !== otp) {
      throw new functions.https.HttpsError('invalid-argument', 'Invalid verification code. Please check and try again.');
    }

    // Get user by email
    const userRecord = await admin.auth().getUserByEmail(email);

    // Update password using Admin SDK
    await admin.auth().updateUser(userRecord.uid, {
      password: newPassword,
    });

    // Mark OTP as used
    await admin.firestore().collection('otp_codes').doc(email).update({
      used: true,
    });

    functions.logger.info('Password reset successfully', {
      email: email,
      uid: userRecord.uid,
    });

    return { 
      success: true, 
      message: 'Your password has been reset successfully.',
    };

  } catch (error) {
    functions.logger.error('Failed to reset password', {
      error: error.message,
      email,
    });
    
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }

    if (error.code === 'auth/user-not-found') {
      throw new functions.https.HttpsError('not-found', 'No account found with this email');
    }
    
    throw new functions.https.HttpsError('internal', `Failed to reset password: ${error.message}`);
  }
});

/**
 * Send Password Reset OTP Email (No Authentication Required)
 * Generates and sends a 6-digit OTP code for password reset
 * This function does NOT require authentication since users need to reset password when logged out
 */
exports.sendPasswordResetOTP = functions.https.onCall(async (data, context) => {
  const { email } = data;

  if (!email) {
    throw new functions.https.HttpsError('invalid-argument', 'Email is required');
  }

  try {
    // Check if user exists
    let userRecord;
    try {
      userRecord = await admin.auth().getUserByEmail(email);
    } catch (error) {
      // Don't reveal if user exists or not for security
      functions.logger.info('Password reset OTP requested for non-existent email', { email });
      return { 
        success: true,
        message: 'If an account exists with this email, a password reset code has been sent.',
      };
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store OTP in Firestore
    await admin.firestore().collection('otp_codes').doc(email).set({
      otp: otp,
      email: email,
      type: 'password_reset',
      expiresAt: admin.firestore.Timestamp.fromDate(expiresAt),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      used: false,
    });

    const transporter = getEmailTransporter();

    const subject = 'Reset your CrowdWave password';
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset your password</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f5f5f5;
          }
          .email-container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          .email-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 30px;
            text-align: center;
          }
          .email-logo {
            color: #ffffff;
            font-size: 36px;
            font-weight: bold;
            margin: 0;
            letter-spacing: 1px;
          }
          .email-tagline {
            color: rgba(255, 255, 255, 0.9);
            font-size: 14px;
            margin-top: 8px;
          }
          .email-body {
            padding: 40px 30px;
          }
          .email-title {
            font-size: 24px;
            font-weight: 600;
            color: #333333;
            margin: 0 0 20px 0;
          }
          .email-text {
            font-size: 16px;
            line-height: 24px;
            color: #666666;
            margin: 0 0 30px 0;
          }
          .otp-container {
            background-color: #f8f9fa;
            border: 2px dashed #667eea;
            border-radius: 8px;
            padding: 30px;
            text-align: center;
            margin: 30px 0;
          }
          .otp-code {
            font-size: 48px;
            font-weight: bold;
            color: #667eea;
            letter-spacing: 8px;
            margin: 0;
          }
          .otp-label {
            font-size: 14px;
            color: #999999;
            margin-top: 10px;
          }
          .warning-box {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 20px;
            border-radius: 4px;
            margin: 20px 0;
          }
          .warning-text {
            font-size: 14px;
            color: #856404;
            margin: 0;
            line-height: 1.6;
          }
          .email-footer {
            background-color: #f9f9f9;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #eeeeee;
          }
          .footer-text {
            font-size: 14px;
            color: #999999;
            margin: 5px 0;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <h1 class="email-logo">CrowdWave</h1>
            <p class="email-tagline">Crowd-Powered Package Delivery</p>
          </div>
          
          <div class="email-body">
            <h2 class="email-title">Password Reset Request</h2>
            
            <p class="email-text">
              Hi ${userRecord.displayName || 'there'},
            </p>
            
            <p class="email-text">
              We received a request to reset your password. Use this code to reset your password:
            </p>
            
            <div class="otp-container">
              <p class="otp-code">${otp}</p>
              <p class="otp-label">Your 6-digit reset code</p>
            </div>
            
            <p class="email-text" style="text-align: center; font-weight: 600;">
              Enter this code in the app to reset your password.
            </p>
            
            <div class="warning-box">
              <p class="warning-text">
                ⚠️ <strong>Security Notice:</strong><br>
                • This code expires in 10 minutes<br>
                • If you didn't request a password reset, please ignore this email<br>
                • Never share this code with anyone
              </p>
            </div>
          </div>
          
          <div class="email-footer">
            <p class="footer-text">
              Questions? Contact us at 
              <a href="mailto:support@crowdwave.eu" style="color: #667eea;">support@crowdwave.eu</a>
            </p>
            <p class="footer-text">
              © ${new Date().getFullYear()} CrowdWave. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
Password Reset Request

Hi ${userRecord.displayName || 'there'},

We received a request to reset your password. Your password reset code is: ${otp}

Enter this code in the app to reset your password.

Security Notice:
- This code expires in 10 minutes
- If you didn't request a password reset, please ignore this email
- Never share this code with anyone

Questions? Email us at support@crowdwave.eu

© ${new Date().getFullYear()} CrowdWave. All rights reserved.
    `.trim();

    const mailOptions = {
      from: '"CrowdWave Security" <nauman@crowdwave.eu>',
      to: email,
      replyTo: 'security@crowdwave.eu',
      subject: subject,
      text: text,
      html: html,
    };

    await transporter.sendMail(mailOptions);

    functions.logger.info('Password reset OTP email sent successfully', {
      email,
    });

    return { 
      success: true, 
      message: 'If an account exists with this email, a password reset code has been sent.',
    };

  } catch (error) {
    functions.logger.error('Failed to send password reset OTP email', {
      error: error.message,
      email,
    });
    
    throw new functions.https.HttpsError('internal', `Failed to send password reset email: ${error.message}`);
  }
});

/**
 * Cloud Function: Send CRM Login OTP Email
 * Endpoint for CRM admin panel to send login OTP codes
 * Called from: CrowdWave CRM Admin Panel
 */
exports.sendCrmLoginOTP = functions.https.onCall(async (data, context) => {
  const { email, otp } = data;

  // Validation
  if (!email || !otp) {
    throw new functions.https.HttpsError('invalid-argument', 'Email and OTP are required');
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new functions.https.HttpsError('invalid-argument', 'Invalid email format');
  }

  // Validate OTP format (6 digits)
  if (!/^\d{6}$/.test(otp)) {
    throw new functions.https.HttpsError('invalid-argument', 'OTP must be a 6-digit number');
  }

  const expiryMinutes = 10;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your CRM Login OTP</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background-color: #f5f5f5;
        }
        .email-container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .email-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px 30px;
          text-align: center;
        }
        .email-logo {
          color: #ffffff;
          font-size: 36px;
          font-weight: bold;
          margin: 0;
          letter-spacing: 1px;
        }
        .email-tagline {
          color: rgba(255, 255, 255, 0.9);
          font-size: 14px;
          margin-top: 8px;
        }
        .email-tagline {
          color: rgba(255, 255, 255, 0.9);
          font-size: 14px;
          margin-top: 8px;
        }
        .email-body {
          padding: 40px 30px;
        }
        .email-title {
          font-size: 24px;
          font-weight: 600;
          color: #333333;
          margin: 0 0 20px 0;
        }
        .email-text {
          font-size: 16px;
          line-height: 24px;
          color: #666666;
          margin: 0 0 30px 0;
        }
        .otp-box {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #ffffff;
          font-size: 36px;
          font-weight: bold;
          letter-spacing: 10px;
          padding: 20px;
          text-align: center;
          border-radius: 8px;
          margin: 30px 0;
        }
        .email-footer {
          background-color: #f9f9f9;
          padding: 30px;
          text-align: center;
          font-size: 14px;
          color: #999999;
          border-top: 1px solid #eeeeee;
        }
        .warning {
          background-color: #fff3cd;
          color: #856404;
          padding: 15px;
          border-radius: 6px;
          margin: 20px 0;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <h1 style="color: #ffffff; font-size: 32px; font-weight: bold; margin: 0; letter-spacing: 2px;">CrowdWave</h1>
          <p class="email-tagline">CRM Admin Panel</p>
        </div>
        <div class="email-body">
          <h2 class="email-title">Your Login Verification Code</h2>
          <p class="email-text">
            Hello! You've requested to login to CrowdWave CRM. Please use the following One-Time Password (OTP) to complete your login:
          </p>
          <div class="otp-box">${otp}</div>
          <p class="email-text">
            This code will expire in <strong>${expiryMinutes} minutes</strong>.
          </p>
          <div class="warning">
            ⚠️ <strong>Security Notice:</strong> Never share this code with anyone. CrowdWave staff will never ask for your OTP.
          </div>
          <p class="email-text">
            If you didn't request this code, please ignore this email or contact support if you have concerns about your account security.
          </p>
        </div>
        <div class="email-footer">
          <p>© ${new Date().getFullYear()} CrowdWave. All rights reserved.</p>
          <p>This is an automated message, please do not reply.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `Your CrowdWave CRM Login OTP: ${otp}\n\nThis code will expire in ${expiryMinutes} minutes.\n\nIf you didn't request this code, please ignore this email.`;

  try {
    const transporter = getEmailTransporter();
    
    const mailOptions = {
      from: '"CrowdWave CRM" <nauman@crowdwave.eu>',
      to: email,
      subject: 'Your CRM Login OTP - CrowdWave',
      html: html,
      text: text
    };

    const info = await transporter.sendMail(mailOptions);
    
    functions.logger.info('CRM OTP email sent successfully', { email });

    return {
      success: true,
      message: 'OTP email sent successfully',
      messageId: info.messageId
    };
  } catch (error) {
    functions.logger.error('Failed to send CRM OTP email', {
      error: error.message,
      email,
    });
    throw new functions.https.HttpsError('internal', `Failed to send CRM OTP email: ${error.message}`);
  }
});

/**
 * ✅ NEW: Send Welcome Email to New Users
 * Automatically triggered when a new user creates an account
 */
exports.sendWelcomeEmail = functions.https.onCall(async (data, context) => {
  const { email, displayName, userId } = data;

  if (!email) {
    throw new functions.https.HttpsError('invalid-argument', 'Email is required');
  }

  const transporter = getEmailTransporter();
  const userName = displayName || 'there';

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to CrowdWave</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background-color: #f5f5f5;
        }
        .email-container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .email-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px 30px;
          text-align: center;
        }
        .email-logo {
          color: #ffffff;
          font-size: 36px;
          font-weight: bold;
          margin: 0;
          letter-spacing: 1px;
        }
        .email-tagline {
          color: rgba(255, 255, 255, 0.9);
          font-size: 14px;
          margin-top: 8px;
        }
        .email-body {
          padding: 40px 30px;
        }
        .email-title {
          font-size: 28px;
          font-weight: 600;
          color: #333333;
          margin: 0 0 20px 0;
        }
        .email-text {
          font-size: 16px;
          line-height: 24px;
          color: #666666;
          margin: 0 0 20px 0;
        }
        .feature-box {
          background-color: #f8f9fa;
          border-left: 4px solid #667eea;
          padding: 20px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .feature-item {
          display: flex;
          align-items: center;
          margin: 12px 0;
        }
        .feature-icon {
          font-size: 24px;
          margin-right: 12px;
        }
        .email-button {
          display: inline-block;
          padding: 16px 40px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #ffffff;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          font-size: 16px;
          margin: 20px 0;
        }
        .email-footer {
          background-color: #f9f9f9;
          padding: 30px;
          text-align: center;
          border-top: 1px solid #eeeeee;
        }
        .footer-text {
          font-size: 14px;
          color: #999999;
          margin: 5px 0;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <h1 class="email-logo">CrowdWave</h1>
          <p class="email-tagline">Crowd-Powered Package Delivery</p>
        </div>
        
        <div class="email-body">
          <h2 class="email-title">Welcome to CrowdWave! 🎉</h2>
          
          <p class="email-text">
            Hi ${userName}!
          </p>
          
          <p class="email-text">
            We're thrilled to have you join our community of travelers and senders making deliveries happen around the world!
          </p>
          
          <div class="feature-box">
            <h3 style="margin-top: 0; color: #333;">What you can do with CrowdWave:</h3>
            
            <div class="feature-item">
              <span class="feature-icon">📦</span>
              <span><strong>Send Packages</strong> - Ship items affordably with travelers going your way</span>
            </div>
            
            <div class="feature-item">
              <span class="feature-icon">✈️</span>
              <span><strong>Earn While Traveling</strong> - Make money by delivering packages on your trips</span>
            </div>
            
            <div class="feature-item">
              <span class="feature-icon">🔒</span>
              <span><strong>Secure Payments</strong> - Protected transactions with escrow system</span>
            </div>
            
            <div class="feature-item">
              <span class="feature-icon">📍</span>
              <span><strong>Real-Time Tracking</strong> - Track your packages every step of the way</span>
            </div>
            
            <div class="feature-item">
              <span class="feature-icon">💬</span>
              <span><strong>Chat & Negotiate</strong> - Communicate directly with travelers or senders</span>
            </div>
          </div>
          
          <p class="email-text">
            <strong>Getting Started:</strong>
          </p>
          
          <ol class="email-text">
            <li>Complete your profile with a photo and bio</li>
            <li>Verify your email address (check your inbox)</li>
            <li>Add your first trip or package request</li>
            <li>Start connecting with our community!</li>
          </ol>
          
          <div style="text-align: center;">
            <a href="https://crowdwave.eu" class="email-button">
              🚀 Get Started Now
            </a>
          </div>
          
          <p class="email-text" style="margin-top: 30px;">
            Need help? Our support team is here for you at 
            <a href="mailto:support@crowdwave.eu" style="color: #667eea;">support@crowdwave.eu</a>
          </p>
        </div>
        
        <div class="email-footer">
          <p class="footer-text">
            © ${new Date().getFullYear()} CrowdWave. All rights reserved.
          </p>
          <p class="footer-text">
            CrowdWave - Connecting couriers with packages worldwide
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
Welcome to CrowdWave! 🎉

Hi ${userName}!

We're thrilled to have you join our community of travelers and senders making deliveries happen around the world!

What you can do with CrowdWave:
📦 Send Packages - Ship items affordably with travelers going your way
✈️ Earn While Traveling - Make money by delivering packages on your trips
🔒 Secure Payments - Protected transactions with escrow system
📍 Real-Time Tracking - Track your packages every step of the way
💬 Chat & Negotiate - Communicate directly with travelers or senders

Getting Started:
1. Complete your profile with a photo and bio
2. Verify your email address
3. Add your first trip or package request
4. Start connecting with our community!

Visit: https://crowdwave.eu

Need help? Contact us at support@crowdwave.eu

© ${new Date().getFullYear()} CrowdWave. All rights reserved.
  `.trim();

  const mailOptions = {
    from: '"CrowdWave" <nauman@crowdwave.eu>',
    to: email,
    subject: 'Welcome to CrowdWave - Start Your Journey! 🎉',
    html: html,
    text: text
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Welcome email sent successfully:', {
      messageId: info.messageId,
      to: email,
      userId: userId,
      timestamp: new Date().toISOString()
    });

    return {
      success: true,
      message: 'Welcome email sent successfully',
      messageId: info.messageId
    };
  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
    throw new functions.https.HttpsError('internal', `Failed to send welcome email: ${error.message}`);
  }
});

/**
 * ✅ NEW: Send Promotional Email
 * Content controlled from CRM dashboard
 */
exports.sendPromotionalEmail = functions.https.onCall(async (data, context) => {
  // Verify admin authentication
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  // Check if user is admin (you can add admin role checking here)
  const db = admin.firestore();
  const userDoc = await db.collection('users').doc(context.auth.uid).get();
  
  if (!userDoc.exists || userDoc.data().role !== 'admin') {
    throw new functions.https.HttpsError('permission-denied', 'Only admins can send promotional emails');
  }

  const { recipients, subject, htmlContent, textContent, campaignId } = data;

  if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
    throw new functions.https.HttpsError('invalid-argument', 'Recipients array is required');
  }

  if (!subject || !htmlContent) {
    throw new functions.https.HttpsError('invalid-argument', 'Subject and content are required');
  }

  // Remove duplicate recipients
  const uniqueRecipients = [...new Set(recipients)];
  
  functions.logger.info('Promotional email campaign', {
    campaignId: campaignId,
    totalRecipients: recipients.length,
    uniqueRecipients: uniqueRecipients.length,
    duplicatesRemoved: recipients.length - uniqueRecipients.length
  });

  const transporter = getEmailTransporter();
  const results = {
    sent: 0,
    failed: 0,
    errors: []
  };

  // Send emails in batches to avoid overwhelming the SMTP server
  for (const recipient of uniqueRecipients) {
    try {
      const mailOptions = {
        from: '"CrowdWave" <nauman@crowdwave.eu>',
        to: recipient,
        subject: subject,
        html: htmlContent,
        text: textContent || 'Please view this email in HTML format'
      };

      const info = await transporter.sendMail(mailOptions);
      results.sent++;

      console.log(`✅ Promotional email sent to ${recipient}:`, {
        messageId: info.messageId,
        campaignId: campaignId,
        timestamp: new Date().toISOString()
      });

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));

    } catch (error) {
      results.failed++;
      results.errors.push({
        recipient: recipient,
        error: error.message
      });
      console.error(`❌ Failed to send promotional email to ${recipient}:`, error);
    }
  }

  // Log campaign results
  if (campaignId) {
    await db.collection('emailCampaigns').doc(campaignId).update({
      status: 'completed',
      sentCount: results.sent,
      failedCount: results.failed,
      completedAt: admin.firestore.FieldValue.serverTimestamp(),
      results: results
    });
  }

  return {
    success: true,
    sent: results.sent,
    failed: results.failed,
    errors: results.errors
  };
});

/**
 * ✅ NEW: Verify Email with OTP (marks email as verified in Firebase Auth)
 */
exports.verifyEmailWithOTP = functions.https.onCall(async (data, context) => {
  // Require authentication
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const { email, otp } = data;

  if (!email || !otp) {
    throw new functions.https.HttpsError('invalid-argument', 'Email and OTP are required');
  }

  try {
    const db = admin.firestore();
    
    // Verify OTP from Firestore
    const otpDoc = await db.collection('otp_codes').doc(email).get();
    
    if (!otpDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'Invalid or expired verification code. Please request a new one.');
    }

    const otpData = otpDoc.data();
    
    // Check type
    if (otpData.type !== 'email_verification') {
      throw new functions.https.HttpsError('invalid-argument', 'Invalid verification code type');
    }

    // Check if OTP has been used
    if (otpData.used === true) {
      throw new functions.https.HttpsError('already-exists', 'This code has already been used. Please request a new one.');
    }

    // Check if OTP has expired
    const expiresAt = otpData.expiresAt.toDate();
    if (new Date() > expiresAt) {
      await db.collection('otp_codes').doc(email).delete();
      throw new functions.https.HttpsError('deadline-exceeded', 'Verification code has expired. Please request a new one.');
    }

    // Check if OTP matches
    if (otpData.otp !== otp) {
      throw new functions.https.HttpsError('permission-denied', 'Invalid verification code');
    }

    // OTP is valid, mark email as verified using Admin SDK
    const userRecord = await admin.auth().getUserByEmail(email);
    await admin.auth().updateUser(userRecord.uid, {
      emailVerified: true
    });

    // Mark OTP as used
    await db.collection('otp_codes').doc(email).update({
      used: true,
      usedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    functions.logger.info('Email verified successfully', {
      email: email,
      uid: userRecord.uid,
    });

    return {
      success: true,
      message: 'Email verified successfully'
    };
  } catch (error) {
    functions.logger.error('Email verification failed:', error);
    
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    
    if (error.code === 'auth/user-not-found') {
      throw new functions.https.HttpsError('not-found', 'User not found');
    }
    
    throw new functions.https.HttpsError('internal', 'Failed to verify email');
  }
});

/**
 * ✅ NEW: Reset Password with OTP Verification (for CRM)
 */
exports.resetPasswordWithOTP = functions.https.onCall(async (data, context) => {
  const { email, otp, newPassword } = data;

  if (!email || !otp || !newPassword) {
    throw new functions.https.HttpsError('invalid-argument', 'Email, OTP, and new password are required');
  }

  try {
    const db = admin.firestore();
    
    // Verify OTP from Firestore
    const otpDoc = await db.collection('otp_codes').doc(email).get();
    
    if (!otpDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'Invalid or expired OTP');
    }

    const otpData = otpDoc.data();
    
    // Check if OTP has expired
    if (Date.now() > otpData.expiresAt) {
      await db.collection('otp_codes').doc(email).delete();
      throw new functions.https.HttpsError('deadline-exceeded', 'OTP has expired');
    }

    // Check if OTP matches
    if (otpData.code !== otp) {
      throw new functions.https.HttpsError('permission-denied', 'Invalid OTP');
    }

    // OTP is valid, update the password using Admin SDK
    const userRecord = await admin.auth().getUserByEmail(email);
    await admin.auth().updateUser(userRecord.uid, {
      password: newPassword
    });

    // Delete the OTP after successful password reset
    await db.collection('otp_codes').doc(email).delete();

    console.log(`✅ Password reset successfully for: ${email}`);

    return {
      success: true,
      message: 'Password has been reset successfully'
    };
  } catch (error) {
    console.error('❌ Password reset failed:', error);
    
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    
    if (error.code === 'auth/user-not-found') {
      throw new functions.https.HttpsError('not-found', 'User not found');
    }
    
    throw new functions.https.HttpsError('internal', 'Failed to reset password');
  }
});

module.exports = {
  // sendEmailVerification: exports.sendEmailVerification, // DISABLED - using OTP system instead
  sendPasswordResetEmail: exports.sendPasswordResetEmail,
  sendDeliveryUpdateEmail: exports.sendDeliveryUpdateEmail,
  sendDeliveryOTPEmail: exports.sendDeliveryOTPEmail,
  testEmailConfig: exports.testEmailConfig,
  sendOTPEmail: exports.sendOTPEmail,
  sendPasswordResetOTP: exports.sendPasswordResetOTP,
  verifyPasswordResetOTP: exports.verifyPasswordResetOTP,
  verifyEmailWithOTP: exports.verifyEmailWithOTP,
  sendCrmLoginOTP: exports.sendCrmLoginOTP,
  sendWelcomeEmail: exports.sendWelcomeEmail,
  sendPromotionalEmail: exports.sendPromotionalEmail,
  resetPasswordWithOTP: exports.resetPasswordWithOTP,
};
