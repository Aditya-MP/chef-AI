// src/services/api.js
import axios from 'axios';

// Use Vite environment variable for the backend API URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

export async function createRecipe(recipeData) {
  const response = await api.post('/recipes', recipeData);
  return response.data;
}

// You can add more API functions here as needed
