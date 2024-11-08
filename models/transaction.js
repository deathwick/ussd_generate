const { DataTypes } = require("sequelize");
const  sequelize  = require("../config/sequelize");

const Transaction = sequelize.define('Transaction', {
  msisdn: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed'),
    defaultValue: 'pending'
  },
  reference: {
    type: DataTypes.STRING,
    unique: true
  }
});

module.exports = {Transaction}
