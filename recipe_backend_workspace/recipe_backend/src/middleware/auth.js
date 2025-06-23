const authService = require('../services/auth');

// Middleware to require JWT auth
// PUBLIC_INTERFACE
function requireAuth(req, res, next) {
  /** Require JWT token in Authorization header ("Bearer ..."). Adds req.user. */
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization header missing or invalid' });
  }
  const token = authHeader.slice(7);
  try {
    const payload = authService.verifyToken(token);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

module.exports = { requireAuth };
