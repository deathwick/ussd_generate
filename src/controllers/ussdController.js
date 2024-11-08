const { Subscription } = require('../../models/subscription');
const logger = require('../utils/logger');
const aggregatorService = require('../services/aggregatorService');

exports.handleUssd = async (req, res) => {
  const { sessionId, serviceCode, phoneNumber, text } = req.body;
  let response = '';

  try {
    if (text === '') {
      response = `Welcome to Our Brivas Short Code Service
      1. Subscribe
      2. Check Balance
      3. View Status
      4. Exit`;
    } else {
      const textArray = text.split('*');
      const level = textArray.length;

      switch(level) {
        case 1:
          switch(textArray[0]) {
            case '1':
              response = `CON Select Plan:
              1. Daily (N20)
              2. Weekly (N100)
              3. Monthly (N300)`;
              break;
            case '2':
              const subscription = await Subscription.findOne({
                where: { msisdn: phoneNumber, status: 'active' }
              });
              response = `END Your subscription is ${subscription ? 'active' : 'inactive'}`;
              break;
            default:
              response = 'END Invalid selection';
          }
          break;
        case 2:
          if (textArray[0] === '1') {
            const plan = textArray[1];
            await aggregatorService.subscribe(phoneNumber, plan);
            response = 'END Subscription successful!';
          }
          break;
      }
    }
  } catch (error) {
    logger.error('USSD Error:', error);
    response = 'END An error occurred. Please try again.';
  }

  res.set('Content-Type: text/plain');
  res.send(response);
};
