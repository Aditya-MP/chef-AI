require('dotenv').config();

module.exports = {
  geminiAI: {
    apiKey: process.env.GEMINI_API_KEY || '',
    baseUrl: process.env.GEMINI_BASE_URL || 'https://generativelanguage.googleapis.com/v1'
  }
};
