const { DataTypes } = require("sequelize");
const sequelize  = require("../config/sequelize");

const Subscription = sequelize.define('Subscription', {
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  serviceCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  plan: {
    type: DataTypes.ENUM('daily', 'weekly', 'monthly'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  },
  startDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

module.exports = {Subscription}