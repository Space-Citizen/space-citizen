const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserControllers/');
const { requireUserToken, requireServerToken } = require("../routesRestrictions/");

//Get information about a user according to it's ID or username
router.get('/info/:id', requireUserToken(UserController.getProfileInfo));

// Get a list of all users
router.get('/list', UserController.listUsers);

// Get a list of all users sorted by their amount of money
router.get('/money_leaderboard', UserController.getMoneyLeaderboard);

//// Allowed by the game server only

// Change the online status of a player
router.post('/change_online_status', requireServerToken(UserController.changeOnlineStatus));

// Reset the online status to 0 for all players
router.post('/reset_online_status', requireServerToken(UserController.resetAllOnlineStatus));

// Change the player position
router.post('/changepos', requireServerToken(UserController.changePos));

module.exports = router;
