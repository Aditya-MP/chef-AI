'use client';

import { useState, useRef } from 'react';
import { usePantry } from '@/hooks/use-pantry';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Loader2, Search } from 'lucide-react';
import DietaryFilters from './dietary-filters';
import { useToast } from '@/hooks/use-toast';

export default function IngredientSelector() {
  const {
    ingredients,
    selectedIngredients,
    toggleIngredient,
    handleGenerateRecipe,
    isLoading,
    recognizeFromImage,
  } = usePantry();
  const [searchTerm, setSearchTerm] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        toast({
          title: 'Image too large',
          description: 'Please upload an image smaller than 4MB.',
          variant: 'destructive',
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        recognizeFromImage(dataUri);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <Card className="shadow-md">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Select Your Ingredients</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for ingredients..."
                className="pl-9 pr-12"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                onClick={handleCameraClick}
                aria-label="Upload an image of an ingredient"
                disabled={isLoading}
              >
                <Camera className="h-4 w-4" />
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <ScrollArea className="h-64 w-full rounded-md border p-3">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {filteredIngredients.map((ingredient) => (
                  <div
                    key={ingredient.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={ingredient.id}
                      checked={selectedIngredients.has(ingredient.name)}
                      onCheckedChange={() => toggleIngredient(ingredient.name)}
                    />
                    <label
                      htmlFor={ingredient.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {ingredient.name}
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <DietaryFilters />
      </div>

      <div className="lg:col-span-1">
        <Card className="shadow-md sticky top-4">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Your Pantry</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ScrollArea className="h-48 mb-4">
              {selectedIngredients.size > 0 ? (
                <ul className="space-y-1">
                  {Array.from(selectedIngredients).map((name) => (
                    <li key={name} className="text-sm font-medium py-1 px-2 bg-green-50 rounded text-green-700">
                      {name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Select ingredients to see them here.
                </p>
              )}
            </ScrollArea>
            <Button
              className="w-full"
              onClick={handleGenerateRecipe}
              disabled={isLoading || selectedIngredients.size === 0}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate Recipe
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}