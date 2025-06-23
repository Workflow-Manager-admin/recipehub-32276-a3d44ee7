const express = require('express');
const controller = require('../controllers/recipe');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', controller.getAllRecipes);
router.post('/', requireAuth, controller.createRecipe);
router.get('/:id', controller.getRecipeById);
router.put('/:id', requireAuth, controller.updateRecipe);
router.delete('/:id', requireAuth, controller.deleteRecipe);

module.exports = router;
