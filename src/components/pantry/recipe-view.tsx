'use client';

import { usePantry } from '@/hooks/use-pantry';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, ChefHat, Heart, Star } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';

export default function RecipeView() {
  const { generatedRecipe, clearRecipe, selectedIngredients } = usePantry();
  const { user } = useAuth();
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  if (!generatedRecipe) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>No recipe to display.</p>
      </div>
    );
  }

  const handleFavoriteClick = () => {
    // In a real app, this would save to Firestore
    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? 'Removed from Favorites' : 'Added to Favorites',
    });
  };

  const handleFeedbackSubmit = () => {
      // In a real app, this would save to Firestore
      toast({
          title: 'Feedback Submitted!',
          description: 'Thank you for your review.'
      })
  }
  
  const { recipeName, steps, requiredIngredients, alternativeSuggestions } = generatedRecipe;

  return (
    <div className="bg-background min-h-full">
        <div className="sticky top-0 bg-background/80 backdrop-blur-sm z-10 p-4 border-b">
            <div className="container mx-auto flex items-center justify-between">
                <Button variant="ghost" size="icon" onClick={clearRecipe}>
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-xl md:text-2xl font-bold text-center truncate px-4">{recipeName}</h1>
                <Button variant="ghost" size="icon" onClick={handleFavoriteClick}>
                    <Heart className={`h-6 w-6 ${isFavorited ? 'text-red-500 fill-current' : ''}`} />
                </Button>
            </div>
        </div>
        <div className="container mx-auto p-4 md:p-8">
            <Card className="max-w-4xl mx-auto shadow-xl">
                <CardHeader className="text-center">
                    <ChefHat className="w-16 h-16 text-primary mx-auto mb-4" />
                    <CardTitle className="text-3xl md:text-4xl font-headline">{recipeName}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div>
                        <h3 className="text-2xl font-semibold mb-4 border-b pb-2">Ingredients</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                            {requiredIngredients.map((ing, index) => (
                                <li key={index} className="flex items-center">
                                    <Badge variant={selectedIngredients.has(ing) ? 'default' : 'secondary'} className="mr-2">
                                        {selectedIngredients.has(ing) ? 'Have' : 'Needed'}
                                    </Badge>
                                    {ing}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {alternativeSuggestions && alternativeSuggestions.length > 0 && (
                        <div>
                             <h3 className="text-2xl font-semibold mb-4 border-b pb-2">Chef's Suggestions</h3>
                             <div className="space-y-2">
                                {alternativeSuggestions.map((suggestion, index) => (
                                    <p key={index} className="p-3 bg-accent/20 rounded-lg text-sm">{suggestion}</p>
                                ))}
                             </div>
                        </div>
                    )}
                    <div>
                        <h3 className="text-2xl font-semibold mb-4 border-b pb-2">Instructions</h3>
                        <ol className="space-y-4">
                            {steps.map((step, index) => (
                                <li key={index} className="flex items-start">
                                    <div className="flex-shrink-0 bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center font-bold mr-4">{index + 1}</div>
                                    <p className="flex-1 pt-1">{step}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                    <Separator />
                     <div>
                        <h3 className="text-2xl font-semibold mb-4 text-center">Leave Feedback</h3>
                        <div className="flex flex-col items-center gap-4">
                            <div className="flex items-center space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`w-8 h-8 cursor-pointer transition-colors ${
                                    (hoverRating || rating) >= star ? 'text-yellow-400 fill-current' : 'text-muted-foreground'
                                    }`}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    onClick={() => setRating(star)}
                                />
                                ))}
                            </div>
                            <Textarea placeholder={`What did you think, ${user?.displayName ?? 'chef'}?`} className="max-w-lg"/>
                            <Button onClick={handleFeedbackSubmit}>Submit Review</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
