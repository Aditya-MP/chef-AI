import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationHeader from '../../components/ui/NavigationHeader';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import RecipeCollectionTabs from '../../components/ui/RecipeCollectionTabs';
import IngredientSelectionPanel from './components/IngredientSelectionPanel';
import RecipeGenerationPanel from './components/RecipeGenerationPanel';

const MainDashboardWithDualPanelLayout = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [dietaryFilters, setDietaryFilters] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    highProtein: false
  });
  const [user, setUser] = useState({
    name: "Chef Sarah",
    email: "sarah.chef@example.com",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg"
  });

  // Handle responsive sidebar behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarCollapsed(false);
      } else {
        setSidebarCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenuToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleIngredientChange = (ingredients) => {
    setSelectedIngredients(ingredients);
  };

  const handleDietaryFilterChange = (filterId, checked) => {
    setDietaryFilters(prev => ({
      ...prev,
      [filterId]: checked
    }));
  };

  const handleCameraCapture = (detectedIngredients) => {
    // Add detected ingredients to selected ingredients
    const newIngredients = [...selectedIngredients];
    detectedIngredients.forEach(ingredient => {
      if (!newIngredients.some(item => item.id === ingredient.id)) {
        newIngredients.push(ingredient);
      }
    });
    setSelectedIngredients(newIngredients);
  };

  const handleRecipeSelect = (recipe) => {
    if (recipe) {
      navigate('/full-screen-recipe-view', {
        state: {
          recipeId: recipe.id,
          recipeName: recipe.name,
          recipeData: recipe
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <NavigationHeader
        onMenuToggle={handleMenuToggle}
        sidebarCollapsed={sidebarCollapsed}
        user={user}
      />

      {/* Sidebar Navigation */}
      <SidebarNavigation
        collapsed={sidebarCollapsed}
        onCollapse={() => setSidebarCollapsed(true)}
        user={user}
      />

      {/* Main Content Area */}
      <main className={`
        pt-16 transition-smooth min-h-screen
        ${sidebarCollapsed ? 'lg:pl-0' : 'lg:pl-64'}
      `}>
        <div className="p-4 lg:p-6 max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-2">
              Welcome back, {user.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-muted-foreground">
              What delicious recipe would you like to create today? Select your ingredients and let AI work its magic.
            </p>
          </div>

          {/* Mobile Recipe Collections */}
          <div className="lg:hidden mb-6">
            <RecipeCollectionTabs onRecipeSelect={handleRecipeSelect} />
          </div>

          {/* Dual Panel Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Ingredient Selection Panel */}
            <div className="order-1 lg:order-1">
              <IngredientSelectionPanel
                selectedIngredients={selectedIngredients}
                onIngredientChange={handleIngredientChange}
                dietaryFilters={dietaryFilters}
                onDietaryFilterChange={handleDietaryFilterChange}
                onCameraCapture={handleCameraCapture}
                className="h-[600px] lg:h-[700px]"
              />
            </div>

            {/* Recipe Generation Panel */}
            <div className="order-2 lg:order-2">
              <RecipeGenerationPanel
                selectedIngredients={selectedIngredients}
                dietaryFilters={dietaryFilters}
                onRecipeSelect={handleRecipeSelect}
                className="h-[600px] lg:h-[700px]"
              />
            </div>
          </div>

          {/* Desktop Recipe Collections */}
          <div className="hidden lg:block">
            <RecipeCollectionTabs onRecipeSelect={handleRecipeSelect} />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="bg-card rounded-lg border border-border p-4 text-center">
              <div className="text-2xl font-heading font-semibold text-primary mb-1">
                {selectedIngredients.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Ingredients Selected
              </div>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-4 text-center">
              <div className="text-2xl font-heading font-semibold text-secondary mb-1">
                12
              </div>
              <div className="text-sm text-muted-foreground">
                Recipes Generated
              </div>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-4 text-center">
              <div className="text-2xl font-heading font-semibold text-success mb-1">
                8
              </div>
              <div className="text-sm text-muted-foreground">
                Favorites Saved
              </div>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-4 text-center">
              <div className="text-2xl font-heading font-semibold text-warning mb-1">
                4.8
              </div>
              <div className="text-sm text-muted-foreground">
                Avg Rating
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-8 bg-primary/5 rounded-lg border border-primary/20 p-6">
            <h3 className="text-lg font-heading font-medium text-foreground mb-3">
              💡 Cooking Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>Use the camera feature to quickly identify ingredients from your pantry</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>Enable dietary filters to get recipes that match your preferences</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>Save your favorite recipes for quick access later</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-primary">•</span>
                <span>Mix and match ingredients to discover new flavor combinations</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainDashboardWithDualPanelLayout;