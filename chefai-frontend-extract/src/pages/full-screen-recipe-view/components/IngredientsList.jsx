import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IngredientsList = ({ 
  recipe = null,
  servings = 4,
  onServingsChange = null,
  className = ""
}) => {
  const [currentServings, setCurrentServings] = useState(servings);
  const [checkedIngredients, setCheckedIngredients] = useState(new Set());
  const [showSubstitutions, setShowSubstitutions] = useState({});

  // Mock ingredients data
  const ingredients = recipe?.ingredients || [
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
  ];

  const handleServingsChange = (newServings) => {
    if (newServings < 1 || newServings > 12) return;
    
    setCurrentServings(newServings);
    if (onServingsChange) {
      onServingsChange(newServings);
    }
  };

  const calculateAmount = (originalAmount) => {
    const ratio = currentServings / servings;
    const newAmount = originalAmount * ratio;
    
    // Round to reasonable precision
    if (newAmount < 0.1) return newAmount.toFixed(2);
    if (newAmount < 1) return newAmount.toFixed(1);
    return Math.round(newAmount * 4) / 4; // Round to nearest quarter
  };

  const toggleIngredientCheck = (ingredientId) => {
    const newChecked = new Set(checkedIngredients);
    if (newChecked.has(ingredientId)) {
      newChecked.delete(ingredientId);
    } else {
      newChecked.add(ingredientId);
    }
    setCheckedIngredients(newChecked);
  };

  const toggleSubstitutions = (ingredientId) => {
    setShowSubstitutions(prev => ({
      ...prev,
      [ingredientId]: !prev[ingredientId]
    }));
  };

  const groupedIngredients = ingredients.reduce((groups, ingredient) => {
    const category = ingredient.category || 'Other';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(ingredient);
    return groups;
  }, {});

  const categoryIcons = {
    'Grains': 'Wheat',
    'Vegetables': 'Carrot',
    'Liquids': 'Droplets',
    'Dairy': 'Milk',
    'Herbs': 'Leaf',
    'Aromatics': 'Sparkles',
    'Other': 'Package'
  };

  return (
    <div className={`bg-card rounded-lg border border-border shadow-warm ${className}`}>
      {/* Header with Servings Adjuster */}
      <div className="p-4 lg:p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Ingredients
          </h3>
          
          <div className="flex items-center space-x-3">
            <span className="text-sm font-caption text-muted-foreground">
              Servings:
            </span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleServingsChange(currentServings - 1)}
                disabled={currentServings <= 1}
                className="w-8 h-8"
              >
                <Icon name="Minus" size={14} />
              </Button>
              
              <span className="w-8 text-center font-mono font-medium text-foreground">
                {currentServings}
              </span>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleServingsChange(currentServings + 1)}
                disabled={currentServings >= 12}
                className="w-8 h-8"
              >
                <Icon name="Plus" size={14} />
              </Button>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="font-caption text-muted-foreground">
              {checkedIngredients.size} of {ingredients.length} gathered
            </span>
            <span className="font-mono text-muted-foreground">
              {Math.round((checkedIngredients.size / ingredients.length) * 100)}%
            </span>
          </div>
          <div className="mt-2 w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-smooth"
              style={{ 
                width: `${(checkedIngredients.size / ingredients.length) * 100}%` 
              }}
            />
          </div>
        </div>
      </div>

      {/* Ingredients List */}
      <div className="p-4 lg:p-6 space-y-6">
        {Object.entries(groupedIngredients).map(([category, categoryIngredients]) => (
          <div key={category}>
            {/* Category Header */}
            <div className="flex items-center space-x-2 mb-3">
              <Icon 
                name={categoryIcons[category] || 'Package'} 
                size={16} 
                className="text-primary"
              />
              <h4 className="font-medium text-foreground">{category}</h4>
              <div className="flex-1 h-px bg-border"></div>
            </div>

            {/* Category Ingredients */}
            <div className="space-y-2">
              {categoryIngredients.map((ingredient) => (
                <div key={ingredient.id} className="space-y-2">
                  {/* Main Ingredient Row */}
                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-quick">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleIngredientCheck(ingredient.id)}
                      className={`
                        w-5 h-5 rounded border-2 flex items-center justify-center transition-quick checkbox-scale
                        ${checkedIngredients.has(ingredient.id)
                          ? 'bg-primary border-primary' :'border-border hover:border-primary'
                        }
                      `}
                    >
                      {checkedIngredients.has(ingredient.id) && (
                        <Icon name="Check" size={12} className="text-primary-foreground" />
                      )}
                    </button>

                    {/* Ingredient Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`
                          font-medium transition-quick
                          ${checkedIngredients.has(ingredient.id)
                            ? 'text-muted-foreground line-through'
                            : 'text-foreground'
                          }
                        `}>
                          {ingredient.name}
                        </span>
                        
                        <span className="font-mono text-sm text-muted-foreground">
                          {calculateAmount(ingredient.amount)} {ingredient.unit}
                        </span>
                      </div>
                    </div>

                    {/* Substitutions Toggle */}
                    {ingredient.substitutions && ingredient.substitutions.length > 0 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleSubstitutions(ingredient.id)}
                        className="w-8 h-8"
                        aria-label="Show substitutions"
                      >
                        <Icon 
                          name="ChevronDown" 
                          size={14} 
                          className={`transition-quick ${
                            showSubstitutions[ingredient.id] ? 'rotate-180' : ''
                          }`}
                        />
                      </Button>
                    )}
                  </div>

                  {/* Substitutions */}
                  {showSubstitutions[ingredient.id] && ingredient.substitutions && (
                    <div className="ml-8 p-3 bg-muted/50 rounded-lg expand-gentle">
                      <p className="text-sm font-caption text-muted-foreground mb-2">
                        Substitutions:
                      </p>
                      <div className="space-y-1">
                        {ingredient.substitutions.map((sub, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Icon name="ArrowRight" size={12} className="text-muted-foreground" />
                            <span className="text-sm text-foreground">{sub}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientsList;