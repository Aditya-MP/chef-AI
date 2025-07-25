import express from 'express';
import {
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipes,
  getRecipeById,
  toggleFavorite,
  addComment
} from '../controllers/recipeController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getRecipes)
  .post(protect, createRecipe);

router.route('/:id')
  .get(getRecipeById)
  .put(protect, updateRecipe)
  .delete(protect, deleteRecipe);

router.post('/:id/favorite', protect, toggleFavorite);
router.post('/:id/comments', protect, addComment);

export default router;
