const express = require('express');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { db } = require('../firebase');
const { requireAuth } = require('../middleware/auth');
const { sendSystemNotification } = require('../utils/notifications');

const router = express.Router();

/**
 * GET /api/keys
 * Fetch user's API keys (we only return the name and masked key)
 */
router.get('/', requireAuth, async (req, res) => {
  try {
    const snapshot = await db.collection('apiKeys')
      .where('userId', '==', req.user.uid)
      .orderBy('createdAt', 'desc')
      .get();

    const keys = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        maskedKey: data.maskedKey, // e.g. pk_live_abcd••••••••wxyz
        active: data.active,
        createdAt: data.createdAt,
      };
    });

    res.json(keys);
  } catch (error) {
    console.error('Error fetching API keys:', error);
    res.status(500).json({ error: 'Failed to fetch API keys' });
  }
});

/**
 * POST /api/keys
 * Generate a new API key
 */
router.post('/', requireAuth, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Key name is required' });

    // Generate raw key: pk_live_ + 32 random hex chars
    const rawKey = 'pk_live_' + crypto.randomBytes(16).toString('hex');
    
    // Hash key for secure storage
    const hashedKey = crypto.createHash('sha256').update(rawKey).digest('hex');
    
    // Create masked version for UI
    const maskedKey = rawKey.slice(0, 12) + '••••••••' + rawKey.slice(-4);

    const newKey = {
      userId: req.user.uid,
      name,
      hashedKey,
      maskedKey,
      active: true,
      createdAt: new Date().toISOString()
    };

    const docRef = await db.collection('apiKeys').add(newKey);

    // Send Security Notification (if enabled)
    try {
      const userDoc = await db.collection('users').doc(req.user.uid).get();
      const userData = userDoc.data();
      if (userData?.settings?.notifications?.securityAlerts !== false) {
        await sendSystemNotification(
          req.user.email,
          'Security Alert: New API Key Created',
          `<p>A new API key named <strong>"${name}"</strong> was just created for your PlugMail account.</p>
           <p><strong>Masked Key:</strong> ${maskedKey}</p>
           <p>If you did not perform this action, please revoke the key immediately from your dashboard settings.</p>`
        );
      }
    } catch (notifyError) {
      console.error('Failed to send key creation notification:', notifyError);
    }

    // ONLY return the raw key once upon creation
    res.json({
      id: docRef.id,
      name: newKey.name,
      key: rawKey, // Show raw key once!
      active: newKey.active,
      createdAt: newKey.createdAt
    });
  } catch (error) {
    console.error('Error creating API key:', error);
    res.status(500).json({ error: 'Failed to create API key' });
  }
});

/**
 * DELETE /api/keys/:id
 * Revoke an API key
 */
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const keyRef = db.collection('apiKeys').doc(id);
    const doc = await keyRef.get();

    if (!doc.exists || doc.data().userId !== req.user.uid) {
      return res.status(404).json({ error: 'Key not found' });
    }

    // Soft delete / revoke
    await keyRef.update({ active: false });
    res.json({ success: true, message: 'API Key revoked' });
  } catch (error) {
    console.error('Error revoking API key:', error);
    res.status(500).json({ error: 'Failed to revoke API key' });
  }
});

module.exports = router;
