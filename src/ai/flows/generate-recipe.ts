// src/ai/flows/generate-recipe.ts
'use server';

/**
 * @fileOverview Generates recipe cards based on selected ingredients and dietary filters, suggesting alternative ingredients if needed.
 *
 * - generateRecipe - A function that generates recipe cards with AI suggestions.
 * - GenerateRecipeInput - The input type for the generateRecipe function.
 * - GenerateRecipeOutput - The return type for the generateRecipe function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRecipeInputSchema = z.object({
  ingredients: z
    .array(z.string())
    .describe('A list of selected ingredients for the recipe.'),
  vegetarian: z.boolean().optional().describe('Whether the recipe should be vegetarian.'),
  vegan: z.boolean().optional().describe('Whether the recipe should be vegan.'),
  glutenFree: z.boolean().optional().describe('Whether the recipe should be gluten-free.'),
  highProtein: z.boolean().optional().describe('Whether the recipe should be high in protein.'),
});

export type GenerateRecipeInput = z.infer<typeof GenerateRecipeInputSchema>;

const GenerateRecipeOutputSchema = z.object({
  recipeName: z.string().describe('The name of the generated recipe.'),
  steps: z.array(z.string()).describe('The cooking steps for the recipe.'),
  requiredIngredients: z
    .array(z.string())
    .describe('The list of required ingredients for the recipe.'),
  alternativeSuggestions: z
    .array(z.string())
    .describe('Suggestions for alternative ingredients if any are missing or rare.'),
});

export type GenerateRecipeOutput = z.infer<typeof GenerateRecipeOutputSchema>;

export async function generateRecipe(input: GenerateRecipeInput): Promise<GenerateRecipeOutput> {
  return generateRecipeFlow(input);
}

const generateRecipePrompt = ai.definePrompt({
  name: 'generateRecipePrompt',
  input: {schema: GenerateRecipeInputSchema},
  output: {schema: GenerateRecipeOutputSchema},
  prompt: `You are a world-class chef, skilled at creating delicious recipes based on available ingredients and dietary restrictions.

  Based on the following ingredients and dietary filters, generate a recipe.

  Ingredients: {{ingredients}}
  Vegetarian: {{vegetarian}}
  Vegan: {{vegan}}
  Gluten-Free: {{glutenFree}}
  High Protein: {{highProtein}}

  If any selected ingredient is missing or rare, suggest an alternative ingredient.
  Only use available ingredients and clearly indicate substitutions.
  Return the recipe name, a list of steps, a list of required ingredients, and suggestions for ingredient alternatives, in JSON format.
  Ensure that your response is valid JSON that can be parsed by Javascript's JSON.parse.
  Be concise in your response.
  `,
});

const generateRecipeFlow = ai.defineFlow(
  {
    name: 'generateRecipeFlow',
    inputSchema: GenerateRecipeInputSchema,
    outputSchema: GenerateRecipeOutputSchema,
  },
  async input => {
    const {output} = await generateRecipePrompt(input);
    return output!;
  }
);
