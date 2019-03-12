const express = require('express');
const router = express.Router();
const shipControllers = require('../controllers/ShipControllers/');
const { requireUserToken } = require("../routesRestrictions/");

// Edit ship
router.post('/edit', requireUserToken(shipControllers.edit, true));

// get ship equipment
router.get('/inventory/:shipId', requireUserToken(shipControllers.getInventory));

// sell ship
router.post('/sell/:shipId', requireUserToken(shipControllers.sell, true));

module.exports = router;
