import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const CookingPreferences = ({ 
  initialPreferences = {},
  onSave = () => {},
  className = "" 
}) => {
  const [preferences, setPreferences] = useState({
    dietaryRestrictions: initialPreferences.dietaryRestrictions || [],
    cuisineTypes: initialPreferences.cuisineTypes || [],
    skillLevel: initialPreferences.skillLevel || 'intermediate',
    cookingTime: initialPreferences.cookingTime || 'medium',
    spiceLevel: initialPreferences.spiceLevel || 'medium',
    servingSize: initialPreferences.servingSize || '2-4',
    allergies: initialPreferences.allergies || []
  });

  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const dietaryOptions = [
    { value: 'vegetarian', label: 'Vegetarian', description: 'No meat or fish' },
    { value: 'vegan', label: 'Vegan', description: 'No animal products' },
    { value: 'gluten-free', label: 'Gluten-Free', description: 'No gluten-containing ingredients' },
    { value: 'dairy-free', label: 'Dairy-Free', description: 'No dairy products' },
    { value: 'keto', label: 'Ketogenic', description: 'Low-carb, high-fat diet' },
    { value: 'paleo', label: 'Paleo', description: 'Whole foods, no processed items' },
    { value: 'low-sodium', label: 'Low Sodium', description: 'Reduced salt content' },
    { value: 'high-protein', label: 'High Protein', description: 'Protein-rich meals' }
  ];

  const cuisineOptions = [
    { value: 'italian', label: 'Italian' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'indian', label: 'Indian' },
    { value: 'thai', label: 'Thai' },
    { value: 'french', label: 'French' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'mediterranean', label: 'Mediterranean' },
    { value: 'american', label: 'American' },
    { value: 'korean', label: 'Korean' }
  ];

  const skillLevelOptions = [
    { value: 'beginner', label: 'Beginner', description: 'Simple recipes with basic techniques' },
    { value: 'intermediate', label: 'Intermediate', description: 'Moderate complexity recipes' },
    { value: 'advanced', label: 'Advanced', description: 'Complex recipes with advanced techniques' }
  ];

  const cookingTimeOptions = [
    { value: 'quick', label: 'Quick (≤30 min)', description: 'Fast meals for busy schedules' },
    { value: 'medium', label: 'Medium (30-60 min)', description: 'Standard cooking time' },
    { value: 'long', label: 'Long (60+ min)', description: 'Elaborate meals and slow cooking' }
  ];

  const spiceLevelOptions = [
    { value: 'mild', label: 'Mild', description: 'Little to no spice' },
    { value: 'medium', label: 'Medium', description: 'Moderate spice level' },
    { value: 'hot', label: 'Hot', description: 'Spicy and flavorful' },
    { value: 'extra-hot', label: 'Extra Hot', description: 'Very spicy dishes' }
  ];

  const servingSizeOptions = [
    { value: '1', label: '1 Person', description: 'Single serving' },
    { value: '2-4', label: '2-4 People', description: 'Small family or couple' },
    { value: '4-6', label: '4-6 People', description: 'Medium family' },
    { value: '6+', label: '6+ People', description: 'Large family or gathering' }
  ];

  const allergyOptions = [
    { value: 'nuts', label: 'Tree Nuts' },
    { value: 'peanuts', label: 'Peanuts' },
    { value: 'shellfish', label: 'Shellfish' },
    { value: 'fish', label: 'Fish' },
    { value: 'eggs', label: 'Eggs' },
    { value: 'soy', label: 'Soy' },
    { value: 'sesame', label: 'Sesame' }
  ];

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
    setHasChanges(true);
  };

  const handleCheckboxChange = (key, value, checked) => {
    setPreferences(prev => ({
      ...prev,
      [key]: checked 
        ? [...prev[key], value]
        : prev[key].filter(item => item !== value)
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onSave(preferences);
      setHasChanges(false);
      
      console.log('Preferences saved successfully');
    } catch (error) {
      console.error('Failed to save preferences:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`bg-card rounded-lg border border-border shadow-warm p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-medium text-foreground">
            Cooking Preferences
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Customize your recipe recommendations
          </p>
        </div>
        <Icon name="Settings" size={24} className="text-primary" />
      </div>

      <div className="space-y-6">
        {/* Skill Level */}
        <Select
          label="Cooking Skill Level"
          description="This helps us suggest appropriate recipes"
          options={skillLevelOptions}
          value={preferences.skillLevel}
          onChange={(value) => handlePreferenceChange('skillLevel', value)}
        />

        {/* Cooking Time Preference */}
        <Select
          label="Preferred Cooking Time"
          description="How much time do you usually have for cooking?"
          options={cookingTimeOptions}
          value={preferences.cookingTime}
          onChange={(value) => handlePreferenceChange('cookingTime', value)}
        />

        {/* Spice Level */}
        <Select
          label="Spice Tolerance"
          description="How spicy do you like your food?"
          options={spiceLevelOptions}
          value={preferences.spiceLevel}
          onChange={(value) => handlePreferenceChange('spiceLevel', value)}
        />

        {/* Serving Size */}
        <Select
          label="Typical Serving Size"
          description="How many people do you usually cook for?"
          options={servingSizeOptions}
          value={preferences.servingSize}
          onChange={(value) => handlePreferenceChange('servingSize', value)}
        />

        {/* Favorite Cuisines */}
        <Select
          label="Favorite Cuisines"
          description="Select your preferred cuisine types"
          options={cuisineOptions}
          value={preferences.cuisineTypes}
          onChange={(value) => handlePreferenceChange('cuisineTypes', value)}
          multiple
          searchable
        />

        {/* Dietary Restrictions */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            Dietary Restrictions
          </label>
          <p className="text-sm text-muted-foreground">
            Select any dietary preferences or restrictions
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {dietaryOptions.map((option) => (
              <Checkbox
                key={option.value}
                label={option.label}
                description={option.description}
                checked={preferences.dietaryRestrictions.includes(option.value)}
                onChange={(e) => handleCheckboxChange('dietaryRestrictions', option.value, e.target.checked)}
              />
            ))}
          </div>
        </div>

        {/* Allergies */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            Food Allergies
          </label>
          <p className="text-sm text-muted-foreground">
            Select any food allergies to avoid in recipes
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {allergyOptions.map((option) => (
              <Checkbox
                key={option.value}
                label={option.label}
                checked={preferences.allergies.includes(option.value)}
                onChange={(e) => handleCheckboxChange('allergies', option.value, e.target.checked)}
              />
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-border">
          <Button
            variant="default"
            onClick={handleSave}
            disabled={!hasChanges || saving}
            loading={saving}
            iconName="Save"
            iconPosition="left"
            fullWidth
          >
            {saving ? 'Saving Preferences...' : 'Save Preferences'}
          </Button>
          
          {hasChanges && (
            <div className="flex items-center space-x-2 text-sm text-warning mt-3">
              <Icon name="AlertCircle" size={16} />
              <span>You have unsaved preference changes</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookingPreferences;