'use server';

/**
 * @fileOverview Recognizes ingredients from an image.
 *
 * - recognizeIngredient - A function that handles the ingredient recognition process.
 * - RecognizeIngredientInput - The input type for the recognizeIngredient function.
 * - RecognizeIngredientOutput - The return type for the recognizeIngredient function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecognizeIngredientInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of an ingredient, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type RecognizeIngredientInput = z.infer<typeof RecognizeIngredientInputSchema>;

const RecognizeIngredientOutputSchema = z.object({
  ingredientName: z.string().describe('The name of the recognized ingredient.'),
});
export type RecognizeIngredientOutput = z.infer<typeof RecognizeIngredientOutputSchema>;

export async function recognizeIngredient(input: RecognizeIngredientInput): Promise<RecognizeIngredientOutput> {
  return recognizeIngredientFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recognizeIngredientPrompt',
  input: {schema: RecognizeIngredientInputSchema},
  output: {schema: RecognizeIngredientOutputSchema},
  prompt: `You are an AI trained to recognize ingredients from images.

  Analyze the image provided and identify the ingredient.

  Return the name of the ingredient.

  Image: {{media url=photoDataUri}}`,
});

const recognizeIngredientFlow = ai.defineFlow(
  {
    name: 'recognizeIngredientFlow',
    inputSchema: RecognizeIngredientInputSchema,
    outputSchema: RecognizeIngredientOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
