const express = require('express');
const controller = require('../controllers/auth');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: User registration, login, and authentication
 *
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         username:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *     Recipe:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         ingredients:
 *           type: array
 *           items:
 *             type: string
 *         steps:
 *           type: array
 *           items:
 *             type: string
 *         authorId:
 *           type: string
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     RecipeInput:
 *       type: object
 *       required: [title, description, ingredients, steps]
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         ingredients:
 *           type: array
 *           items:
 *             type: string
 *         steps:
 *           type: array
 *           items:
 *             type: string
 *         tags:
 *           type: array
 *           items:
 *             type: string
 */

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/whoami', requireAuth, controller.whoami);

module.exports = router;
