const express = require('express');
const controller = require('../controllers/user');

const router = express.Router();

router.get('/', controller.getAllUsers);
router.get('/:id', controller.getUserById);

module.exports = router;
