const express = require('express');
const router = express.Router();
const { handleSms } = require('../controllers/smsController');

router.post('/', () => handleSms);

module.exports = router;
