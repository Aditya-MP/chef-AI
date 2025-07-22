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
    <div className="container mx-auto p-4 md:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Select Your Ingredients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for ingredients..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={handleCameraClick}
                aria-label="Upload an image of an ingredient"
                disabled={isLoading}
              >
                <Camera className="h-5 w-5" />
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <ScrollArea className="h-72 w-full rounded-md border p-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
        <Card className="shadow-lg sticky top-8">
          <CardHeader>
            <CardTitle>Your Pantry</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64 mb-4">
                {selectedIngredients.size > 0 ? (
                <ul className="space-y-2">
                    {Array.from(selectedIngredients).map((name) => (
                    <li key={name} className="text-sm font-medium">{name}</li>
                    ))}
                </ul>
                ) : (
                <p className="text-sm text-muted-foreground">Select ingredients to see them here.</p>
                )}
            </ScrollArea>
            <Button
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
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
