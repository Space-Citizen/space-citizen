const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/ItemController');

//Get all items
router.get('/all', ItemController.listAllItems);

//Get information about an item
router.get('/info/:itemId', ItemController.getItemInfo);

//Buy an item
router.post('/buy/:itemId', ItemController.buy);

module.exports = router;
