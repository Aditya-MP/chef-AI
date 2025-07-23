'use client';

import { usePantry } from '@/hooks/use-pantry';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, ChefHat, Heart, Star } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function RecipeView() {
  const { generatedRecipe, clearRecipe, selectedIngredients } = usePantry();
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  if (!generatedRecipe) {
    return (
      <div className="flex items-center justify-center h-32">
        <p className="text-gray-500 text-sm">No recipe to display.</p>
      </div>
    );
  }

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? 'Removed from Favorites' : 'Added to Favorites',
    });
  };

  const handleFeedbackSubmit = () => {
    toast({
      title: 'Feedback Submitted!',
      description: 'Thank you for your review.'
    });
  };
  
  const { recipeName, steps, requiredIngredients, alternativeSuggestions } = generatedRecipe;

  return (
    <div className="bg-background min-h-full">
      <div className="sticky top-0 bg-background/90 backdrop-blur-sm z-10 p-3 border-b">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={clearRecipe}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-bold text-center truncate px-2">{recipeName}</h1>
          <Button variant="ghost" size="sm" onClick={handleFavoriteClick}>
            <Heart className={`h-4 w-4 ${isFavorited ? 'text-red-500 fill-current' : ''}`} />
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardHeader className="text-center pb-4">
            <ChefHat className="w-12 h-12 text-primary mx-auto mb-3" />
            <CardTitle className="text-2xl font-bold">{recipeName}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 border-b pb-2">Ingredients</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {requiredIngredients.map((ing, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Badge variant={selectedIngredients.has(ing) ? 'default' : 'secondary'} className="text-xs">
                      {selectedIngredients.has(ing) ? 'Have' : 'Needed'}
                    </Badge>
                    <span className="text-sm">{ing}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {alternativeSuggestions && alternativeSuggestions.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 border-b pb-2">Chef's Suggestions</h3>
                <div className="space-y-2">
                  {alternativeSuggestions.map((suggestion, index) => (
                    <p key={index} className="p-3 bg-accent/20 rounded-lg text-sm">{suggestion}</p>
                  ))}
                </div>
              </div>
            )}
            
            <div>
              <h3 className="text-lg font-semibold mb-3 border-b pb-2">Instructions</h3>
              <ol className="space-y-3">
                {steps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 bg-primary text-primary-foreground rounded-full h-7 w-7 flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <p className="flex-1 pt-1 text-sm">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-center">Leave Feedback</h3>
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 cursor-pointer transition-colors ${
                        (hoverRating || rating) >= star ? 'text-yellow-400 fill-current' : 'text-muted-foreground'
                      }`}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
                <Textarea 
                  placeholder="What did you think, chef?" 
                  className="max-w-md text-sm"
                  rows={3}
                />
                <Button onClick={handleFeedbackSubmit} size="sm">Submit Review</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}