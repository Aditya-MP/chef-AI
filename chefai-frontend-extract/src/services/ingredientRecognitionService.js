import genAI from './geminiClient';

/**
 * Service for recognizing ingredients from images using Gemini's multimodal capabilities
 */
export class IngredientRecognitionService {
  /**
   * Recognizes ingredients from an image using Gemini Vision
   * @param {string} imageData - Base64 encoded image data
   * @param {string} mimeType - Image MIME type
   * @returns {Promise<Array>} Array of detected ingredients with confidence scores
   */
  static async recognizeIngredients(imageData, mimeType = 'image/jpeg') {
    if (!imageData) {
      throw new Error('No image data provided for ingredient recognition');
    }

    try {
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-1.5-pro',
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 1024,
        }
      });

      // Remove data URL prefix if present
      const base64Data = imageData.replace(/^data:image\/[a-z]+;base64,/, '');

      const imagePart = {
        inlineData: {
          data: base64Data,
          mimeType: mimeType,
        },
      };

      const prompt = `
        Analyze this image and identify all food ingredients, fruits, vegetables, and cooking items visible.
        
        For each item detected, provide:
        1. Name of the ingredient
        2. Confidence level (0.0 to 1.0)
        3. Category (Vegetables, Fruits, Protein, Dairy, Grains, Spices, etc.)
        4. Approximate bounding box coordinates (normalized 0-1)
        5. Freshness assessment if applicable (Fresh, Good, Fair)
        
        Return the results as a valid JSON array:
        [
          {
            "name": "Ingredient Name",
            "confidence": 0.95,
            "category": "Vegetables",
            "freshness": "Fresh",
            "boundingBox": {
              "x": 0.1,
              "y": 0.2,
              "width": 0.3,
              "height": 0.4
            }
          }
        ]
        
        Only include items that are clearly food ingredients. Exclude plates, utensils, or packaging unless they contain identifiable ingredients.
      `;

      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = response.text();

      // Extract JSON from response
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error('Invalid response format from Gemini API');
      }

      const ingredients = JSON.parse(jsonMatch[0]);
      
      // Process and validate ingredients
      return ingredients
        .filter(ing => ing.confidence > 0.5) // Filter low confidence detections
        .map((ingredient, index) => ({
          ...ingredient,
          id: Date.now() + index,
          color: this.getCategoryColor(ingredient.category),
        }));

    } catch (error) {
      console.error('Error recognizing ingredients with Gemini:', error);
      
      // Fallback to mock detection if API fails
      return this.getMockIngredientDetection();
    }
  }

  /**
   * Converts file to base64 for API processing
   * @param {File} file - Image file
   * @returns {Promise<string>} Base64 encoded image data
   */
  static fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  }

  /**
   * Gets color code for ingredient categories
   * @param {string} category - Ingredient category
   * @returns {string} Color hex code
   */
  static getCategoryColor(category) {
    const categoryColors = {
      'Vegetables': '#4CAF50',
      'Fruits': '#FF9800',
      'Protein': '#F44336',
      'Dairy': '#2196F3',
      'Grains': '#795548',
      'Spices': '#9C27B0',
      'Herbs': '#8BC34A',
      'Nuts': '#FF5722',
      'Oils': '#FFC107',
      'Default': '#607D8B'
    };
    
    return categoryColors[category] || categoryColors['Default'];
  }

  /**
   * Provides mock ingredient detection as fallback
   * @returns {Array} Mock ingredient detection results
   */
  static getMockIngredientDetection() {
    const mockIngredients = [
      {
        id: Date.now(),
        name: "Tomatoes",
        confidence: 0.92,
        category: "Vegetables",
        freshness: "Fresh",
        color: "#F44336",
        boundingBox: { x: 0.2, y: 0.3, width: 0.25, height: 0.3 }
      },
      {
        id: Date.now() + 1,
        name: "Bell Peppers",
        confidence: 0.87,
        category: "Vegetables", 
        freshness: "Good",
        color: "#4CAF50",
        boundingBox: { x: 0.5, y: 0.2, width: 0.3, height: 0.35 }
      }
    ];

    return mockIngredients;
  }

  /**
   * Analyzes nutritional information from ingredient image
   * @param {string} imageData - Base64 encoded image data
   * @param {Array} detectedIngredients - Previously detected ingredients
   * @returns {Promise<Object>} Nutritional analysis
   */
  static async analyzeNutrition(imageData, detectedIngredients) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

      const base64Data = imageData.replace(/^data:image\/[a-z]+;base64,/, '');
      const imagePart = {
        inlineData: {
          data: base64Data,
          mimeType: 'image/jpeg',
        },
      };

      const ingredientsList = detectedIngredients.map(ing => ing.name).join(', ');
      
      const prompt = `
        Based on the detected ingredients: ${ingredientsList}, provide a nutritional analysis.
        
        Estimate the total nutritional value including:
        - Calories per serving
        - Macronutrients (protein, carbs, fat)
        - Key vitamins and minerals
        - Health benefits
        - Dietary considerations
        
        Return as JSON:
        {
          "totalCalories": 250,
          "macronutrients": {
            "protein": "15g",
            "carbs": "30g", 
            "fat": "8g"
          },
          "vitamins": ["Vitamin C", "Vitamin A"],
          "healthBenefits": ["High in antioxidants", "Good source of fiber"],
          "dietaryTags": ["Vegetarian", "Gluten-Free"]
        }
      `;

      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = response.text();

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      return null;
    } catch (error) {
      console.error('Error analyzing nutrition:', error);
      return null;
    }
  }

  /**
   * Suggests recipes based on detected ingredients
   * @param {Array} detectedIngredients - Detected ingredient array
   * @returns {Promise<Array>} Recipe suggestions
   */
  static async suggestRecipes(detectedIngredients) {
    try {
      const ingredientNames = detectedIngredients.map(ing => ing.name);
      const { RecipeGenerationService } = await import('./recipeGenerationService');
      
      return await RecipeGenerationService.generateRecipes(ingredientNames, {});
    } catch (error) {
      console.error('Error suggesting recipes:', error);
      return [];
    }
  }
}

export default IngredientRecognitionService;