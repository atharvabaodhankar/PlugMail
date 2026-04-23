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

module.exports = router;
