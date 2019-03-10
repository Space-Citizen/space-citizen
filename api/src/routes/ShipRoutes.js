const express = require('express');
const router = express.Router();
const shipControllers = require('../controllers/ShipControllers/');
const { requireUserToken } = require("../tokens/");

// Edit ship
router.post('/edit', requireUserToken(shipControllers.edit));

// get ship equipment
router.get('/inventory/:shipId', requireUserToken(shipControllers.getInventory));

// sell ship
router.post('/sell/:shipId', requireUserToken(shipControllers.sell));

module.exports = router;
