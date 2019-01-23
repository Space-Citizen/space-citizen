const express = require('express');
const router = express.Router();
const MeController = require('../controllers/MeController');

// get connected user's info
router.get('/info', MeController.getInfo);

// get connected user's inventory
router.get('/inventory', MeController.getInventory);

// update user's inventory
router.post('/inventory/update', MeController.updateInventory);

// get connected user's ships
router.get('/ships', MeController.getShips);

module.exports = router;
