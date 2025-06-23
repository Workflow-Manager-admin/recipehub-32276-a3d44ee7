const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userService = require('./user');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

/**
 * Handles authentication and JWT issuance/validation.
 */
class AuthService {
  // PUBLIC_INTERFACE
  async register(username, password) {
    /** Register a user (throw if exists); create and return JWT token. */
    const user = await userService.createUser({ username, password });
    const token = this.generateToken(user.id, username);
    return { token, user };
  }

  // PUBLIC_INTERFACE
  async login(username, password) {
    /** Verify credentials, return JWT token and user if success, throw if fail. */
    const user = await userService.getUserByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid username or password');
    }
    const token = this.generateToken(user.id, username);
    return { token, user: { id: user.id, username: user.username, createdAt: user.createdAt } };
  }

  // PUBLIC_INTERFACE
  generateToken(userId, username) {
    /** Issue a JWT token. */
    return jwt.sign({ userId, username }, JWT_SECRET, { expiresIn: '24h' });
  }

  // PUBLIC_INTERFACE
  verifyToken(token) {
    /**
     * Verify JWT token and return decoded payload; throw on error.
     */
    return jwt.verify(token, JWT_SECRET);
  }
}

module.exports = new AuthService();
