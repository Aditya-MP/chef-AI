import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon } from '@heroicons/react/24/outline';
import Button from '../ui/Button';

export default function RecipeCard({ recipe, onFavoriteToggle }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {recipe.image && (
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <Link to={`/recipe/${recipe._id}`} className="block">
            <h3 className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
              {recipe.title}
            </h3>
          </Link>
          <Button 
            variant="icon"
            onClick={() => onFavoriteToggle(recipe._id)}
            aria-label={recipe.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <HeartIcon 
              className={`w-6 h-6 ${recipe.isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`} 
            />
          </Button>
        </div>
        
        <p className="mt-2 text-gray-600 line-clamp-2">{recipe.description}</p>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {recipe.tags?.map(tag => (
            <span 
              key={tag} 
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500">
            {recipe.prepTime + recipe.cookTime} mins • {recipe.servings} servings
          </span>
          <span className="text-sm font-medium px-2 py-1 bg-gray-100 rounded">
            {recipe.difficulty}
          </span>
        </div>
      </div>
    </div>
  );
}
