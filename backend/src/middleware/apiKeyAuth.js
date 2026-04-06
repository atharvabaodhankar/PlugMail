const crypto = require('crypto');
const { db } = require('../firebase');

/**
 * Middleware to protect endpoints with an API Key (e.g. /api/send)
 * The client must send: x-api-key: pk_live_...
 */
const requireApiKey = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || !apiKey.startsWith('pk_live_')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid API Key format' });
  }

  try {
    // 1. Hash the incoming API key to compare with the DB
    // We only store hashes of API keys in Firestore, never the raw key
    const hashedKey = crypto.createHash('sha256').update(apiKey).digest('hex');

    // 2. Query Firestore for this hashed key
    const keysSnapshot = await db.collection('apiKeys')
      .where('hashedKey', '==', hashedKey)
      .where('active', '==', true)
      .limit(1)
      .get();

    if (keysSnapshot.empty) {
      return res.status(401).json({ error: 'Unauthorized: Invalid or revoked API Key' });
    }

    const keyDoc = keysSnapshot.docs[0].data();

    // 3. Attach userId to request
    req.userId = keyDoc.userId;
    req.keyId = keysSnapshot.docs[0].id;
    
    // Note: We could increment a usage counter here, or let the /send endpoint do it.
    next();
  } catch (error) {
    console.error('API Key Verification Error:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { requireApiKey };
