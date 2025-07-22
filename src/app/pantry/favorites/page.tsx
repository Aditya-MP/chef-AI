'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart } from 'lucide-react';

export default function FavoritesPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Favorite Recipes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-64">
            <Heart className="w-16 h-16 mb-4" />
            <p>You haven't favorited any recipes yet.</p>
            <p>Your favorite recipes will appear here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
