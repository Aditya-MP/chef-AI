import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Favorites() {
  const { currentUser } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      // Get user profile to get favorites array
      const profileResponse = await fetch('/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${currentUser.token}`
        }
      });
      const profileData = await profileResponse.json();
      
      if (profileData.favorites && profileData.favorites.length > 0) {
        // Fetch recipe details for each favorite
        const recipePromises = profileData.favorites.map(recipeId =>
          fetch(`/api/recipes/${recipeId}`, {
            headers: {
              'Authorization': `Bearer ${currentUser.token}`
            }
          }).then(res => res.json())
        );
        
        const recipes = await Promise.all(recipePromises);
        setFavorites(recipes.filter(recipe => recipe && !recipe.message)); // Filter out errors
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (recipeId) => {
    try {
      await fetch(`/api/recipes/${recipeId}/favorite`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${currentUser.token}`
        }
      });
      // Remove from local state
      setFavorites(prev => prev.filter(recipe => recipe._id !== recipeId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="text-center">
          <div className="skeleton-warm w-32 h-8 rounded mb-4 mx-auto"></div>
          <div className="text-hierarchy-secondary" style={{ color: 'var(--color-muted-foreground)' }}>
            Loading your favorite recipes...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-foreground)' }}>
            My Favorite Recipes
          </h1>
          <p className="text-hierarchy-secondary" style={{ color: 'var(--color-muted-foreground)' }}>
            Your collection of saved recipes
          </p>
        </div>
        
        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <div className="shadow-warm-md rounded-lg p-12" style={{ backgroundColor: 'var(--color-card)' }}>
              <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-muted)' }}>
                <svg className="w-12 h-12" style={{ color: 'var(--color-muted-foreground)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-foreground)' }}>
                No favorites yet
              </h3>
              <p className="text-hierarchy-secondary mb-6" style={{ color: 'var(--color-muted-foreground)' }}>
                Start exploring recipes and save your favorites by clicking the heart icon!
              </p>
              <button
                onClick={() => window.location.href = '/ai-generator'}
                className="px-6 py-3 rounded-lg font-medium transition-smooth"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-primary-foreground)'
                }}
              >
                Generate Your First Recipe
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((recipe) => (
              <div key={recipe._id} className="shadow-warm-md rounded-lg overflow-hidden transition-smooth hover:shadow-warm-lg" style={{ backgroundColor: 'var(--color-card)' }}>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold" style={{ color: 'var(--color-foreground)' }}>
                      {recipe.title}
                    </h3>
                    <button
                      onClick={() => removeFavorite(recipe._id)}
                      className="p-2 rounded-full transition-smooth hover:bg-opacity-75"
                      style={{ color: 'var(--color-destructive)' }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  
                  <p className="text-hierarchy-secondary mb-4" style={{ color: 'var(--color-muted-foreground)' }}>
                    {recipe.description || 'A delicious recipe to try'}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
                    <span>
                      {recipe.difficulty || 'Medium'} • {recipe.totalTime || '30'} min
                    </span>
                    <span className="font-caption">
                      {recipe.servings || 4} servings
                    </span>
                  </div>
                  
                  {recipe.tags && recipe.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {recipe.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: 'var(--color-accent)',
                            color: 'var(--color-accent-foreground)'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
