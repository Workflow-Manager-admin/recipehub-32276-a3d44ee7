const express = require('express');
const healthController = require('../controllers/health');

const router = express.Router();

router.get('/', healthController.check.bind(healthController));
router.use('/auth', require('../routes/auth'));
router.use('/users', require('../routes/users'));
router.use('/recipes', require('../routes/recipes'));

module.exports = router;
