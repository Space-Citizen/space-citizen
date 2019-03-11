const express = require('express');
const router = express.Router();
const FactionController = require('../controllers/FactionControllers');
const { requireUserToken } = require("../routesRestrictions/");

// get information about a faction
router.get('/info/:factionId', requireUserToken(FactionController.getInfo));

// list all factions
router.get('/list', FactionController.list);

module.exports = router;
