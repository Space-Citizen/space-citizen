const express = require('express');
const router = express.Router();
const MeController = require('../controllers/MeControllers/');
const { requireUserToken } = require("../tokens/");

// get connected user's info
router.get('/info', requireUserToken(MeController.getInfo));

// get connected user's inventory
router.get('/inventory', requireUserToken(MeController.getInventory));

// get connected user's ships
router.get('/ships', requireUserToken(MeController.getShips));

module.exports = router;
