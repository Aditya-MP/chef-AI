import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { currentUser } = useAuth();
  const [ingredients, setIngredients] = useState('');
  const [dietaryPreferences, setDietaryPreferences] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false
  });
  const [generatedRecipe, setGeneratedRecipe] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDietaryChange = (preference) => {
    setDietaryPreferences(prev => ({
      ...prev,
      [preference]: !prev[preference]
    }));
  };

  const generateRecipe = async () => {
    if (!ingredients.trim()) return;
    
    setLoading(true);
    try {
      const ingredientList = ingredients.split(',').map(ing => ing.trim()).filter(ing => ing);
      const dietFilters = Object.keys(dietaryPreferences).filter(key => dietaryPreferences[key]);
      
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`
        },
        body: JSON.stringify({
          ingredients: ingredientList,
          diet: dietFilters.join(', ') || 'regular'
        })
      });
      
      const data = await response.json();
      setGeneratedRecipe(data.recipe);
    } catch (error) {
      console.error('Recipe generation failed:', error);
      setGeneratedRecipe('Sorry, recipe generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-8" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-foreground)' }}>
            What's in your kitchen?
          </h1>
          <p className="text-hierarchy-secondary" style={{ color: 'var(--color-muted-foreground)' }}>
            Tell us what ingredients you have, and we'll create a delicious recipe for you!
          </p>
        </div>

        <div className="shadow-warm-md rounded-lg p-8 mb-8" style={{ backgroundColor: 'var(--color-card)' }}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-foreground)' }}>
                Available Ingredients
              </label>
              <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Enter ingredients separated by commas (e.g., chicken, rice, broccoli)"
                className="w-full px-4 py-3 rounded-lg border transition-quick text-hierarchy-primary"
                style={{
                  backgroundColor: 'var(--color-input)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-foreground)'
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-3" style={{ color: 'var(--color-foreground)' }}>
                Dietary Preferences
              </label>
              <div className="flex flex-wrap gap-4">
                {Object.entries(dietaryPreferences).map(([key, value]) => (
                  <label key={key} className="flex items-center space-x-2 cursor-pointer touch-target">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => handleDietaryChange(key)}
                      className="checkbox-scale rounded"
                      style={{ accentColor: 'var(--color-primary)' }}
                    />
                    <span className="text-sm font-medium capitalize" style={{ color: 'var(--color-foreground)' }}>
                      {key === 'glutenFree' ? 'Gluten-Free' : key}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={generateRecipe}
              disabled={loading || !ingredients.trim()}
              className="w-full py-3 px-6 rounded-lg font-medium transition-smooth touch-target disabled:opacity-50"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-primary-foreground)'
              }}
            >
              {loading ? 'Generating Recipe...' : 'Generate Recipe'}
            </button>
          </div>
        </div>

        {generatedRecipe && (
          <div className="shadow-warm-md rounded-lg p-8" style={{ backgroundColor: 'var(--color-card)' }}>
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-primary)' }}>
              Your Generated Recipe
            </h2>
            <div 
              className="prose max-w-none text-hierarchy-secondary"
              style={{ color: 'var(--color-foreground)' }}
            >
              <pre className="whitespace-pre-wrap font-sans">{generatedRecipe}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
