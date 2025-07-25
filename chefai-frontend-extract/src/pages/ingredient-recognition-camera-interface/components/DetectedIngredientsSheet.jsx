import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DetectedIngredientsSheet = ({ 
  ingredients = [], 
  onConfirm, 
  onClose, 
  onEditIngredient,
  onRemoveIngredient,
  isAiGenerated = false
}) => {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState(new Set());

  const handleEdit = (ingredient) => {
    setEditingId(ingredient.id);
    setEditValue(ingredient.name);
  };

  const handleSaveEdit = (id) => {
    if (editValue.trim()) {
      onEditIngredient(id, editValue.trim());
    }
    setEditingId(null);
    setEditValue('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const handleConfirm = () => {
    const confirmedIngredients = ingredients.map(ing => ({
      id: ing.id,
      name: ing.name,
      category: ing.category,
      confidence: ing.confidence,
      vegetarian: true, // Default values for integration
      vegan: ing.category === 'Vegetables',
      glutenFree: ing.category !== 'Grains',
    }));
    onConfirm(confirmedIngredients);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
      <div className="bg-card w-full max-h-[80vh] rounded-t-3xl overflow-hidden animate-slide-up">
        {/* Sheet Header */}
        <div className="p-4 border-b border-border bg-muted/50">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Icon name="Sparkles" size={24} className="text-primary" />
              <h2 className="text-xl font-heading font-semibold text-foreground">
                {isAiGenerated ? 'AI Detected Ingredients' : 'Detected Ingredients'}
              </h2>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            {isAiGenerated 
              ? `Found ${ingredients.length} ingredients using Google Gemini AI. Review and confirm below.`
              : `Found ${ingredients.length} ingredients. Review and confirm below.`
            }
          </p>
        </div>

        {/* Ingredients List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-3">
            {ingredients.map((ingredient) => (
              <div 
                key={ingredient.id}
                className="bg-muted/30 rounded-lg border border-border p-4 hover:shadow-warm transition-quick"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    {/* Confidence indicator */}
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: ingredient.color || '#7C9885' }}
                    />

                    <div className="flex-1">
                      {editingId === ingredient.id ? (
                        <div className="flex items-center space-x-2">
                          <Input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="flex-1 h-8"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleSaveEdit(ingredient.id);
                              } else if (e.key === 'Escape') {
                                handleCancelEdit();
                              }
                            }}
                            autoFocus
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSaveEdit(ingredient.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Icon name="Check" size={14} className="text-success" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCancelEdit}
                            className="h-8 w-8 p-0"
                          >
                            <Icon name="X" size={14} className="text-error" />
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-foreground">
                              {ingredient.name}
                            </span>
                            <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                              {Math.round(ingredient.confidence * 100)}%
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {ingredient.category}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action buttons */}
                  {editingId !== ingredient.id && (
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(ingredient)}
                        className="h-8 w-8 p-0"
                      >
                        <Icon name="Edit3" size={14} className="text-muted-foreground" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveIngredient(ingredient.id)}
                        className="h-8 w-8 p-0 hover:bg-error/10"
                      >
                        <Icon name="Trash2" size={14} className="text-error" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {ingredients.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Search" size={24} className="text-muted-foreground" />
              </div>
              <h3 className="font-medium text-foreground mb-2">
                No ingredients detected
              </h3>
              <p className="text-sm text-muted-foreground">
                Try capturing another image with better lighting
              </p>
            </div>
          )}
        </div>

        {/* Sheet Footer */}
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              {isAiGenerated && (
                <>
                  <Icon name="Zap" size={16} className="text-primary" />
                  <span>Powered by Google Gemini</span>
                </>
              )}
            </div>
            <div className="text-sm font-mono text-muted-foreground">
              {selectedIngredients.size} of {ingredients.length} selected
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={selectedIngredients.size === 0}
              className="flex-1"
              iconName="Check"
              iconPosition="right"
            >
              Add {selectedIngredients.size} Ingredients
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetectedIngredientsSheet;