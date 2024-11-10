require('dotenv').config();
const express = require('express');
const sequelize  = require('../config/sequelize');
const logger = require('./utils/logger');

const app = express();
app.use(express.json());

// Routes
// Index route
app.get('/', (req, res) => {
    res.json({
      status: 'success',
      message: 'Welcome to USSD Generate API',
      version: '1.0.0'
    });
  });
  
app.use('/api/ussd', require('./routes/ussd'));
app.use('/api/sms', require('./routes/sms'));
app.use('/api/subscriptions', require('./routes/subscription'));

const PORT = process.env.PORT || 6000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log('Unable to connect to database:', error);
  }
}

startServer();
