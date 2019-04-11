const express = require('express');
const router = express.Router();
const MarketController = require('../controllers/MarketController/');
const { requireUserToken, requireServerToken } = require("../routesRestrictions/");

router.post('/:itemId', requireUserToken(MarketController.addItem));

router.get('/', requireUserToken(MarketController.getMarket));

router.post('/buy/:itemId', requireUserToken(MarketController.buyItem))

module.exports = router;
