import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import RecipeGenerationService from '../../../services/recipeGenerationService';

const RecipeGenerationPanel = ({ 
  selectedIngredients = [], 
  dietaryFilters = {},
  onRecipeSelect,
  className = ""
}) => {
  const navigate = useNavigate();
  const [generatedRecipes, setGeneratedRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState(new Set());
  const [error, setError] = useState(null);

  // Generate recipes using Gemini AI
  const generateRecipes = async (ingredients, filters) => {
    if (!ingredients || ingredients.length === 0) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const recipes = await RecipeGenerationService.generateRecipes(ingredients, filters);
      setGeneratedRecipes(recipes);
    } catch (error) {
      console.error('Failed to generate recipes:', error);
      setError('Failed to generate recipes. Please check your API key and try again.');
      setGeneratedRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  // Generate recipes when ingredients change
  useEffect(() => {
    if (selectedIngredients.length > 0) {
      generateRecipes(selectedIngredients, dietaryFilters);
    } else {
      setGeneratedRecipes([]);
      setError(null);
    }
  }, [selectedIngredients, dietaryFilters]);

  const handleFavoriteToggle = (recipeId) => {
    const newFavorites = new Set(favoriteRecipes);
    if (newFavorites.has(recipeId)) {
      newFavorites.delete(recipeId);
    } else {
      newFavorites.add(recipeId);
    }
    setFavoriteRecipes(newFavorites);
  };

  const handleRecipeClick = (recipe) => {
    if (onRecipeSelect) {
      onRecipeSelect(recipe);
    } else {
      navigate('/full-screen-recipe-view', {
        state: { 
          recipeId: recipe.id, 
          recipeName: recipe.name,
          recipeData: recipe
        }
      });
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'text-success bg-success/10';
      case 'medium':
        return 'text-warning bg-warning/10';
      case 'hard':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-card rounded-lg border border-border p-4">
          <div className="skeleton-warm h-6 w-3/4 mb-3 rounded"></div>
          <div className="skeleton-warm h-4 w-full mb-2 rounded"></div>
          <div className="skeleton-warm h-4 w-2/3 mb-4 rounded"></div>
          <div className="flex space-x-2">
            <div className="skeleton-warm h-6 w-16 rounded-full"></div>
            <div className="skeleton-warm h-6 w-20 rounded-full"></div>
          </div>
        </div>
      ))}
      <div className="text-center py-4">
        <div className="flex items-center justify-center space-x-2 text-primary">
          <Icon name="Sparkles" size={20} className="animate-pulse" />
          <span className="text-sm font-medium">Generating recipes with AI...</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`bg-card rounded-lg border border-border shadow-warm h-full flex flex-col ${className}`}>
      {/* Panel Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-heading font-semibold text-foreground">
            AI Generated Recipes
          </h2>
          {generatedRecipes.length > 0 && (
            <div className="flex items-center space-x-2">
              <Icon name="Sparkles" size={20} className="text-primary" />
              <span className="text-sm font-caption text-muted-foreground">
                {generatedRecipes.length} recipes generated
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {selectedIngredients.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="ChefHat" size={64} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-heading font-medium text-foreground mb-2">
              Ready to Cook with AI?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              Select ingredients from the left panel to generate personalized recipes using Google Gemini AI.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="Sparkles" size={16} />
                <span>AI-powered</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={16} />
                <span>Real-time generation</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Heart" size={16} />
                <span>Personalized</span>
              </div>
            </div>
          </div>
        ) : loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <div className="text-center py-12">
            <Icon name="AlertCircle" size={48} className="text-error mx-auto mb-3" />
            <h3 className="font-medium text-foreground mb-2">Generation Failed</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-sm mx-auto">
              {error}
            </p>
            <Button
              variant="outline"
              onClick={() => generateRecipes(selectedIngredients, dietaryFilters)}
              iconName="RefreshCw"
              iconPosition="left"
            >
              Try Again
            </Button>
          </div>
        ) : generatedRecipes.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-3" />
            <h3 className="font-medium text-foreground mb-1">No recipes generated</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your dietary filters or selecting different ingredients
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {generatedRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-background rounded-lg border border-border hover:border-primary/50 hover:shadow-warm-md cursor-pointer transition-smooth group"
                onClick={() => handleRecipeClick(recipe)}
              >
                {/* Recipe Header */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-heading font-medium text-foreground group-hover:text-primary transition-quick mb-1">
                        {recipe.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {recipe.description}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFavoriteToggle(recipe.id);
                      }}
                      className="ml-2"
                    >
                      <Icon 
                        name="Heart" 
                        size={18} 
                        className={`transition-quick ${
                          favoriteRecipes.has(recipe.id) 
                            ? 'text-error fill-current' : 'text-muted-foreground group-hover:text-error'
                        }`}
                      />
                    </Button>
                  </div>

                  {/* Recipe Meta */}
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} className="text-muted-foreground" />
                      <span className="text-sm font-mono text-muted-foreground">
                        {recipe.cookTime}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={14} className="text-muted-foreground" />
                      <span className="text-sm font-mono text-muted-foreground">
                        {recipe.servings} servings
                      </span>
                    </div>
                    
                    <span className={`
                      px-2 py-1 text-xs rounded-full font-caption
                      ${getDifficultyColor(recipe.difficulty)}
                    `}>
                      {recipe.difficulty}
                    </span>
                    
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={14} className="text-secondary fill-current" />
                      <span className="text-sm font-mono text-muted-foreground">
                        {recipe.rating}
                      </span>
                    </div>
                  </div>

                  {/* Recipe Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {recipe.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-full font-caption"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Ingredients Preview */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-foreground mb-2">
                      Key Ingredients:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {recipe.ingredients?.slice(0, 4).map((ingredient, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-primary/10 text-primary rounded font-caption"
                        >
                          {ingredient.name}
                        </span>
                      ))}
                      {recipe.ingredients?.length > 4 && (
                        <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded font-caption">
                          +{recipe.ingredients.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{recipe.calories} calories</span>
                      <span>{recipe.steps?.length || 0} steps</span>
                      {recipe.cuisine && <span>{recipe.cuisine}</span>}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="ChevronRight"
                      iconPosition="right"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRecipeClick(recipe);
                      }}
                    >
                      View Recipe
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Panel Footer */}
      {generatedRecipes.length > 0 && (
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Sparkles" size={16} className="text-primary" />
              <span className="text-sm text-muted-foreground">
                Powered by Google Gemini AI
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="RefreshCw"
              iconPosition="left"
              onClick={() => generateRecipes(selectedIngredients, dietaryFilters)}
              disabled={loading}
            >
              Regenerate
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeGenerationPanel;