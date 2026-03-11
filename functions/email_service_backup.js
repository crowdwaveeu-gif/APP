// Alternative Email Service using SendGrid as backup
// This provides a fallback when Zoho is down or rate-limited

const functions = require('firebase-functions');
const sgMail = require('@sendgrid/mail');

/**
 * Email service with Zoho primary and SendGrid backup
 */
class EmailService {
  constructor() {
    // Zoho configuration
    this.zohoConfig = {
      host: 'smtp.zoho.eu',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER || functions.config().smtp?.user || 'nauman@crowdwave.eu',
        pass: process.env.SMTP_PASSWORD || functions.config().smtp?.password,
      },
    };

    // SendGrid configuration (optional backup)
    if (process.env.SENDGRID_API_KEY || functions.config().sendgrid?.api_key) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY || functions.config().sendgrid?.api_key);
      this.hasSendGridBackup = true;
    } else {
      this.hasSendGridBackup = false;
    }
  }

  /**
   * Send email with automatic fallback
   */
  async sendEmail(mailOptions) {
    // Try Zoho first
    try {
      const nodemailer = require('nodemailer');
      const transporter = nodemailer.createTransport(this.zohoConfig);
      
      console.log('📧 Attempting to send email via Zoho...');
      const info = await transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully via Zoho:', info.messageId);
      return { success: true, provider: 'zoho', messageId: info.messageId };
    } catch (zohoError) {
      console.error('❌ Zoho failed:', zohoError.message);

      // If Zoho fails and SendGrid is configured, try SendGrid
      if (this.hasSendGridBackup) {
        try {
          console.log('🔄 Falling back to SendGrid...');
          
          const sendGridMsg = {
            to: mailOptions.to,
            from: process.env.SENDGRID_FROM_EMAIL || 'noreply@crowdwave.eu',
            subject: mailOptions.subject,
            html: mailOptions.html,
            text: mailOptions.text,
          };

          const [response] = await sgMail.send(sendGridMsg);
          console.log('✅ Email sent successfully via SendGrid:', response.headers['x-message-id']);
          return { success: true, provider: 'sendgrid', messageId: response.headers['x-message-id'] };
        } catch (sendGridError) {
          console.error('❌ SendGrid also failed:', sendGridError.message);
          throw new Error(`All email providers failed. Zoho: ${zohoError.message}, SendGrid: ${sendGridError.message}`);
        }
      } else {
        // No backup available
        throw zohoError;
      }
    }
  }

  /**
   * Check email service health
   */
  async healthCheck() {
    const status = {
      zoho: 'unknown',
      sendgrid: 'not_configured',
      timestamp: new Date().toISOString(),
    };

    // Test Zoho
    try {
      const nodemailer = require('nodemailer');
      const transporter = nodemailer.createTransport(this.zohoConfig);
      await transporter.verify();
      status.zoho = 'healthy';
    } catch (error) {
      status.zoho = 'unhealthy';
      status.zohoError = error.message;
    }

    // Test SendGrid if configured
    if (this.hasSendGridBackup) {
      try {
        // SendGrid doesn't have a simple verify method, so we mark it as configured
        status.sendgrid = 'configured';
      } catch (error) {
        status.sendgrid = 'error';
        status.sendgridError = error.message;
      }
    }

    return status;
  }
}

// Export singleton instance
const emailService = new EmailService();

/**
 * Health check function for email services
 */
exports.checkEmailHealth = functions.https.onCall(async (data, context) => {
  // Require admin authentication
  if (!context.auth || context.auth.token.admin !== true) {
    throw new functions.https.HttpsError('permission-denied', 'Only admins can check email health');
  }

  try {
    const status = await emailService.healthCheck();
    return {
      success: true,
      status,
    };
  } catch (error) {
    console.error('Error checking email health:', error);
    throw new functions.https.HttpsError('internal', 'Failed to check email health');
  }
});

module.exports = emailService;
