
import React, { useState } from 'react';
import axios from 'axios';

const INGREDIENT_CATEGORIES = {
  Protein: ['Chicken Breast', 'Salmon Fillet', 'Tofu', 'Eggs'],
  Grains: ['Quinoa', 'Whole Wheat Pasta', 'Rice', 'Oats'],
  Vegetables: ['Spinach', 'Broccoli', 'Carrots', 'Bell Pepper'],
};

const DIETARY_PREFERENCES = [
  { key: 'vegetarian', label: 'Vegetarian' },
  { key: 'vegan', label: 'Vegan' },
  { key: 'glutenFree', label: 'Gluten-Free' },
  { key: 'highProtein', label: 'High Protein' },
];

export default function RecipeGenerator() {
  const [selectedIngredients, setSelectedIngredients] = useState({});
  const [preferences, setPreferences] = useState({});
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle ingredient checkbox
  const handleIngredientChange = (category, ingredient) => {
    setSelectedIngredients(prev => {
      const cat = prev[category] || [];
      return {
        ...prev,
        [category]: cat.includes(ingredient)
          ? cat.filter(i => i !== ingredient)
          : [...cat, ingredient],
      };
    });
  };

  // Handle dietary preference checkbox
  const handlePreferenceChange = key => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Generate recipe using TheMealDB API
  const handleGenerate = async () => {
    setLoading(true);
    setRecipe(null);
    setError('');
    try {
      // Flatten selected ingredients
      const allIngredients = Object.values(selectedIngredients).flat().join(',');
      if (!allIngredients) {
        setError('Please select at least one ingredient.');
        setLoading(false);
        return;
      }
      // TheMealDB API: filter by ingredient
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${allIngredients}`;
      const res = await axios.get(url);
      if (res.data.meals && res.data.meals.length > 0) {
        // Get full recipe details for the first meal found
        const mealId = res.data.meals[0].idMeal;
        const detailRes = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        setRecipe(detailRes.data.meals[0]);
      } else {
        setRecipe(null);
        setError('No recipe found for these ingredients.');
      }
    } catch (err) {
      setError('Error fetching recipe.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">AI Recipe Generator</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Ingredient Selection */}
        <div className="bg-card rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Select Ingredients</h2>
          {Object.entries(INGREDIENT_CATEGORIES).map(([category, items]) => (
            <div key={category} className="mb-4">
              <h3 className="font-medium mb-2">{category}</h3>
              <div className="flex flex-wrap gap-3">
                {items.map(ingredient => (
                  <label key={ingredient} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedIngredients[category]?.includes(ingredient) || false}
                      onChange={() => handleIngredientChange(category, ingredient)}
                    />
                    <span>{ingredient}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <h3 className="font-medium mb-2 mt-4">Dietary Preferences</h3>
          <div className="flex flex-wrap gap-4 mb-4">
            {DIETARY_PREFERENCES.map(pref => (
              <label key={pref.key} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences[pref.key] || false}
                  onChange={() => handlePreferenceChange(pref.key)}
                />
                <span>{pref.label}</span>
              </label>
            ))}
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 mt-2"
          >
            {loading ? 'Generating...' : 'Generate Recipe'}
          </button>
          {error && <div className="text-red-500 mt-4">{error}</div>}
        </div>
        {/* Recipe Card */}
        <div>
          {recipe && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-2">{recipe.strMeal}</h2>
              {recipe.strMealThumb && <img src={recipe.strMealThumb} alt={recipe.strMeal} className="mb-4 w-full max-w-xs rounded" />}
              <div className="mb-2">
                <strong>Category:</strong> {recipe.strCategory} | <strong>Area:</strong> {recipe.strArea}
              </div>
              <div className="mb-2">
                <strong>Tags:</strong> {recipe.strTags || 'None'}
              </div>
              <div className="mb-2">
                <strong>Instructions:</strong>
                <p className="whitespace-pre-line mt-1">{recipe.strInstructions}</p>
              </div>
              <div className="mb-2">
                <strong>Ingredients:</strong>
                <ul className="list-disc ml-6">
                  {Array.from({ length: 20 }, (_, i) => i + 1)
                    .map(i => {
                      const ingredient = recipe[`strIngredient${i}`];
                      const measure = recipe[`strMeasure${i}`];
                      return ingredient && ingredient.trim() ? (
                        <li key={i}>{measure} {ingredient}</li>
                      ) : null;
                    })}
                </ul>
              </div>
              {recipe.strYoutube && (
                <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Watch on YouTube</a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
