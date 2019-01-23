const express = require('express');
const router = express.Router();
const ShipController = require('../controllers/ShipController');

// Edit ship
router.post('/edit', ShipController.edit);

// get ship equipment
router.get('/inventory/:shipId', ShipController.getInventory)
module.exports = router;
