const express = require('express');
const router = express.Router();
const tradeController = require('../controllers/tradeController');

router.post('/enter', tradeController.enter);
router.post('/exit', tradeController.exit);

module.exports = router;
