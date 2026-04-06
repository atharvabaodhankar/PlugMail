const { auth } = require('../firebase');

const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    if (!auth) {
      throw new Error("Firebase Admin Auth is not initialized. Check .env variables.");
    }
    const decodedToken = await auth.verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying auth token', error.message);
    return res.status(401).json({ error: 'Unauthorized: Token verification failed' });
  }
};

module.exports = { requireAuth };
