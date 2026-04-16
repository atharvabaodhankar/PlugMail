const express = require('express');
const { db } = require('../firebase');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

/**
 * Sync user profile to Firestore after Google Login.
 * This ensures we have a record of every user.
 */
router.post('/sync', requireAuth, async (req, res) => {
  try {
    const { uid, email, name, picture } = req.user;
    
    const userRef = db.collection('users').doc(uid);
    const doc = await userRef.get();
    
    if (!doc.exists) {
      await userRef.set({
        uid,
        email,
        name: name || '',
        picture: picture || '',
        plan: 'free',
        createdAt: new Date().toISOString(),
      });
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

module.exports = router;
