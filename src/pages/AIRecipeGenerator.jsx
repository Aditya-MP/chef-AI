import React, { useState } from 'react';
import { generateRecipe } from '../api/apiClean';

export default function AIRecipeGenerator() {
  const [ingredients, setIngredients] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [diet, setDiet] = useState('');
  const [generatedRecipe, setGeneratedRecipe] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ingredients.trim()) return;
    
    try {
      setLoading(true);
      setError('');
      const ingredientsArray = ingredients.split(',').map(i => i.trim());
      
      const response = await generateRecipe({
        ingredients: ingredientsArray,
        cuisine: cuisine.trim() || undefined,
        diet: diet.trim() || undefined
      });
      
      setGeneratedRecipe(response.data.recipe);
    } catch (err) {
      setError('Failed to generate recipe. Please try again.');
      console.error('AI generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">AI Recipe Generator</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ingredients (comma separated)
          </label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., chicken, broccoli, rice, garlic"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cuisine (optional)
            </label>
            <input
              type="text"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Italian, Asian, Mexican"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dietary Preference (optional)
            </label>
            <input
              type="text"
              value={diet}
              onChange={(e) => setDiet(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., vegetarian, keto, gluten-free"
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
        >
          {loading ? 'Generating...' : 'Generate Recipe'}
        </button>
      </form>
      
      {generatedRecipe && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Generated Recipe</h2>
          <div className="prose max-w-none">
            {generatedRecipe.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
