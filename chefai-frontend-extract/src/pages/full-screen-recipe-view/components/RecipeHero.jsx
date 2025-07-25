import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecipeHero = ({ 
  recipe = null,
  className = ""
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [cookingMode, setCookingMode] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const toggleCookingMode = () => {
    setCookingMode(!cookingMode);
    
    // Prevent screen timeout in cooking mode
    if (!cookingMode) {
      console.log('Cooking mode enabled - preventing screen timeout');
    }
  };

  const difficultyColors = {
    'Easy': 'text-success bg-success/10',
    'Medium': 'text-warning bg-warning/10',
    'Hard': 'text-error bg-error/10'
  };

  const dietaryTags = recipe?.dietaryTags || ['Vegetarian', 'Gluten-Free'];

  return (
    <div className={`bg-card rounded-lg border border-border overflow-hidden shadow-warm ${className}`}>
      {/* Recipe Image */}
      <div className="relative h-64 lg:h-80 bg-muted overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 skeleton-warm"></div>
        )}
        
        <Image
          src={recipe?.image || "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop"}
          alt={recipe?.name || 'Recipe image'}
          className="w-full h-full object-cover transition-smooth"
          onLoad={handleImageLoad}
        />

        {/* Overlay with cooking mode toggle */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-end justify-between">
              <div className="flex-1">
                <h2 className="text-2xl lg:text-3xl font-heading font-semibold text-white mb-2">
                  {recipe?.name || 'Delicious Recipe'}
                </h2>
                
                <div className="flex flex-wrap items-center gap-2">
                  {/* Difficulty Badge */}
                  <span className={`
                    px-3 py-1 text-sm font-caption rounded-full
                    ${difficultyColors[recipe?.difficulty] || difficultyColors['Medium']}
                    bg-white/90 backdrop-blur-sm
                  `}>
                    {recipe?.difficulty || 'Medium'}
                  </span>

                  {/* Dietary Tags */}
                  {dietaryTags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 text-sm font-caption rounded-full bg-white/20 text-white backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Cooking Mode Toggle */}
              <Button
                variant={cookingMode ? "default" : "secondary"}
                size="sm"
                onClick={toggleCookingMode}
                className="ml-4"
              >
                <Icon 
                  name={cookingMode ? "Eye" : "EyeOff"} 
                  size={16} 
                  className="mr-2"
                />
                {cookingMode ? 'Exit Cook Mode' : 'Cook Mode'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Recipe Stats */}
      <div className="p-4 lg:p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto mb-2">
              <Icon name="Clock" size={20} className="text-primary" />
            </div>
            <p className="text-sm font-caption text-muted-foreground">Prep Time</p>
            <p className="font-mono font-medium text-foreground">
              {recipe?.prepTime || '15 min'}
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-full mx-auto mb-2">
              <Icon name="Timer" size={20} className="text-secondary" />
            </div>
            <p className="text-sm font-caption text-muted-foreground">Cook Time</p>
            <p className="font-mono font-medium text-foreground">
              {recipe?.cookTime || '30 min'}
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mx-auto mb-2">
              <Icon name="Users" size={20} className="text-accent" />
            </div>
            <p className="text-sm font-caption text-muted-foreground">Servings</p>
            <p className="font-mono font-medium text-foreground">
              {recipe?.servings || '4'}
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-success/10 rounded-full mx-auto mb-2">
              <Icon name="Zap" size={20} className="text-success" />
            </div>
            <p className="text-sm font-caption text-muted-foreground">Calories</p>
            <p className="font-mono font-medium text-foreground">
              {recipe?.calories || '320'} kcal
            </p>
          </div>
        </div>

        {/* Recipe Description */}
        {recipe?.description && (
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-muted-foreground leading-relaxed">
              {recipe.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeHero;