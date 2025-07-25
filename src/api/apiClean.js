import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Add a request interceptor to include token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);
export const getProfile = () => API.get('/auth/profile');

// Recipe API
export const getRecipes = () => API.get('/recipes');
export const getRecipeById = (id) => API.get(`/recipes/${id}`);
export const createRecipe = (recipeData) => API.post('/recipes', recipeData);
export const updateRecipe = (id, data) => API.put(`/recipes/${id}`, data);
export const toggleFavorite = (id) => API.post(`/recipes/${id}/favorite`);
export const deleteRecipe = (id) => API.delete(`/recipes/${id}`);

// AI API
export const generateRecipe = (data) => API.post('/ai/generate', data);

export default API;
