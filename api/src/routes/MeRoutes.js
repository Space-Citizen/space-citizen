const express = require('express');
const router = express.Router();
const MeController = require('../controllers/MeController');

//Sign in
router.get('/info', MeController.getInfo);

router.get('/inventory', MeController.getInventory);

module.exports = router;
