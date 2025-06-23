const authService = require('../services/auth');

// PUBLIC_INTERFACE
exports.register = async (req, res) => {
  /**
   * @swagger
   * /auth/register:
   *   post:
   *     summary: Register a new user and get token
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [username, password]
   *             properties:
   *               username:
   *                 type: string
   *                 description: Desired username
   *               password:
   *                 type: string
   *                 description: Password
   *     responses:
   *       201:
   *         description: User created with JWT token
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *                 user:
   *                   $ref: '#/components/schemas/User'
   */
  try {
    const { username, password } = req.body;
    const { token, user } = await authService.register(username, password);
    return res.status(201).json({ token, user });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// PUBLIC_INTERFACE
exports.login = async (req, res) => {
  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: Log in a user and get a JWT token
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [username, password]
   *             properties:
   *               username:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Login success with token
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *                 user:
   *                   $ref: '#/components/schemas/User'
   */
  try {
    const { username, password } = req.body;
    const { token, user } = await authService.login(username, password);
    return res.json({ token, user });
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
};

// PUBLIC_INTERFACE
exports.whoami = (req, res) => {
  /**
   * @swagger
   * /auth/whoami:
   *   get:
   *     summary: Get information about the current user
   *     tags: [Auth]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Current user's info
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   */
  res.json(req.user);
};
