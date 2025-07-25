const axios = require('axios');
const apiConfig = require('../config/apiConfig');

class GoogleVisionService {
  constructor() {
    this.apiKey = apiConfig.googleCloudVision.key;
    this.baseUrl = apiConfig.googleCloudVision.baseUrl;
  }

  async analyzeImage(imageData) {
    try {
      const requestBody = {
        requests: [
          {
            image: {
              content: imageData
            },
            features: [
              {
                type: 'LABEL_DETECTION',
                maxResults: 10
              },
              {
                type: 'OBJECT_LOCALIZATION',
                maxResults: 10
              },
              {
                type: 'WEB_DETECTION',
                maxResults: 5
              }
            ]
          }
        ]
      };

      const response = await axios.post(
        `${this.baseUrl}/images:annotate?key=${this.apiKey}`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      return this.formatVisionResponse(response.data);
    } catch (error) {
      console.error('Google Vision API Error:', error.response?.data || error.message);
      throw new Error('Failed to analyze image');
    }
  }

  formatVisionResponse(data) {
    const response = data.responses[0];
    return {
      labels: response.labelAnnotations?.map(label => ({
        description: label.description,
        score: Math.round(label.score * 100)
      })) || [],
      objects: response.localizedObjectAnnotations?.map(obj => ({
        name: obj.name,
        score: Math.round(obj.score * 100)
      })) || [],
      webEntities: response.webDetection?.webEntities?.map(entity => ({
        description: entity.description,
        score: Math.round(entity.score * 100)
      })) || []
    };
  }
}

module.exports = new GoogleVisionService();
