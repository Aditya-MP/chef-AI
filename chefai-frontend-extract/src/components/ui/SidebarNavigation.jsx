import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const SidebarNavigation = ({ 
  collapsed = false, 
  onCollapse, 
  user = null,
  className = "" 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [recentExpanded, setRecentExpanded] = useState(false);
  const [favoritesExpanded, setFavoritesExpanded] = useState(false);

  // Navigation items configuration
  const navigationItems = [
    {
      label: "Dashboard",
      path: "/main-dashboard-with-dual-panel-layout",
      icon: "Home",
      tooltip: "Ingredient selection and recipe generation"
    },
    {
      label: "Full Recipe View",
      path: "/full-screen-recipe-view",
      icon: "BookOpen",
      tooltip: "Detailed recipe instructions"
    },
    {
      label: "Profile",
      path: "/user-profile-management",
      icon: "User",
      tooltip: "Personal account and cooking preferences"
    },
    {
      label: "Settings",
      path: "/application-settings",
      icon: "Settings",
      tooltip: "Application configuration and preferences"
    }
  ];

  // Mock recent recipes data
  const recentRecipes = [
    { id: 1, name: "Creamy Mushroom Risotto", time: "2 hours ago" },
    { id: 2, name: "Spicy Thai Basil Chicken", time: "1 day ago" },
    { id: 3, name: "Mediterranean Quinoa Bowl", time: "2 days ago" }
  ];

  // Mock favorite recipes data
  const favoriteRecipes = [
    { id: 1, name: "Classic Beef Stroganoff", saved: "Last week" },
    { id: 2, name: "Lemon Herb Salmon", saved: "2 weeks ago" },
    { id: 3, name: "Vegetarian Pad Thai", saved: "1 month ago" }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const handleRecipeClick = (recipeId, recipeName) => {
    // Navigate to full recipe view with recipe data
    navigate('/full-screen-recipe-view', { 
      state: { recipeId, recipeName } 
    });
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {!collapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-80 lg:hidden"
          onClick={onCollapse}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-card border-r border-border z-90
          transform transition-smooth lg:translate-x-0
          ${collapsed ? '-translate-x-full' : 'translate-x-0'}
          ${className}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Navigation Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-heading font-medium text-foreground">
                Navigation
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onCollapse}
                className="lg:hidden"
                aria-label="Close navigation"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => (
              <Button
                key={item.path}
                variant={isActiveRoute(item.path) ? "default" : "ghost"}
                onClick={() => handleNavigation(item.path)}
                className={`
                  w-full justify-start touch-target
                  ${isActiveRoute(item.path) 
                    ? 'bg-primary text-primary-foreground shadow-warm' 
                    : 'text-foreground hover:bg-muted'
                  }
                `}
                title={item.tooltip}
              >
                <Icon 
                  name={item.icon} 
                  size={20} 
                  className="mr-3"
                />
                {item.label}
              </Button>
            ))}

            {/* Recipe Collections Section */}
            <div className="pt-6 space-y-2">
              <h3 className="px-3 text-sm font-caption font-medium text-muted-foreground uppercase tracking-wide">
                Recipe Collections
              </h3>

              {/* Recent Recipes */}
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  onClick={() => setRecentExpanded(!recentExpanded)}
                  className="w-full justify-between text-foreground hover:bg-muted touch-target"
                >
                  <div className="flex items-center">
                    <Icon name="Clock" size={18} className="mr-3" />
                    Recent Recipes
                  </div>
                  <Icon 
                    name="ChevronRight" 
                    size={16} 
                    className={`transition-quick ${recentExpanded ? 'rotate-90' : ''}`}
                  />
                </Button>

                {recentExpanded && (
                  <div className="ml-6 space-y-1 expand-gentle">
                    {recentRecipes.map((recipe) => (
                      <button
                        key={recipe.id}
                        onClick={() => handleRecipeClick(recipe.id, recipe.name)}
                        className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-quick"
                      >
                        <div className="truncate">{recipe.name}</div>
                        <div className="text-xs font-caption text-muted-foreground">
                          {recipe.time}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Favorite Recipes */}
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  onClick={() => setFavoritesExpanded(!favoritesExpanded)}
                  className="w-full justify-between text-foreground hover:bg-muted touch-target"
                >
                  <div className="flex items-center">
                    <Icon name="Heart" size={18} className="mr-3" />
                    Favorite Recipes
                  </div>
                  <Icon 
                    name="ChevronRight" 
                    size={16} 
                    className={`transition-quick ${favoritesExpanded ? 'rotate-90' : ''}`}
                  />
                </Button>

                {favoritesExpanded && (
                  <div className="ml-6 space-y-1 expand-gentle">
                    {favoriteRecipes.map((recipe) => (
                      <button
                        key={recipe.id}
                        onClick={() => handleRecipeClick(recipe.id, recipe.name)}
                        className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-quick"
                      >
                        <div className="truncate">{recipe.name}</div>
                        <div className="text-xs font-caption text-muted-foreground">
                          Saved {recipe.saved}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-accent-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {user?.name || 'Chef User'}
                </p>
                <p className="text-xs font-caption text-muted-foreground truncate">
                  {user?.email || 'chef@example.com'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SidebarNavigation;