const express = require('express');
const { db } = require('../firebase');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

const DEFAULT_TEMPLATES = [
  {
    name: 'welcome-email',
    subject: 'Welcome to the future of email, {{name}}!',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #0A84FF;">Welcome to PlugMail!</h1>
        <p>Hi {{name}},</p>
        <p>We're thrilled to have you onboard. PlugMail is designed to give you total control over your transactional emails using your own infrastructure.</p>
        <p>Your account is now ready. Start by creating an API key and connecting your Gmail account.</p>
        <br/>
        <p>Best regards,<br/>The PlugMail Team</p>
      </div>
    `,
    category: 'Onboarding'
  },
  {
    name: 'security-otp',
    subject: 'Your Verification Code: {{code}}',
    html: `
      <div style="font-family: sans-serif; text-align: center; padding: 40px; border: 1px solid #f3f4f6; border-radius: 12px;">
        <h2 style="color: #111827; margin-bottom: 8px;">Verify Your Identity</h2>
        <p style="color: #6b7280; margin-bottom: 24px;">Use the code below to complete your login attempt.</p>
        <div style="font-size: 32px; font-weight: 700; color: #0A84FF; letter-spacing: 6px; background: #f9fafb; padding: 16px; border-radius: 8px; display: inline-block;">
          {{code}}
        </div>
        <p style="color: #9ca3af; font-size: 12px; margin-top: 24px;">This code will expire in 10 minutes.</p>
      </div>
    `,
    category: 'Security'
  },
  {
    name: 'password-reset',
    subject: 'Reset your password',
    html: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h3>Reset Your Password</h3>
        <p>We received a request to reset your password. Click the button below to proceed:</p>
        <a href="{{reset_url}}" style="display: inline-block; padding: 12px 24px; background: #0A84FF; color: #fff; text-decoration: none; border-radius: 6px; font-weight: 600;">Reset Password</a>
        <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
    category: 'Account'
  }
];

/**
 * Sync user profile to Firestore after Google Login.
 */
router.post('/sync', requireAuth, async (req, res) => {
  try {
    const { uid, email, name, picture } = req.user;
    
    const userRef = db.collection('users').doc(uid);
    const doc = await userRef.get();
    
    if (!doc.exists) {
      // New User - Seed Data
      const batch = db.batch();
      
      batch.set(userRef, {
        uid,
        email,
        name: name || '',
        picture: picture || '',
        plan: 'free',
        createdAt: new Date().toISOString(),
        settings: {
          notifications: { emailOnFailure: true, weeklyReport: false, securityAlerts: true },
          security: { twoFactorAuth: false, sessionTimeout: 60, ipWhitelisting: false }
        }
      });

      // Seed Default Templates
      DEFAULT_TEMPLATES.forEach(template => {
        const templateRef = db.collection('templates').doc();
        batch.set(templateRef, {
          ...template,
          userId: uid,
          createdAt: new Date().toISOString()
        });
      });

      await batch.commit();
      console.log(`[USER SYNC] New user ${uid} created and seeded with default templates.`);
    } else {
      // Optional: update name/picture if they changed
      await userRef.update({
        name: name || doc.data().name,
        picture: picture || doc.data().picture,
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error syncing user:', error);
    res.status(500).json({ error: 'Failed to sync user profile' });
  }
});

/**
 * Delete Account: Remove all user data from Firestore and delete the Auth account.
 */
router.delete('/', requireAuth, async (req, res) => {
  try {
    const { uid } = req.user;
    
    console.log(`[DELETE ACCOUNT] Starting deletion for user ${uid}`);

    // We use a batch for Firestore deletes
    const batch = db.batch();

    // 1. Delete API Keys
    const keysSnap = await db.collection('api_keys').where('userId', '==', uid).get();
    keysSnap.forEach(doc => batch.delete(doc.ref));

    // 2. Delete Gmail Accounts
    const accountsSnap = await db.collection('gmail_accounts').where('userId', '==', uid).get();
    accountsSnap.forEach(doc => batch.delete(doc.ref));

    // 3. Delete Templates
    const templatesSnap = await db.collection('templates').where('userId', '==', uid).get();
    templatesSnap.forEach(doc => batch.delete(doc.ref));

    // 4. Delete Logs
    const logsSnap = await db.collection('email_logs').where('userId', '==', uid).get();
    logsSnap.forEach(doc => batch.delete(doc.ref));

    // 5. Delete User Profile
    batch.delete(db.collection('users').doc(uid));

    // Commit Firestore changes
    await batch.commit();
    console.log(`[DELETE ACCOUNT] Firestore data cleared for user ${uid}`);

    // 6. Delete from Firebase Auth
    const { auth } = require('../firebase');
    await auth.deleteUser(uid);
    console.log(`[DELETE ACCOUNT] Auth user deleted for user ${uid}`);

    res.json({ success: true, message: 'Account and all data deleted successfully' });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ error: 'Failed to delete account' });
  }
});

/**
 * Get user settings
 */
router.get('/settings', requireAuth, async (req, res) => {
  try {
    const userRef = db.collection('users').doc(req.user.uid);
    const doc = await userRef.get();
    
    if (!doc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const data = doc.data();
    res.json({
      settings: data.settings || {
        notifications: {
          emailOnFailure: true,
          weeklyReport: false,
          securityAlerts: true
        },
        security: {
          twoFactorAuth: false,
          sessionTimeout: 60,
          ipWhitelisting: false
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

/**
 * Update user settings
 */
router.patch('/settings', requireAuth, async (req, res) => {
  try {
    const userRef = db.collection('users').doc(req.user.uid);
    await userRef.update({
      settings: req.body.settings
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

module.exports = router;
