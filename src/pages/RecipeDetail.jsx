import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRecipeById, toggleFavorite } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const { currentUser, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await getRecipeById(id);
        setRecipe(response.data);
        
        // Check if the recipe is in the user's favorites
        if (currentUser && currentUser.favorites) {
          setIsFavorite(currentUser.favorites.includes(id));
        }
      } catch (err) {
        setError('Failed to fetch recipe details');
        console.error('Recipe detail error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id, currentUser]);

  const handleFavoriteToggle = async () => {
    if (!isAuthenticated) {
      alert('Please login to add favorites');
      return;
    }
    
    try {
      await toggleFavorite(id);
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error('Favorite toggle error:', err);
      setError('Failed to update favorite');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <p>Recipe not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-4">
        <Link to="/" className="text-blue-600 hover:text-blue-800">
          &larr; Back to recipes
        </Link>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {recipe.image && (
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-96 object-cover"
          />
        )}
        
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{recipe.title}</h1>
            <button 
              onClick={handleFavoriteToggle}
              className="p-2 text-gray-400 hover:text-red-500"
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-6 w-6 ${isFavorite ? 'text-red-500 fill-current' : ''}`}
                fill={isFavorite ? "currentColor" : "none"}
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                />
              </svg>
            </button>
          </div>
          
          <p className="text-gray-600 mb-4">{recipe.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {recipe.tags?.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Prep Time</p>
              <p className="text-xl font-semibold">{recipe.prepTime} mins</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Cook Time</p>
              <p className="text-xl font-semibold">{recipe.cookTime} mins</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Servings</p>
              <p className="text-xl font-semibold">{recipe.servings}</p>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ingredients</h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 mt-1">•</span>
                  <span className="flex-1">
                    <span className="font-medium">{ingredient.quantity}</span> {ingredient.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Instructions</h2>
            <ol className="space-y-4">
              {recipe.instructions.map((step, index) => (
                <li key={index} className="flex">
                  <span className="mr-3 text-xl font-bold text-gray-700">{index + 1}.</span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
