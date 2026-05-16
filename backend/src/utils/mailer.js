const nodemailer = require('nodemailer');

/**
 * Creates a Nodemailer transporter for a given Gmail account and app password
 * @param {string} email - Gmail address
 * @param {string} appPassword - Plaintext Google App Password (decrypted)
 * @returns {Transporter} - Nodemailer transporter instance
 */
const createTransporter = (email, appPassword) => {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    family: 4, // Force IPv4 — prevents ENETUNREACH on IPv6-limited hosts
    auth: {
      user: email,
      pass: appPassword,
    },
  });
};

/**
 * Sends an email using the provided transporter
 * @param {Transporter} transporter - Nodemailer transporter
 * @param {Object} mailOptions - Nodemailer mail options (from, to, subject, html)
 */
const sendMail = async (transporter, mailOptions) => {
  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Nodemailer Error:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = { createTransporter, sendMail };
