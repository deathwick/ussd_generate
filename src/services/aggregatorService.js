const axios = require('axios');
const logger = require('../utils/logger');

class AggregatorService {
  constructor() {
    this.baseUrl = process.env.AGGREGATOR_URL;
    this.apiKey = process.env.AGGREGATOR_API_KEY;
  }

  async subscribe(msisdn, plan) {
    try {
      const response = await axios.post(`${this.baseUrl}/subscribe`, {
        msisdn,
        serviceCode: process.env.SERVICE_CODE,
        plan
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      logger.error('Aggregator subscription error:', error);
      throw error;
    }
  }
}

module.exports = new AggregatorService();
