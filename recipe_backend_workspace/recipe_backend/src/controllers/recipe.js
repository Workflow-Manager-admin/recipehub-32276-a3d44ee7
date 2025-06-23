const recipeService = require('../services/recipe');

// PUBLIC_INTERFACE
exports.getAllRecipes = (req, res) => {
  /**
   * @swagger
   * /recipes:
   *   get:
   *     summary: Get all recipes or search/filter
   *     tags: [Recipes]
   *     parameters:
   *       - in: query
   *         name: search
   *         schema:
   *           type: string
   *         description: Search text in title/description
   *       - in: query
   *         name: tags
   *         schema:
   *           type: array
   *           items:
   *             type: string
   *         description: Filter by tags (comma-separated)
   *     responses:
   *       200:
   *         description: Recipe list
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Recipe'
   */
  let tags = req.query.tags;
  if (typeof tags === 'string') tags = tags.split(',');
  const { search } = req.query;
  const recipes = recipeService.getAllRecipes({ search, tags });
  res.json(recipes);
};

// PUBLIC_INTERFACE
exports.createRecipe = (req, res) => {
  /**
   * @swagger
   * /recipes:
   *   post:
   *     summary: Submit a new recipe
   *     tags: [Recipes]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/RecipeInput'
   *     responses:
   *       201:
   *         description: Recipe created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Recipe'
   */
  try {
    const { title, description, ingredients, steps, tags } = req.body;
    const recipe = recipeService.createRecipe({
      title,
      description,
      ingredients,
      steps,
      tags,
      authorId: req.user.userId,
    });
    res.status(201).json(recipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUBLIC_INTERFACE
exports.getRecipeById = (req, res) => {
  /**
   * @swagger
   * /recipes/{id}:
   *   get:
   *     summary: Get a recipe by ID
   *     tags: [Recipes]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Recipe details
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Recipe'
   *       404:
   *         description: Recipe not found
   */
  const recipe = recipeService.getRecipe(req.params.id);
  if (recipe) return res.json(recipe);
  res.status(404).json({ error: 'Recipe not found' });
};

// PUBLIC_INTERFACE
exports.updateRecipe = (req, res) => {
  /**
   * @swagger
   * /recipes/{id}:
   *   put:
   *     summary: Edit a recipe (only author)
   *     tags: [Recipes]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/RecipeInput'
   *     responses:
   *       200:
   *         description: Recipe updated
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Recipe'
   *       403:
   *         description: Not authorized
   */
  try {
    const recipe = recipeService.updateRecipe(req.params.id, req.body, req.user.userId);
    res.json(recipe);
  } catch (err) {
    res.status(err.message === 'Not authorized to edit' ? 403 : 404).json({ error: err.message });
  }
};

// PUBLIC_INTERFACE
exports.deleteRecipe = (req, res) => {
  /**
   * @swagger
   * /recipes/{id}:
   *   delete:
   *     summary: Delete a recipe (only author)
   *     tags: [Recipes]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Recipe deleted
   *       403:
   *         description: Not authorized
   *       404:
   *         description: Recipe not found
   */
  try {
    const deleted = recipeService.deleteRecipe(req.params.id, req.user.userId);
    res.json(deleted);
  } catch (err) {
    res.status(err.message === 'Not authorized to delete' ? 403 : 404).json({ error: err.message });
  }
};
