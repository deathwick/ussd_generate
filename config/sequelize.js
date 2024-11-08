// require('dotenv').config();
// const mysql = require('mysql2');
// const Sequelize = require("sequelize");

// module.exports = {
//   development: {
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     dialect: 'mysql'
//   },
//   production: {
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     dialect: 'mysql'
//   }
// };

// sequelize.js
const Sequelize = require('sequelize');
const config = require('./config.json');

const sequelize = new Sequelize(config.development);

module.exports = sequelize;

