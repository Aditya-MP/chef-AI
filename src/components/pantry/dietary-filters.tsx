'use client';

import { usePantry } from '@/hooks/use-pantry';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function DietaryFilters() {
  const { filters, setFilter } = usePantry();

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Dietary Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="vegetarian"
              checked={filters.vegetarian}
              onCheckedChange={(checked) => setFilter('vegetarian', checked)}
            />
            <Label htmlFor="vegetarian">Vegetarian</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="vegan"
              checked={filters.vegan}
              onCheckedChange={(checked) => setFilter('vegan', checked)}
            />
            <Label htmlFor="vegan">Vegan</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="glutenFree"
              checked={filters.glutenFree}
              onCheckedChange={(checked) => setFilter('glutenFree', checked)}
            />
            <Label htmlFor="glutenFree">Gluten-Free</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="highProtein"
              checked={filters.highProtein}
              onCheckedChange={(checked) => setFilter('highProtein', checked)}
            />
            <Label htmlFor="highProtein">High Protein</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
