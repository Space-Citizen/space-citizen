const express = require('express');
const router = express.Router();
const LeaderboardController = require('../controllers/LeaderboardControllers/');

// Get a list of all users sorted by their amount of money
router.get('/money', LeaderboardController.getMoneyLeaderboard);

module.exports = router;
