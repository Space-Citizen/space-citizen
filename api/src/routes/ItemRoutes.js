const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/ItemControllers/');
const { requireUserToken } = require("../tokens/");

//Get all items
router.get('/all', requireUserToken(ItemController.listAll));

//Get information about an item
router.get('/info/:itemId', requireUserToken(ItemController.getInfo));

//Buy an item
router.post('/buy/:itemId', requireUserToken(ItemController.buy));

module.exports = router;
