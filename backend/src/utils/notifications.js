const { createTransporter, sendMail } = require('./mailer');

/**
 * Sends a system notification email to a user.
 * Uses the system credentials defined in .env
 */
const sendSystemNotification = async (to, subject, html) => {
  try {
    const transporter = createTransporter(
      process.env.SYSTEM_EMAIL,
      process.env.SYSTEM_EMAIL_PASS
    );

    const mailOptions = {
      from: `"PlugMail System" <${process.env.SYSTEM_EMAIL}>`,
      to,
      subject: `[PlugMail] ${subject}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #ffffff; color: #111827;">
          <div style="margin-bottom: 32px;">
            <span style="font-size: 24px; font-weight: 700; color: #0A84FF; letter-spacing: -0.5px;">PlugMail</span>
          </div>
          
          <div style="font-size: 16px; line-height: 1.5; color: #374151;">
            ${html}
          </div>
          
          <div style="margin-top: 48px; padding-top: 24px; border-top: 1px solid #f3f4f6; font-size: 12px; color: #9ca3af; line-height: 1.5;">
            <p>You received this email because it's a security or system update related to your PlugMail account.</p>
            <p>&copy; 2026 PlugMail. All rights reserved.</p>
          </div>
        </div>
      `
    };

    return await sendMail(transporter, mailOptions);
  } catch (error) {
    console.error('System Notification Error:', error);
    return { success: false, error: error.message };
  }
};

module.exports = { sendSystemNotification };
