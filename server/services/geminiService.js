const axios = require('axios');
const apiConfig = require('../config/apiConfig');

class GeminiService {
  constructor() {
    this.apiKey = apiConfig.geminiAI?.apiKey;
    this.baseUrl = apiConfig.geminiAI?.baseUrl;
    if (!this.apiKey || !this.baseUrl) {
      throw new Error('GeminiService: Missing API key or base URL in configuration.');
    }
  }

  async generateRecipe(prompt, imageData = null) {
    try {
      let requestBody = {
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048
        }
      };

      if (imageData) {
        requestBody.contents[0].parts.push({
          inline_data: {
            mime_type: "image/jpeg",
            data: imageData
          }
        });
      }

      const response = await axios.post(
        `${this.baseUrl}/models/gemini-pro:generateContent?key=${this.apiKey}`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      return this.formatGeminiResponse(response.data);
    } catch (error) {
      const errMsg = error.response?.data?.error?.message || error.response?.data || error.message;
      console.error('Gemini API Error:', errMsg);
      throw new Error('Failed to generate recipe with Gemini AI: ' + errMsg);
    }
  }

  async chatWithAI(message, context = '') {
    try {
      const prompt = context 
        ? `Context: ${context}\n\nUser: ${message}\n\nAI:`
        : message;

      const requestBody = {
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024
        }
      };

      const response = await axios.post(
        `${this.baseUrl}/models/gemini-pro:generateContent?key=${this.apiKey}`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      return this.formatGeminiResponse(response.data);
    } catch (error) {
      const errMsg = error.response?.data?.error?.message || error.response?.data || error.message;
      console.error('Gemini Chat Error:', errMsg);
      throw new Error('Failed to chat with AI: ' + errMsg);
    }
  }

  formatGeminiResponse(data) {
    // Defensive checks for response structure
    if (!data || !Array.isArray(data.candidates) || !data.candidates[0]?.content?.parts?.[0]?.text) {
      return {
        response: 'No valid response from Gemini AI.',
        usage: data?.usageMetadata || null
      };
    }
    const response = data.candidates[0].content.parts[0].text;
    return {
      response: response.trim(),
      usage: data.usageMetadata || null
    };
  }
}

module.exports = new GeminiService();
