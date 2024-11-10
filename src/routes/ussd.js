const express = require('express');
const router = express.Router();
const { handleUssd } = require('../controllers/ussdController');

router.post('/callback', handleUssd);

module.exports = router;
