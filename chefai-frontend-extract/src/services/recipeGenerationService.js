import genAI from './geminiClient';

/**
 * Generates recipes using Gemini AI based on ingredients and dietary preferences
 */
export class RecipeGenerationService {
  /**
   * Generates recipes based on selected ingredients and dietary filters
   * @param {Array} ingredients - Array of ingredient objects
   * @param {Object} dietaryFilters - Dietary preference filters
   * @returns {Promise<Array>} Array of generated recipes
   */
  static async generateRecipes(ingredients, dietaryFilters = {}) {
    if (!ingredients || ingredients.length === 0) {
      throw new Error('No ingredients provided for recipe generation');
    }

    try {
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-1.5-flash',
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        }
      });

      const ingredientsList = ingredients.map(ing => ing.name || ing).join(', ');
      const dietaryRequirements = this.formatDietaryFilters(dietaryFilters);
      
      const prompt = `
        Create 3 unique, practical recipes using these ingredients: ${ingredientsList}
        
        Dietary requirements: ${dietaryRequirements}
        
        For each recipe, provide:
        1. Recipe name (creative but descriptive)
        2. Brief description (1-2 sentences)
        3. Cooking time in minutes
        4. Difficulty level (Easy/Medium/Hard)
        5. Number of servings
        6. Estimated calories per serving
        7. Complete ingredient list with measurements
        8. Step-by-step cooking instructions (6-8 steps)
        9. 3-4 relevant tags (e.g., Healthy, Quick, Comfort Food)
        10. Cuisine type if applicable

        Format the response as valid JSON array with this structure:
        [
          {
            "name": "Recipe Name",
            "description": "Brief description",
            "cookTime": "25 min",
            "difficulty": "Easy",
            "servings": 4,
            "calories": 320,
            "ingredients": [
              {"name": "ingredient", "amount": "1 cup", "category": "vegetable"}
            ],
            "steps": ["Step 1", "Step 2", ...],
            "tags": ["tag1", "tag2", "tag3"],
            "cuisine": "Mediterranean"
          }
        ]
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from response
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error('Invalid response format from Gemini API');
      }

      const recipes = JSON.parse(jsonMatch[0]);
      
      // Add generated IDs and additional processing
      return recipes.map((recipe, index) => ({
        ...recipe,
        id: Date.now() + index,
        rating: this.generateRating(),
        image: this.getRecipeImageUrl(recipe.name)
      }));

    } catch (error) {
      console.error('Error generating recipes with Gemini:', error);
      
      // Fallback to mock data if API fails
      return this.getFallbackRecipes(ingredients, dietaryFilters);
    }
  }

  /**
   * Formats dietary filters into readable requirements
   * @param {Object} filters - Dietary filter object
   * @returns {string} Formatted dietary requirements
   */
  static formatDietaryFilters(filters) {
    const requirements = [];
    
    if (filters.vegetarian) requirements.push('vegetarian');
    if (filters.vegan) requirements.push('vegan');
    if (filters.glutenFree) requirements.push('gluten-free');
    if (filters.dairyFree) requirements.push('dairy-free');
    if (filters.lowCarb) requirements.push('low-carb');
    if (filters.highProtein) requirements.push('high-protein');
    if (filters.lowCalorie) requirements.push('low-calorie');
    
    return requirements.length > 0 ? requirements.join(', ') : 'no specific dietary restrictions';
  }

  /**
   * Generates a realistic rating for the recipe
   * @returns {number} Rating between 4.0 and 5.0
   */
  static generateRating() {
    return parseFloat((Math.random() * 1 + 4).toFixed(1));
  }

  /**
   * Gets recipe image URL based on recipe name
   * @param {string} recipeName - Name of the recipe
   * @returns {string} Image URL
   */
  static getRecipeImageUrl(recipeName) {
    // Generate Unsplash URL based on recipe name
    const searchTerm = recipeName.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '%20');
    return `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&q=80&${searchTerm}`;
  }

  /**
   * Provides fallback recipes when API fails
   * @param {Array} ingredients - Available ingredients
   * @param {Object} dietaryFilters - Dietary preferences
   * @returns {Array} Fallback recipe array
   */
  static getFallbackRecipes(ingredients, dietaryFilters) {
    const fallbackRecipes = [
      {
        id: Date.now(),
        name: "Simple Ingredient Medley",
        description: "A quick and nutritious dish using your available ingredients.",
        cookTime: "20 min",
        difficulty: "Easy",
        servings: 4,
        calories: 280,
        rating: 4.5,
        ingredients: ingredients.slice(0, 6).map(ing => ({
          name: ing.name || ing,
          amount: "as needed",
          category: "mixed"
        })),
        steps: [
          "Prepare all ingredients by washing and chopping",
          "Heat oil in a large pan or wok",
          "Add harder vegetables first and cook for 3-4 minutes",
          "Add remaining ingredients and seasonings",
          "Cook until tender but still crisp",
          "Serve immediately while hot"
        ],
        tags: ["Quick", "Healthy", "Simple"],
        cuisine: "Fusion",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop"
      }
    ];

    return fallbackRecipes;
  }

  /**
   * Streams recipe generation for real-time updates
   * @param {Array} ingredients - Available ingredients
   * @param {Object} dietaryFilters - Dietary preferences
   * @param {Function} onChunk - Callback for streaming chunks
   */
  static async streamRecipeGeneration(ingredients, dietaryFilters, onChunk) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      
      const ingredientsList = ingredients.map(ing => ing.name || ing).join(', ');
      const dietaryRequirements = this.formatDietaryFilters(dietaryFilters);
      
      const prompt = `Generate a creative recipe using: ${ingredientsList}. Requirements: ${dietaryRequirements}`;
      
      const result = await model.generateContentStream(prompt);

      for await (const chunk of result.stream) {
        const text = chunk.text();
        if (text && onChunk) {
          onChunk(text);
        }
      }
    } catch (error) {
      console.error('Error in streaming recipe generation:', error);
      throw error;
    }
  }
}

export default RecipeGenerationService;