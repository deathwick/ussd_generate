const crypto = require('crypto');

exports.generateReference = () => {
  return `REF-${crypto.randomBytes(8).toString('hex')}`;
};

exports.getPlanAmount = (plan) => {
  const amounts = {
    daily: 20,
    weekly: 100,
    monthly: 300
  };
  return amounts[plan] || 0;
};

exports.calculateExpiryDate = (plan) => {
  const now = new Date();
  switch (plan) {
    case 'daily':
      return new Date(now.setDate(now.getDate() + 1));
    case 'weekly':
      return new Date(now.setDate(now.getDate() + 7));
    case 'monthly':
      return new Date(now.setMonth(now.getMonth() + 1));
    default:
      return now;
  }
};
