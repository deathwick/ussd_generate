// const { Subscription } = require('../../models/subscription');
// const { Transaction } = require('../../models/subscription');
// const logger = require('../utils/logger');
// const aggregatorService = require('../services/aggregatorService');

// exports.handleSms = async (req, res) => {
//   const { msisdn, message, serviceCode } = req.body;

//   try {
//     const command = message.toLowerCase().trim();
    
//     if (command.startsWith('sub')) {
//       const subscription = await aggregatorService.subscribe(msisdn, 'daily');
//       res.json({
//         status: 'success',
//         message: 'Subscription request received'
//       });
//     } else if (command === 'status') {
//       const subscription = await Subscription.findOne({
//         where: { msisdn, status: 'active' }
//       });
      
//       res.json({
//         status: 'success',
//         message: subscription ? 'Active subscription found' : 'No active subscription'
//       });
//     } else {
//       res.json({
//         status: 'error',
//         message: 'Invalid command'
//       });
//     }
//   } catch (error) {
//     logger.error('SMS Error:', error);
//     res.status(500).json({
//       status: 'error',
//       message: 'Internal server error'
//     });
//   }
// };
