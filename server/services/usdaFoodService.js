const axios = require('axios');
const apiConfig = require('../config/apiConfig');

class USDAFoodService {
  constructor() {
    this.apiKey = apiConfig.usdaFoodData.apiKey;
    this.baseUrl = apiConfig.usdaFoodData.baseUrl;
  }

  async searchFoods(query, dataType = 'Foundation') {
    try {
      const response = await axios.get(
        `${this.baseUrl}/foods/search`,
        {
          params: {
            query,
            dataType,
            pageSize: 10,
            api_key: this.apiKey
          }
        }
      );

      return this.formatFoodSearchResponse(response.data);
    } catch (error) {
      console.error('USDA API Error:', error.response?.data || error.message);
      throw new Error('Failed to search foods');
    }
  }

  async getFoodDetails(fdcId) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/food/${fdcId}`,
        {
          params: {
            api_key: this.apiKey
          }
        }
      );

      return this.formatFoodDetails(response.data);
    } catch (error) {
      console.error('USDA API Error:', error.response?.data || error.message);
      throw new Error('Failed to get food details');
    }
  }

  formatFoodSearchResponse(data) {
    return {
      totalHits: data.totalHits,
      foods: data.foods.map(food => ({
        fdcId: food.fdcId,
        description: food.description,
        dataType: food.dataType,
        ingredients: food.ingredients || '',
        nutrients: food.foodNutrients?.map(nutrient => ({
          name: nutrient.nutrientName,
          value: nutrient.value,
          unit: nutrient.unitName
        })) || []
      }))
    };
  }

  formatFoodDetails(data) {
    return {
      fdcId: data.fdcId,
      description: data.description,
      ingredients: data.ingredients || '',
      nutrients: data.foodNutrients?.map(nutrient => ({
        name: nutrient.nutrientName,
        value: nutrient.value,
        unit: nutrient.unitName,
        dailyValue: nutrient.percentDailyValue || null
      })) || []
    };
  }
}

module.exports = new USDAFoodService();
