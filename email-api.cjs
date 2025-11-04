// Backend API for sending OTP emails using Zoho SMTP
// Run this with: node email-api.cjs

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Zoho SMTP Configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.eu',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.SMTP_USER || 'nauman@crowdwave.eu',
    pass: process.env.SMTP_PASSWORD,
  },
});

// Verify SMTP connection
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ SMTP connection failed:', error);
  } else {
    console.log('✅ SMTP server is ready to send emails');
  }
});

// Email template for OTP
const getOTPEmailTemplate = (otp, purpose = 'login', expiryMinutes = 10) => {
  const isPasswordReset = purpose === 'password-reset';
  const title = isPasswordReset ? 'Password Reset Code' : 'Login Verification Code';
  const greeting = isPasswordReset 
    ? "You've requested to reset your password for CrowdWave CRM." 
    : "You've requested to login to CrowdWave CRM.";
  const subject = isPasswordReset ? 'Your Password Reset Code' : 'Your Login Verification Code';
  
  return {
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
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
            <h1 class="email-logo">🚀 CrowdWave CRM</h1>
          </div>
          <div class="email-body">
            <h2 class="email-title">${title}</h2>
            <p class="email-text">
              Hello! ${greeting} Please use the following One-Time Password (OTP) to ${isPasswordReset ? 'reset your password' : 'complete your login'}:
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
    `,
    text: `CrowdWave CRM ${isPasswordReset ? 'Password Reset' : 'Login'} OTP: ${otp}\n\nThis code will expire in ${expiryMinutes} minutes.\n\nIf you didn't request this code, please ignore this email.`
  };
};

// API Endpoint to send OTP email
app.post('/api/send-otp', async (req, res) => {
  try {
    const { email, otp, purpose = 'login' } = req.body;

    // Validation
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Validate OTP format (6 digits)
    if (!/^\d{6}$/.test(otp)) {
      return res.status(400).json({
        success: false,
        message: 'OTP must be a 6-digit number'
      });
    }

    const emailTemplate = getOTPEmailTemplate(otp, purpose);
    const subject = purpose === 'password-reset' 
      ? 'Your Password Reset Code - CrowdWave CRM'
      : 'Your Login Verification Code - CrowdWave CRM';

    // Send email
    const info = await transporter.sendMail({
      from: '"CrowdWave CRM" <nauman@crowdwave.eu>',
      to: email,
      subject: subject,
      ...emailTemplate
    });

    console.log('✅ OTP email sent successfully:', {
      messageId: info.messageId,
      to: email,
      timestamp: new Date().toISOString()
    });

    res.json({
      success: true,
      message: 'OTP email sent successfully',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('❌ Error sending OTP email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP email',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Email API is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log('='.repeat(60));
  console.log('📧 CrowdWave CRM Email API Server');
  console.log('='.repeat(60));
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📬 SMTP User: ${process.env.SMTP_USER || 'nauman@crowdwave.eu'}`);
  console.log('='.repeat(60));
});
