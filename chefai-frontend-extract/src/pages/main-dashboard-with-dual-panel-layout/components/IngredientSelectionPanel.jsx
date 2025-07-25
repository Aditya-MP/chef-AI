import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const IngredientSelectionPanel = ({ 
  selectedIngredients = [], 
  onIngredientChange,
  dietaryFilters = {},
  onDietaryFilterChange,
  onCameraCapture,
  className = ""
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [cameraLoading, setCameraLoading] = useState(false);

  // Mock ingredients data
  const allIngredients = [
    { id: 1, name: "Chicken Breast", category: "Protein", vegetarian: false, vegan: false, glutenFree: true },
    { id: 2, name: "Salmon Fillet", category: "Protein", vegetarian: false, vegan: false, glutenFree: true },
    { id: 3, name: "Tofu", category: "Protein", vegetarian: true, vegan: true, glutenFree: true },
    { id: 4, name: "Quinoa", category: "Grains", vegetarian: true, vegan: true, glutenFree: true },
    { id: 5, name: "Brown Rice", category: "Grains", vegetarian: true, vegan: true, glutenFree: true },
    { id: 6, name: "Whole Wheat Pasta", category: "Grains", vegetarian: true, vegan: true, glutenFree: false },
    { id: 7, name: "Spinach", category: "Vegetables", vegetarian: true, vegan: true, glutenFree: true },
    { id: 8, name: "Bell Peppers", category: "Vegetables", vegetarian: true, vegan: true, glutenFree: true },
    { id: 9, name: "Mushrooms", category: "Vegetables", vegetarian: true, vegan: true, glutenFree: true },
    { id: 10, name: "Tomatoes", category: "Vegetables", vegetarian: true, vegan: true, glutenFree: true },
    { id: 11, name: "Onions", category: "Vegetables", vegetarian: true, vegan: true, glutenFree: true },
    { id: 12, name: "Garlic", category: "Vegetables", vegetarian: true, vegan: true, glutenFree: true },
    { id: 13, name: "Cheddar Cheese", category: "Dairy", vegetarian: true, vegan: false, glutenFree: true },
    { id: 14, name: "Greek Yogurt", category: "Dairy", vegetarian: true, vegan: false, glutenFree: true },
    { id: 15, name: "Eggs", category: "Protein", vegetarian: true, vegan: false, glutenFree: true },
    { id: 16, name: "Olive Oil", category: "Oils", vegetarian: true, vegan: true, glutenFree: true },
    { id: 17, name: "Coconut Oil", category: "Oils", vegetarian: true, vegan: true, glutenFree: true },
    { id: 18, name: "Almonds", category: "Nuts", vegetarian: true, vegan: true, glutenFree: true },
    { id: 19, name: "Walnuts", category: "Nuts", vegetarian: true, vegan: true, glutenFree: true },
    { id: 20, name: "Black Beans", category: "Legumes", vegetarian: true, vegan: true, glutenFree: true },
    { id: 21, name: "Chickpeas", category: "Legumes", vegetarian: true, vegan: true, glutenFree: true },
    { id: 22, name: "Lentils", category: "Legumes", vegetarian: true, vegan: true, glutenFree: true },
    { id: 23, name: "Avocado", category: "Fruits", vegetarian: true, vegan: true, glutenFree: true },
    { id: 24, name: "Bananas", category: "Fruits", vegetarian: true, vegan: true, glutenFree: true },
    { id: 25, name: "Blueberries", category: "Fruits", vegetarian: true, vegan: true, glutenFree: true }
  ];

  const dietaryFilterOptions = [
    { id: 'vegetarian', label: 'Vegetarian', icon: 'Leaf' },
    { id: 'vegan', label: 'Vegan', icon: 'Sprout' },
    { id: 'glutenFree', label: 'Gluten-Free', icon: 'Wheat' },
    { id: 'highProtein', label: 'High Protein', icon: 'Zap' }
  ];

  // Filter ingredients based on search term and dietary filters
  useEffect(() => {
    let filtered = allIngredients.filter(ingredient =>
      ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply dietary filters
    if (dietaryFilters.vegetarian) {
      filtered = filtered.filter(ingredient => ingredient.vegetarian);
    }
    if (dietaryFilters.vegan) {
      filtered = filtered.filter(ingredient => ingredient.vegan);
    }
    if (dietaryFilters.glutenFree) {
      filtered = filtered.filter(ingredient => ingredient.glutenFree);
    }
    if (dietaryFilters.highProtein) {
      filtered = filtered.filter(ingredient => 
        ingredient.category === 'Protein' || ingredient.category === 'Legumes'
      );
    }

    setFilteredIngredients(filtered);
  }, [searchTerm, dietaryFilters]);

  const handleIngredientToggle = (ingredient) => {
    const isSelected = selectedIngredients.some(item => item.id === ingredient.id);
    let updatedIngredients;
    
    if (isSelected) {
      updatedIngredients = selectedIngredients.filter(item => item.id !== ingredient.id);
    } else {
      updatedIngredients = [...selectedIngredients, ingredient];
    }
    
    onIngredientChange(updatedIngredients);
  };

  const handleCameraCapture = async () => {
    setCameraLoading(true);
    try {
      // Mock camera capture delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock detected ingredients
      const detectedIngredients = [
        allIngredients.find(ing => ing.name === "Tomatoes"),
        allIngredients.find(ing => ing.name === "Onions"),
        allIngredients.find(ing => ing.name === "Bell Peppers")
      ].filter(Boolean);
      
      onCameraCapture(detectedIngredients);
    } catch (error) {
      console.error('Camera capture failed:', error);
    } finally {
      setCameraLoading(false);
    }
  };

  const groupedIngredients = filteredIngredients.reduce((groups, ingredient) => {
    const category = ingredient.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(ingredient);
    return groups;
  }, {});

  return (
    <div className={`bg-card rounded-lg border border-border shadow-warm h-full flex flex-col ${className}`}>
      {/* Panel Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Select Ingredients
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-caption text-muted-foreground">
              {selectedIngredients.length} selected
            </span>
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-sm font-mono text-primary font-medium">
                {selectedIngredients.length}
              </span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Input
            type="search"
            placeholder="Search ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
        </div>

        {/* Camera Capture Button */}
        <Button
          variant="outline"
          onClick={handleCameraCapture}
          loading={cameraLoading}
          iconName="Camera"
          iconPosition="left"
          className="w-full mb-4"
          disabled={cameraLoading}
        >
          {cameraLoading ? 'Detecting Ingredients...' : 'Capture Ingredients'}
        </Button>

        {/* Dietary Filters */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Dietary Preferences</h3>
          <div className="grid grid-cols-2 gap-2">
            {dietaryFilterOptions.map((filter) => (
              <div key={filter.id} className="flex items-center space-x-2">
                <Checkbox
                  checked={dietaryFilters[filter.id] || false}
                  onChange={(e) => onDietaryFilterChange(filter.id, e.target.checked)}
                  size="sm"
                />
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={filter.icon} 
                    size={14} 
                    className="text-muted-foreground"
                  />
                  <span className="text-sm font-caption text-foreground">
                    {filter.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ingredients List */}
      <div className="flex-1 overflow-y-auto p-4">
        {Object.keys(groupedIngredients).length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-3" />
            <h3 className="font-medium text-foreground mb-1">No ingredients found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or dietary filters
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedIngredients).map(([category, ingredients]) => (
              <div key={category}>
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
                  {category}
                </h4>
                <div className="space-y-2">
                  {ingredients.map((ingredient) => {
                    const isSelected = selectedIngredients.some(item => item.id === ingredient.id);
                    return (
                      <div
                        key={ingredient.id}
                        onClick={() => handleIngredientToggle(ingredient)}
                        className={`
                          flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-quick
                          ${isSelected 
                            ? 'border-primary bg-primary/5 shadow-warm' 
                            : 'border-border hover:border-primary/50 hover:bg-muted/50'
                          }
                        `}
                      >
                        <Checkbox
                          checked={isSelected}
                          onChange={() => {}} // Handled by parent div click
                          size="sm"
                        />
                        <div className="flex-1">
                          <span className={`
                            text-sm font-medium transition-quick
                            ${isSelected ? 'text-primary' : 'text-foreground'}
                          `}>
                            {ingredient.name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {ingredient.vegetarian && (
                            <Icon name="Leaf" size={12} className="text-success" />
                          )}
                          {ingredient.vegan && (
                            <Icon name="Sprout" size={12} className="text-success" />
                          )}
                          {ingredient.glutenFree && (
                            <Icon name="Wheat" size={12} className="text-warning" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected Ingredients Summary */}
      {selectedIngredients.length > 0 && (
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              Ready to generate recipes
            </span>
            <Button
              variant="default"
              size="sm"
              iconName="ChefHat"
              iconPosition="left"
              onClick={() => onIngredientChange(selectedIngredients)}
            >
              Generate Recipes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientSelectionPanel;