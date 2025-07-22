export interface Ingredient {
  id: string;
  name: string;
}

export interface Recipe {
  id: string;
  recipeName: string;
  steps: string[];
  requiredIngredients: { name: string; has: boolean }[];
  alternativeSuggestions: string[];
  userId: string;
  createdAt: Date;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userPhotoUrl: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}
