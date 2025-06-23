const userService = require('../services/user');

// PUBLIC_INTERFACE
exports.getAllUsers = (req, res) => {
  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Get a list of users
   *     tags: [Users]
   *     responses:
   *       200:
   *         description: List of users
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/User'
   */
  res.json(userService.getAllUsers());
};

// PUBLIC_INTERFACE
exports.getUserById = (req, res) => {
  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     summary: Get user by ID
   *     tags: [Users]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: User public data
   *       404:
   *         description: User not found
   */
  const user = userService.getUserPublic(req.params.id);
  if (user) return res.json(user);
  return res.status(404).json({ error: 'User not found' });
};
