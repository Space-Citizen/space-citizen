const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/ItemControllers/');
const { requireUserToken } = require("../routesRestrictions/");

//Get all items
router.get('/all', requireUserToken(ItemController.listAll));

//Get information about an item
router.get('/info/:itemId', requireUserToken(ItemController.getInfo));

//Buy an item
router.post('/buy/:itemId', requireUserToken(ItemController.buy));

//Sell an item
router.post('/sell/:itemId', requireUserToken(ItemController.sell, true));

module.exports = router;
