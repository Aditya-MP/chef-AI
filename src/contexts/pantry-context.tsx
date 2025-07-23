'use client';

import { generateRecipe, GenerateRecipeOutput } from '@/ai/flows/generate-recipe';
import { recognizeIngredient } from '@/ai/flows/ingredient-recognition';
import type { Ingredient } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { createContext, useState, ReactNode, useCallback } from 'react';

// A mock list of common ingredients. In a real app, this would come from a database.
const COMMON_INGREDIENTS: Ingredient[] = [
    { id: '1', name: 'Chicken' }, { id: '2', name: 'Beef' }, { id: '3', name: 'Rice' },
    { id: '4', name: 'Pasta' }, { id: '5', name: 'Tomatoes' }, { id: '6', name: 'Onions' },
    { id: '7', name: 'Garlic' }, { id: '8', name: 'Bell Peppers' }, { id: '9', name: 'Potatoes' },
    { id: '10', name: 'Carrots' }, { id: '11', name: 'Broccoli' }, { id: '12', name: 'Spinach' },
    { id: '13', name: 'Cheese' }, { id: '14', name: 'Milk' }, { id: '15', name: 'Eggs' },
    { id: '16', name: 'Flour' }, { id: '17', name: 'Sugar' }, { id: '18', name: 'Salt' },
    { id: '19', name: 'Pepper' }, { id: '20', name: 'Olive Oil' }, { id: '21', name: 'Soy Sauce' },
    { id: '22', name: 'Tofu' }, { id: '23', name: 'Lentils' }, { id: '24', name: 'Cilantro' },
    { id: '25', name: 'Lime' }
];

interface DietaryFilters {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  highProtein: boolean;
}

interface PantryContextType {
  ingredients: Ingredient[];
  selectedIngredients: Set<string>;
  toggleIngredient: (ingredientName: string) => void;
  recognizeFromImage: (photoDataUri: string) => Promise<void>;
  filters: DietaryFilters;
  setFilter: (filter: keyof DietaryFilters, value: boolean) => void;
  isRecipeVisible: boolean;
  generatedRecipe: GenerateRecipeOutput | null;
  handleGenerateRecipe: () => Promise<void>;
  clearRecipe: () => void;
  isLoading: boolean;
}

export const PantryContext = createContext<PantryContextType | undefined>(undefined);

export function PantryProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [ingredients] = useState<Ingredient[]>(COMMON_INGREDIENTS);
  const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<DietaryFilters>({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    highProtein: false,
  });
  const [isRecipeVisible, setIsRecipeVisible] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState<GenerateRecipeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleIngredient = useCallback((ingredientName: string) => {
    setSelectedIngredients(prev => {
      const newSet = new Set(prev);
      if (newSet.has(ingredientName)) {
        newSet.delete(ingredientName);
      } else {
        newSet.add(ingredientName);
      }
      return newSet;
    });
  }, []);

  const recognizeFromImage = useCallback(async (photoDataUri: string) => {
      setIsLoading(true);
      try {
        const { ingredientName } = await recognizeIngredient({ photoDataUri });
        const matchedIngredient = ingredients.find(ing => ing.name.toLowerCase() === ingredientName.toLowerCase());
        
        if (matchedIngredient) {
            toggleIngredient(matchedIngredient.name);
            toast({
                title: 'Ingredient Added!',
                description: `${matchedIngredient.name} was recognized and added to your list.`,
            });
        } else {
            toast({
                title: 'Ingredient Not Found',
                description: `We recognized "${ingredientName}" but it's not in our list.`,
                variant: 'destructive',
            });
        }
      } catch (error) {
        toast({
            title: 'Image Recognition Failed',
            description: 'Could not recognize an ingredient from the image.',
            variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
  }, [ingredients, toggleIngredient, toast]);


  const setFilter = useCallback((filter: keyof DietaryFilters, value: boolean) => {
    setFilters(prev => ({ ...prev, [filter]: value }));
  }, []);

  const handleGenerateRecipe = useCallback(async () => {
    if (selectedIngredients.size === 0) {
      toast({
        title: 'No Ingredients Selected',
        description: 'Please select at least one ingredient to generate a recipe.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const recipe = await generateRecipe({
        ingredients: Array.from(selectedIngredients),
        ...filters,
      });
      setGeneratedRecipe(recipe);
      setIsRecipeVisible(true);
      // Firestore is not used
    } catch (error) {
      toast({
        title: 'Recipe Generation Failed',
        description: 'We couldn\'t generate a recipe with the selected items. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [selectedIngredients, filters, toast]);

  const clearRecipe = useCallback(() => {
    setIsRecipeVisible(false);
    // Add a delay to allow for the slide-out animation before clearing the data
    setTimeout(() => {
      setGeneratedRecipe(null);
    }, 500);
  }, []);

  const value = {
    ingredients,
    selectedIngredients,
    toggleIngredient,
    recognizeFromImage,
    filters,
    setFilter,
    isRecipeVisible,
    generatedRecipe,
    handleGenerateRecipe,
    clearRecipe,
    isLoading,
  };

  return <PantryContext.Provider value={value}>{children}</PantryContext.Provider>;
}
