const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

/**
 * In-memory user storage. For production, use a database.
 */
class UserService {
  constructor() {
    this.users = [];
  }

  // PUBLIC_INTERFACE
  async createUser({ username, password }) {
    /** Creates a new user with hashed password. */
    const exists = this.users.find(u => u.username === username);
    if (exists) throw new Error('Username already taken');
    const hash = await bcrypt.hash(password, 10);
    const user = { id: uuidv4(), username, password: hash, createdAt: new Date() };
    this.users.push(user);
    return { id: user.id, username: user.username, createdAt: user.createdAt };
  }

  // PUBLIC_INTERFACE
  async getUserByUsername(username) {
    /** Fetch user by username. */
    return this.users.find(u => u.username === username) || null;
  }

  // PUBLIC_INTERFACE
  getUserPublic(id) {
    /** Get public info of a user by id */
    const user = this.users.find(u => u.id === id);
    if (!user) return null;
    return { id: user.id, username: user.username, createdAt: user.createdAt };
  }

  // PUBLIC_INTERFACE
  getAllUsers() {
    /** Get all users (public info). */
    return this.users.map(({ password, ...u }) => u);
  }
}

module.exports = new UserService();
