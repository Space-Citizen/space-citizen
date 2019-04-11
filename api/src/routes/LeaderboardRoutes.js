const express = require('express');
const router = express.Router();
const LeaderboardController = require('../controllers/LeaderboardControllers/');

// Get a list of all users sorted by their amount of money
router.get('/money', LeaderboardController.getMoneyLeaderboard);

// Get a list of all users sorted by their amount of experience
router.get('/experience', LeaderboardController.getExperienceLeaderboard);

// Get the ranks of a player
router.get('/ranks/:userId', LeaderboardController.getPlayerRanks);

module.exports = router;
