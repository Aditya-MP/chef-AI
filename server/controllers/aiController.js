import axios from 'axios';

// @desc    Generate recipe using AI
// @route   POST /api/ai/generate
export const generateRecipe = async (req, res) => {
  const { ingredients, cuisine, diet } = req.body;
  
  try {
    // Check if API key is available
    if (!process.env.GEMINI_API_KEY) {
      // Fallback to mock recipe generation for testing
      const mockRecipe = generateMockRecipe(ingredients, cuisine, diet);
      return res.json({ recipe: mockRecipe });
    }

    // Using Gemini API for generation
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: `Create a detailed recipe using these ingredients: ${ingredients.join(', ')}. 
            Cuisine: ${cuisine || 'any'}, Diet: ${diet || 'regular'}. 
            Include preparation time, cooking time, servings, and step-by-step instructions.`
          }]
        }]
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
    
    const recipeText = response.data.candidates[0].content.parts[0].text;
    res.json({ recipe: recipeText });
  } catch (error) {
    console.error('AI generation error:', error.response?.data || error.message);
    // Fallback to mock recipe on API error
    const mockRecipe = generateMockRecipe(ingredients, cuisine, diet);
    res.json({ recipe: mockRecipe });
  }
};

// Mock recipe generator for testing
const generateMockRecipe = (ingredients, cuisine, diet) => {
  const mainIngredient = ingredients[0] || 'mixed vegetables';
  const cuisineType = cuisine || 'fusion';
  const dietType = diet || 'regular';
  
  return `# ${cuisineType.charAt(0).toUpperCase() + cuisineType.slice(1)} ${mainIngredient.charAt(0).toUpperCase() + mainIngredient.slice(1)} Recipe

## Ingredients:
${ingredients.map(ing => `- ${ing}`).join('\n')}
- Salt and pepper to taste
- 2 tbsp olive oil
- 1 onion, diced
- 2 cloves garlic, minced

## Instructions:

**Prep Time:** 15 minutes  
**Cook Time:** 25 minutes  
**Servings:** 4

1. **Prepare ingredients:** Wash and chop all vegetables. Dice the onion and mince the garlic.

2. **Heat oil:** In a large pan, heat olive oil over medium heat.

3. **Sauté aromatics:** Add diced onion and cook for 3-4 minutes until translucent. Add minced garlic and cook for another minute.

4. **Add main ingredients:** Add ${mainIngredient} and other ingredients to the pan. Season with salt and pepper.

5. **Cook:** Stir frequently and cook for 15-20 minutes until everything is tender and well combined.

6. **Final seasoning:** Taste and adjust seasoning as needed.

7. **Serve:** Serve hot as a main dish or side dish.

**Chef's Note:** This ${dietType} ${cuisineType} recipe is perfect for using up fresh ingredients and can be easily customized to your taste preferences.

**Nutritional Benefits:** Rich in vitamins and minerals from fresh ingredients, this dish provides a healthy and satisfying meal option.`;
};

// @desc    Identify ingredients from image
// @route   POST /api/ai/identify
export const identifyIngredients = async (req, res) => {
  const { imageUrl } = req.body;
  
  try {
    // Using Google Cloud Vision API
    const response = await axios.post(
      `https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_VISION_API_KEY}`,
      {
        requests: [{
          image: { source: { imageUri: imageUrl } },
          features: [{ type: 'LABEL_DETECTION', maxResults: 10 }]
        }]
      }
    );
    
    const ingredients = response.data.responses[0].labelAnnotations
      .map(label => label.description)
      .filter(label => !label.match(/dish|food|meal|cuisine/i));
    
    res.json({ ingredients });
  } catch (error) {
    console.error('Vision API error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Ingredient identification failed' });
  }
};

// @desc    Get nutritional info
// @desc    POST /api/ai/nutrition
export const getNutritionInfo = async (req, res) => {
  const { ingredient } = req.body;
  
  try {
    // Using USDA FoodData Central API
    const response = await axios.get(
      `https://api.nal.usda.gov/fdc/v1/foods/search`,
      {
        params: {
          api_key: process.env.USDA_API_KEY,
          query: ingredient,
          dataType: ["Foundation"]
        }
      }
    );
    
    if (response.data.foods.length > 0) {
      const food = response.data.foods[0];
      const nutrients = {};
      
      food.foodNutrients.forEach(nutrient => {
        nutrients[nutrient.nutrientName] = `${nutrient.value} ${nutrient.unitName}`;
      });
      
      res.json({
        name: food.description,
        nutrients
      });
    } else {
      res.status(404).json({ message: 'Nutrition data not found' });
    }
  } catch (error) {
    console.error('USDA API error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Nutrition lookup failed' });
  }
};
