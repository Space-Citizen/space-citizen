const express = require('express');
const router = express.Router();
const MarketController = require('../controllers/MarketControllers/');
const { requireUserToken } = require("../routesRestrictions/");

// Sell
//router.post('/', requireUserToken(MarketController.sell));

module.exports = router;
