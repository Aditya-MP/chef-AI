import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RecipeHeader from './components/RecipeHeader';
import RecipeHero from './components/RecipeHero';
import IngredientsList from './components/IngredientsList';
import CookingInstructions from './components/CookingInstructions';
import UserFeedback from './components/UserFeedback';
import NavigationBreadcrumbs from './components/NavigationBreadcrumbs';

const FullScreenRecipeView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cookingMode, setCookingMode] = useState(false);
  const [servings, setServings] = useState(4);
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState(null);

  // Get recipe data from navigation state or load default
  useEffect(() => {
    const loadRecipe = async () => {
      setLoading(true);
      
      try {
        // Get recipe data from navigation state
        const stateRecipe = location.state?.recipeData;
        const recipeId = location.state?.recipeId;
        const recipeName = location.state?.recipeName;

        // Mock recipe data (in real app, this would come from API)
        const mockRecipe = {
          id: recipeId || 1,
          name: recipeName || "Creamy Mushroom Risotto",
          description: `A luxurious and creamy Italian risotto featuring a medley of wild mushrooms, perfectly cooked Arborio rice, and finished with Parmesan cheese and fresh herbs. This restaurant-quality dish brings the authentic flavors of Northern Italy to your home kitchen.`,
          image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
          cookTime: "35 min",
          prepTime: "15 min",
          servings: 4,
          difficulty: "Medium",
          rating: 4.5,
          calories: 320,
          isFavorite: false,
          dietaryTags: ["Vegetarian", "Gluten-Free"],
          ingredients: [
            {
              id: 1,
              name: "Arborio rice",
              amount: 1.5,
              unit: "cups",
              category: "Grains",
              substitutions: ["Short-grain rice", "Carnaroli rice", "Bomba rice"]
            },
            {
              id: 2,
              name: "Mixed mushrooms",
              amount: 8,
              unit: "oz",
              category: "Vegetables",
              substitutions: ["Button mushrooms", "Shiitake mushrooms", "Portobello mushrooms"]
            },
            {
              id: 3,
              name: "Vegetable broth",
              amount: 4,
              unit: "cups",
              category: "Liquids",
              substitutions: ["Chicken broth", "Mushroom broth", "Water with bouillon"]
            },
            {
              id: 4,
              name: "White wine",
              amount: 0.5,
              unit: "cup",
              category: "Liquids",
              substitutions: ["White grape juice", "Additional broth", "Dry vermouth"]
            },
            {
              id: 5,
              name: "Parmesan cheese",
              amount: 0.75,
              unit: "cup",
              category: "Dairy",
              substitutions: ["Pecorino Romano", "Nutritional yeast", "Aged Gouda"]
            },
            {
              id: 6,
              name: "Heavy cream",
              amount: 0.25,
              unit: "cup",
              category: "Dairy",
              substitutions: ["Half-and-half", "Coconut cream", "Cashew cream"]
            },
            {
              id: 7,
              name: "Fresh thyme",
              amount: 2,
              unit: "tbsp",
              category: "Herbs",
              substitutions: ["Dried thyme (1 tsp)", "Fresh oregano", "Fresh rosemary"]
            },
            {
              id: 8,
              name: "Garlic cloves",
              amount: 3,
              unit: "cloves",
              category: "Aromatics",
              substitutions: ["Garlic powder (1 tsp)", "Shallots", "Garlic paste"]
            }
          ],
          instructions: [
            {
              id: 1,
              step: 1,
              title: "Prepare the ingredients",
              description: "Clean and slice the mushrooms. Mince the garlic. Measure out the Arborio rice and grate the Parmesan cheese.",
              duration: null,
              tips: "Pat mushrooms dry with paper towels for better browning."
            },
            {
              id: 2,
              step: 2,
              title: "Heat the broth",
              description: "In a medium saucepan, bring the vegetable broth to a gentle simmer over medium heat. Keep it warm throughout the cooking process.",
              duration: 5,
              tips: "Warm broth helps maintain the cooking temperature when added to the rice."
            },
            {
              id: 3,
              step: 3,
              title: "Sauté the mushrooms",
              description: "Heat 2 tablespoons of olive oil in a large, heavy-bottomed pan over medium-high heat. Add mushrooms and cook until golden brown and crispy.",
              duration: 8,
              tips: "Don't overcrowd the pan - cook mushrooms in batches if necessary."
            },
            {
              id: 4,
              step: 4,
              title: "Add aromatics",
              description: "Add minced garlic and fresh thyme to the mushrooms. Cook for another minute until fragrant. Season with salt and pepper.",
              duration: 1,
              tips: "Be careful not to burn the garlic - it can turn bitter quickly."
            },
            {
              id: 5,
              step: 5,
              title: "Toast the rice",
              description: "Add the Arborio rice to the pan and stir to coat with the oil and mushroom mixture. Toast for 2-3 minutes until the edges become translucent.",
              duration: 3,
              tips: "This step helps the rice maintain its texture and prevents it from becoming mushy."
            },
            {
              id: 6,
              step: 6,
              title: "Add wine and deglaze",
              description: "Pour in the white wine and stir constantly until it\'s almost completely absorbed. This should take about 2-3 minutes.",
              duration: 3,
              tips: "The wine adds depth of flavor and helps deglaze any browned bits from the pan."
            },
            {
              id: 7,
              step: 7,
              title: "Add broth gradually",
              description: "Add warm broth one ladle at a time, stirring constantly. Wait until each addition is almost absorbed before adding more. This process takes about 18-20 minutes.",
              duration: 20,
              tips: "Patience is key - don't rush this step. The constant stirring releases the rice's starch, creating the creamy texture."
            },
            {
              id: 8,
              step: 8,
              title: "Finish the risotto",
              description: "Remove from heat and stir in the heavy cream and grated Parmesan cheese. Season with salt and pepper to taste. The risotto should be creamy but still have a slight bite to the rice.",
              duration: null,
              tips: "Add the cream and cheese off the heat to prevent the mixture from becoming stringy."
            }
          ]
        };

        // Use only the passed recipe data if available, otherwise use mock data
        const finalRecipe = stateRecipe ? stateRecipe : mockRecipe;
        setRecipe(finalRecipe);
        setServings(finalRecipe.servings);

      } catch (error) {
        console.error('Error loading recipe:', error);
        // Fallback to default recipe
        navigate('/main-dashboard-with-dual-panel-layout');
      } finally {
        setLoading(false);
      }
    };

    loadRecipe();
  }, [location.state, navigate]);

  const handleFavoriteToggle = (recipeId, isFavorite) => {
    setRecipe(prev => ({
      ...prev,
      isFavorite
    }));
    console.log(`Recipe ${recipeId} favorite status: ${isFavorite}`);
  };

  const handleServingsChange = (newServings) => {
    setServings(newServings);
  };

  const toggleCookingMode = () => {
    setCookingMode(!cookingMode);
  };

  // Prevent screen timeout in cooking mode
  useEffect(() => {
    let wakeLock = null;

    if (cookingMode && 'wakeLock' in navigator) {
      navigator.wakeLock.request('screen').then((lock) => {
        wakeLock = lock;
        console.log('Screen wake lock activated');
      }).catch((err) => {
        console.log('Wake lock failed:', err);
      });
    }

    return () => {
      if (wakeLock) {
        wakeLock.release();
        console.log('Screen wake lock released');
      }
    };
  }, [cookingMode]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Icon name="ChefHat" size={24} className="text-primary-foreground" />
            </div>
            <p className="text-muted-foreground">Loading recipe...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{recipe?.name || 'Recipe View'} - ChefAI</title>
        <meta name="description" content={recipe?.description || 'View detailed recipe instructions and cooking guidance'} />
      </Helmet>

      {/* Fixed Header */}
      <RecipeHeader 
        recipe={recipe}
        onFavoriteToggle={handleFavoriteToggle}
      />

      {/* Breadcrumb Navigation */}
      <NavigationBreadcrumbs recipe={recipe} />

      {/* Main Content */}
      <main className="pt-4 pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Cooking Mode Toggle */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground">
              {recipe?.name}
            </h1>
            
            <Button
              variant={cookingMode ? "default" : "outline"}
              onClick={toggleCookingMode}
              className="touch-target"
            >
              <Icon 
                name={cookingMode ? "Eye" : "EyeOff"} 
                size={20} 
                className="mr-2"
              />
              {cookingMode ? 'Exit Cook Mode' : 'Cook Mode'}
            </Button>
          </div>

          {/* Recipe Content Grid */}
          <div className={`grid gap-6 ${cookingMode ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'}`}>
            {/* Left Column - Recipe Hero & Ingredients */}
            {!cookingMode && (
              <div className="lg:col-span-1 space-y-6">
                <RecipeHero 
                  recipe={recipe}
                />
                
                <IngredientsList 
                  recipe={recipe}
                  servings={servings}
                  onServingsChange={handleServingsChange}
                />
              </div>
            )}

            {/* Right Column - Instructions & Feedback */}
            <div className={`space-y-6 ${cookingMode ? '' : 'lg:col-span-2'}`}>
              <CookingInstructions 
                recipe={recipe}
                cookingMode={cookingMode}
              />
              
              {!cookingMode && (
                <UserFeedback 
                  recipe={recipe}
                />
              )}
            </div>
          </div>

          {/* Mobile Ingredients Panel (Cooking Mode) */}
          {cookingMode && (
            <div className="mt-6 lg:hidden">
              <IngredientsList 
                recipe={recipe}
                servings={servings}
                onServingsChange={handleServingsChange}
              />
            </div>
          )}
        </div>
      </main>

      {/* Floating Action Button (Mobile) */}
      <div className="fixed bottom-6 right-6 lg:hidden">
        <Button
          variant="default"
          size="icon"
          onClick={toggleCookingMode}
          className="w-14 h-14 rounded-full shadow-warm-lg"
        >
          <Icon 
            name={cookingMode ? "Eye" : "EyeOff"} 
            size={24}
          />
        </Button>
      </div>
    </div>
  );
};

export default FullScreenRecipeView;