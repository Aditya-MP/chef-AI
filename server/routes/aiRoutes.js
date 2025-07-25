import express from 'express';
import {
  generateRecipe,
  identifyIngredients,
  getNutritionInfo
} from '../controllers/aiController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/generate', protect, generateRecipe);
router.post('/identify', protect, identifyIngredients);
router.post('/nutrition', protect, getNutritionInfo);

export default router;
