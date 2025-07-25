import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  instructions: [{ type: String, required: true }],
  cookingTime: { type: Number, required: true },
  servings: { type: Number, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  cuisine: { type: String, required: true },
  image: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isPublic: { type: Boolean, default: true },
  tags: [{ type: String }],
  nutrition: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number
  }
}, { timestamps: true });

export default mongoose.model('Recipe', recipeSchema);
