const { Subscription } = require('../../models/subscription');
const { Transaction } = require('../../models/transaction');
const logger = require('../utils/logger');
const { generateReference } = require('../utils/helpers');

exports.createSubscription = async (req, res) => {
  try {
    const { msisdn, plan } = req.body;
    
    const subscription = await Subscription.create({
      msisdn,
      serviceCode: process.env.SERVICE_CODE,
      plan,
      amount: getPlanAmount(plan),
      expiryDate: calculateExpiryDate(plan)
    });

    const transaction = await Transaction.create({
      subscriptionId: subscription.id,
      msisdn,
      amount: subscription.amount,
      reference: generateReference()
    });

    res.status(201).json({
      status: 'success',
      data: { subscription, transaction }
    });
  } catch (error) {
    logger.error('Subscription Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create subscription'
    });
  }
};

exports.handleCallback = async (req, res) => {
  try {
    const { reference, status } = req.body;
    
    const transaction = await Transaction.findOne({
      where: { reference },
      include: [Subscription]
    });

    if (!transaction) {
      return res.status(404).json({
        status: 'error',
        message: 'Transaction not found'
      });
    }

    await transaction.update({ status });
    
    if (status === 'success') {
      await transaction.Subscription.update({ status: 'active' });
    }

    res.json({
      status: 'success',
      message: 'Callback processed'
    });
  } catch (error) {
    logger.error('Callback Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to process callback'
    });
  }
};
