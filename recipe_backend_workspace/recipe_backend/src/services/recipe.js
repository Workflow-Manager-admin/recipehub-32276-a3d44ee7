const { v4: uuidv4 } = require('uuid');

/**
 * In-memory recipe management.
 */
class RecipeService {
  constructor() {
    this.recipes = [];
  }

  // PUBLIC_INTERFACE
  createRecipe({ title, description, ingredients, steps, authorId, tags }) {
    /** Create a new recipe. */
    const recipe = {
      id: uuidv4(),
      title,
      description,
      ingredients,
      steps,
      authorId,
      tags: tags || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.recipes.push(recipe);
    return recipe;
  }

  // PUBLIC_INTERFACE
  getRecipe(id) {
    /** Fetch recipe by id. */
    return this.recipes.find(r => r.id === id) || null;
  }

  // PUBLIC_INTERFACE
  getAllRecipes({ search, tags }) {
    /** Get all recipes (support search by title/description and filtering by tags). */
    let results = [...this.recipes];

    if (search) {
      const term = search.toLowerCase();
      results = results.filter(
        r =>
          r.title.toLowerCase().includes(term) ||
          r.description.toLowerCase().includes(term)
      );
    }
    if (tags && Array.isArray(tags) && tags.length > 0) {
      results = results.filter(recipe =>
        tags.every(tag => recipe.tags.includes(tag))
      );
    }
    return results;
  }

  // PUBLIC_INTERFACE
  updateRecipe(id, update, userId) {
    /** Update an existing recipe (must be author). */
    const recipe = this.getRecipe(id);
    if (!recipe) throw new Error('Recipe not found');
    if (recipe.authorId !== userId) throw new Error('Not authorized to edit');
    Object.assign(recipe, update, { updatedAt: new Date() });
    return recipe;
  }

  // PUBLIC_INTERFACE
  deleteRecipe(id, userId) {
    /** Delete a recipe (must be author). */
    const idx = this.recipes.findIndex(r => r.id === id);
    if (idx === -1) throw new Error('Recipe not found');
    if (this.recipes[idx].authorId !== userId)
      throw new Error('Not authorized to delete');
    const deleted = this.recipes.splice(idx, 1)[0];
    return deleted;
  }
}

module.exports = new RecipeService();
