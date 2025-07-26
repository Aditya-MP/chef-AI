import React, { useState } from 'react';
import axios from 'axios';

export default function RecipeGenerator() {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setRecipe(null);
    setError('');
    try {
      // TheMealDB API: filter by ingredient
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`;
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
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI Recipe Generator</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={ingredients}
          onChange={e => setIngredients(e.target.value)}
          placeholder="Enter ingredients, comma separated"
          className="flex-1 px-3 py-2 border rounded"
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
        >
          {loading ? 'Generating...' : 'Generate Recipe'}
        </button>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {recipe && (
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-2">{recipe.strMeal}</h2>
          {recipe.strMealThumb && <img src={recipe.strMealThumb} alt={recipe.strMeal} className="mb-2 w-full max-w-xs" />}
          <p className="mb-2">{recipe.strInstructions}</p>
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
  );
}
