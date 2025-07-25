import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const RecipeCollectionTabs = ({ 
  className = "",
  onRecipeSelect = null 
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('recent');
  const [loading, setLoading] = useState(false);

  // Mock recent recipes data
  const recentRecipes = [
    {
      id: 1,
      name: "Creamy Mushroom Risotto",
      time: "2 hours ago",
      cookTime: "35 min",
      difficulty: "Medium",
      rating: 4.5,
      image: "/assets/images/recipes/mushroom-risotto.jpg"
    },
    {
      id: 2,
      name: "Spicy Thai Basil Chicken",
      time: "1 day ago",
      cookTime: "25 min",
      difficulty: "Easy",
      rating: 4.8,
      image: "/assets/images/recipes/thai-basil-chicken.jpg"
    },
    {
      id: 3,
      name: "Mediterranean Quinoa Bowl",
      time: "2 days ago",
      cookTime: "20 min",
      difficulty: "Easy",
      rating: 4.3,
      image: "/assets/images/recipes/quinoa-bowl.jpg"
    },
    {
      id: 4,
      name: "Classic Beef Stroganoff",
      time: "3 days ago",
      cookTime: "45 min",
      difficulty: "Hard",
      rating: 4.7,
      image: "/assets/images/recipes/beef-stroganoff.jpg"
    }
  ];

  // Mock favorite recipes data
  const favoriteRecipes = [
    {
      id: 5,
      name: "Lemon Herb Salmon",
      saved: "Last week",
      cookTime: "30 min",
      difficulty: "Medium",
      rating: 4.9,
      image: "/assets/images/recipes/lemon-salmon.jpg"
    },
    {
      id: 6,
      name: "Vegetarian Pad Thai",
      saved: "2 weeks ago",
      cookTime: "20 min",
      difficulty: "Easy",
      rating: 4.4,
      image: "/assets/images/recipes/pad-thai.jpg"
    },
    {
      id: 7,
      name: "Homemade Pizza Margherita",
      saved: "1 month ago",
      cookTime: "40 min",
      difficulty: "Medium",
      rating: 4.6,
      image: "/assets/images/recipes/pizza-margherita.jpg"
    },
    {
      id: 8,
      name: "Chocolate Lava Cake",
      saved: "1 month ago",
      cookTime: "25 min",
      difficulty: "Hard",
      rating: 4.8,
      image: "/assets/images/recipes/lava-cake.jpg"
    }
  ];

  const tabs = [
    {
      id: 'recent',
      label: 'Recent Recipes',
      icon: 'Clock',
      count: recentRecipes.length
    },
    {
      id: 'favorites',
      label: 'Favorite Recipes',
      icon: 'Heart',
      count: favoriteRecipes.length
    }
  ];

  const getCurrentRecipes = () => {
    return activeTab === 'recent' ? recentRecipes : favoriteRecipes;
  };

  const handleRecipeClick = async (recipe) => {
    setLoading(true);
    
    try {
      if (onRecipeSelect) {
        await onRecipeSelect(recipe);
      } else {
        navigate('/full-screen-recipe-view', {
          state: { 
            recipeId: recipe.id, 
            recipeName: recipe.name,
            recipeData: recipe
          }
        });
      }
    } catch (error) {
      console.error('Error selecting recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = (recipeId, event) => {
    event.stopPropagation();
    // Toggle favorite logic would be implemented here
    console.log('Toggle favorite for recipe:', recipeId);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
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

  return (
    <div className={`bg-card rounded-lg border border-border shadow-warm ${className}`}>
      {/* Tab Headers */}
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-quick
              ${activeTab === tab.id
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }
            `}
          >
            <Icon name={tab.icon} size={16} />
            <span>{tab.label}</span>
            <span className={`
              px-2 py-0.5 text-xs rounded-full font-caption
              ${activeTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
              }
            `}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton-warm h-20 rounded-lg"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {getCurrentRecipes().map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => handleRecipeClick(recipe)}
                className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-quick group"
              >
                {/* Recipe Image */}
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                  <Icon 
                    name="ChefHat" 
                    size={24} 
                    className="text-muted-foreground group-hover:text-primary transition-quick"
                  />
                </div>

                {/* Recipe Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground truncate group-hover:text-primary transition-quick">
                    {recipe.name}
                  </h4>
                  
                  <div className="flex items-center space-x-3 mt-1">
                    <span className="text-xs font-caption text-muted-foreground">
                      {activeTab === 'recent' ? recipe.time : `Saved ${recipe.saved}`}
                    </span>
                    
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} className="text-muted-foreground" />
                      <span className="text-xs font-mono text-muted-foreground">
                        {recipe.cookTime}
                      </span>
                    </div>
                    
                    <span className={`
                      px-2 py-0.5 text-xs rounded-full font-caption
                      ${getDifficultyColor(recipe.difficulty)}
                    `}>
                      {recipe.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 mt-2">
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={12} className="text-secondary fill-current" />
                      <span className="text-xs font-mono text-muted-foreground">
                        {recipe.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => handleFavoriteToggle(recipe.id, e)}
                    className="opacity-0 group-hover:opacity-100 transition-quick"
                    aria-label="Toggle favorite"
                  >
                    <Icon 
                      name="Heart" 
                      size={16} 
                      className={activeTab === 'favorites' ? 'text-error fill-current' : 'text-muted-foreground'}
                    />
                  </Button>
                  
                  <Icon 
                    name="ChevronRight" 
                    size={16} 
                    className="text-muted-foreground group-hover:text-primary transition-quick"
                  />
                </div>
              </div>
            ))}

            {getCurrentRecipes().length === 0 && (
              <div className="text-center py-8">
                <Icon 
                  name={activeTab === 'recent' ? 'Clock' : 'Heart'} 
                  size={48} 
                  className="text-muted-foreground mx-auto mb-3"
                />
                <h3 className="font-medium text-foreground mb-1">
                  No {activeTab === 'recent' ? 'Recent' : 'Favorite'} Recipes
                </h3>
                <p className="text-sm text-muted-foreground">
                  {activeTab === 'recent' ?'Start cooking to see your recent recipes here' :'Save recipes you love to access them quickly'
                  }
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCollectionTabs;