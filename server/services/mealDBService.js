const axios = require('axios');
const apiConfig = require('../config/apiConfig');

class MealDBService {
  constructor() {
    this.baseUrl = apiConfig.mealDB.baseUrl;
  }

  async searchMeals(query) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/search.php?s=${encodeURIComponent(query)}`
      );

      return this.formatMealSearchResponse(response.data);
    } catch (error) {
      console.error('MealDB Search Error:', error.response?.data || error.message);
      throw new Error('Failed to search meals');
    }
  }

  async getMealById(id) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/lookup.php?i=${id}`
      );

      return this.formatMealDetails(response.data);
    } catch (error) {
      console.error('MealDB Details Error:', error.response?.data || error.message);
      throw new Error('Failed to get meal details');
    }
  }

  async getRandomMeal() {
    try {
      const response = await axios.get(
        `${this.baseUrl}/random.php`
      );

      return this.formatMealDetails(response.data);
    } catch (error) {
      console.error('MealDB Random Error:', error.response?.data || error.message);
      throw new Error('Failed to get random meal');
    }
  }

  async getMealsByCategory(category) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/filter.php?c=${encodeURIComponent(category)}`
      );

      return this.formatMealListResponse(response.data);
    } catch (error) {
      console.error('MealDB Category Error:', error.response?.data || error.message);
      throw new Error('Failed to get meals by category');
    }
  }

  async getCategories() {
    try {
      const response = await axios.get(
        `${this.baseUrl}/categories.php`
      );

      return response.data.categories || [];
    } catch (error) {
      console.error('MealDB Categories Error:', error.response?.data || error.message);
      throw new Error('Failed to get categories');
    }
  }

  formatMealSearchResponse(data) {
    if (!data.meals) return { meals: [] };
    
    return {
      meals: data.meals.map(meal => ({
        id: meal.idMeal,
        name: meal.strMeal,
        category: meal.strCategory,
        area: meal.strArea,
        thumbnail: meal.strMealThumb,
        tags: meal.strTags ? meal.strTags.split(',') : []
      }))
    };
  }

  formatMealDetails(data) {
    if (!data.meals || data.meals.length === 0) return null;
    
    const meal = data.meals[0];
    const ingredients = [];
    
    // Extract ingredients and measurements
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure ? measure.trim() : ''
        });
      }
    }

    return {
      id: meal.idMeal,
      name: meal.strMeal,
      category: meal.strCategory,
      area: meal.strArea,
      instructions: meal.strInstructions,
      thumbnail: meal.strMealThumb,
      youtube: meal.strYoutube,
      source: meal.strSource,
      tags: meal.strTags ? meal.strTags.split(',') : [],
      ingredients
    };
  }

  formatMealListResponse(data) {
    if (!data.meals) return { meals: [] };
    
    return {
      meals: data.meals.map(meal => ({
        id: meal.idMeal,
        name: meal.strMeal,
        thumbnail: meal.strMealThumb
      }))
    };
  }
}

module.exports = new MealDBService();
