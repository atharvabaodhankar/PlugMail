const express = require('express');
const Handlebars = require('handlebars');
const { db } = require('../firebase');
const { requireApiKey } = require('../middleware/apiKeyAuth');
const { requireAuth } = require('../middleware/auth');
const { decrypt } = require('../utils/crypto');
const { createTransporter, sendMail } = require('../utils/mailer');

const router = express.Router();

/**
 * POST /api/send
 * Core sending infrastructure. Protected by x-api-key header.
 */
router.post('/', requireApiKey, async (req, res) => {
  return handleSend(req, res, req.userId);
});

/**
 * POST /api/send/test
 * Internal playground testing. Protected by Firebase Auth (JWT).
 */
router.post('/test', requireAuth, async (req, res) => {
  return handleSend(req, res, req.user.uid);
});

async function handleSend(req, res, userId) {
  try {
    const { to, template: templateName, variables, subject: overrideSubject } = req.body;
    
    // 1. Validation
    if (!to || !templateName) {
      return res.status(400).json({ error: 'Missing required fields: to, template' });
    }

    // 2. Fetch User's Template
    const templateSnapshot = await db.collection('templates')
      .where('userId', '==', userId)
      .where('name', '==', templateName)
      .limit(1)
      .get();

    if (templateSnapshot.empty) {
      return res.status(404).json({ error: `Template '${templateName}' not found` });
    }
    const templateDoc = templateSnapshot.docs[0].data();

    // 3. Compile Template with Handlebars
    const compiledHtml = Handlebars.compile(templateDoc.html || '')(variables || {});
    const compiledSubject = Handlebars.compile(overrideSubject || templateDoc.subject || '')(variables || {});

    // 4. Fetch User's Default Gmail Account
    const accountSnapshot = await db.collection('emailAccounts')
      .where('userId', '==', userId)
      .where('isDefault', '==', true)
      .limit(1)
      .get();

    if (accountSnapshot.empty) {
      return res.status(400).json({ error: 'No default connected email account found' });
    }
    const accountDoc = accountSnapshot.docs[0].data();

    // 5. Decrypt Password & Setup Nodemailer
    const decryptedPassword = decrypt(accountDoc.encryptedPassword);
    const transporter = createTransporter(accountDoc.email, decryptedPassword);

    const mailOptions = {
      from: accountDoc.email,
      to,
      subject: compiledSubject,
      html: compiledHtml
    };

    // 6. Send Email
    const result = await sendMail(transporter, mailOptions);

    // 7. Log to Firestore
    const logData = {
      userId,
      templateId: templateSnapshot.docs[0].id,
      to,
      subject: compiledSubject,
      status: result.success ? 'sent' : 'failed',
      provider: 'gmail',
      timestamp: new Date().toISOString(),
      error: result.error || null
    };
    
    await db.collection('emailLogs').add(logData);

    // 8. Respond
    if (result.success) {
      res.json({ success: true, messageId: result.messageId });
    } else {
      res.status(500).json({ success: false, error: 'Email delivery failed', details: result.error });
    }
  } catch (error) {
    console.error('Send API Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = router;
