const express = require('express');
const { db } = require('../firebase');
const { requireAuth } = require('../middleware/auth');
const { encrypt } = require('../utils/crypto');

const router = express.Router();

/**
 * GET /api/accounts
 * Fetch user's connected Gmail accounts (passwords excluded)
 */
router.get('/', requireAuth, async (req, res) => {
  try {
    const snapshot = await db.collection('emailAccounts')
      .where('userId', '==', req.user.uid)
      .get();

    const accounts = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        email: data.email,
        isDefault: data.isDefault,
        connected: data.createdAt,
      };
    });

    res.json(accounts);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({ error: 'Failed to fetch accounts' });
  }
});

/**
 * POST /api/accounts
 * Add a new Gmail account securely
 */
router.post('/', requireAuth, async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and App Password are required' });

    // Check if this is the first account (make it default if so)
    const existingSnapshot = await db.collection('emailAccounts')
      .where('userId', '==', req.user.uid)
      .limit(1)
      .get();
      
    const isDefault = existingSnapshot.empty;

    // Encrypt the app password using AES-256
    const encryptedPassword = encrypt(password);

    const newAccount = {
      userId: req.user.uid,
      provider: 'gmail',
      email,
      encryptedPassword, // Secure!
      isDefault,
      createdAt: new Date().toISOString()
    };

    const docRef = await db.collection('emailAccounts').add(newAccount);

    res.json({
      id: docRef.id,
      email: newAccount.email,
      isDefault: newAccount.isDefault,
      connected: newAccount.createdAt
    });
  } catch (error) {
    console.error('Error adding account:', error);
    res.status(500).json({ error: 'Failed to add account' });
  }
});

/**
 * DELETE /api/accounts/:id
 */
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const accountRef = db.collection('emailAccounts').doc(id);
    const doc = await accountRef.get();

    if (!doc.exists || doc.data().userId !== req.user.uid) {
      return res.status(404).json({ error: 'Account not found' });
    }

    await accountRef.delete();
    res.json({ success: true, message: 'Account deleted' });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ error: 'Failed to delete account' });
  }
});

module.exports = router;
