import mongoose, { Schema, Document } from 'mongoose';

export interface IRecipe extends Document {
  userId: string;
  title: string;
  ingredients: string[];
  instructions: string;
  image?: string;
  createdAt: Date;
  isFavorite?: boolean;
}

const RecipeSchema: Schema = new Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  instructions: { type: String, required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  isFavorite: { type: Boolean, default: false },
});

export default mongoose.models.Recipe || mongoose.model<IRecipe>('Recipe', RecipeSchema);
