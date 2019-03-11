const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserControllers/');
const { requireUserToken, requireServerToken } = require("../routesRestrictions/");

//Get information about a user according to it's ID or username
router.get('/info/:id', requireUserToken(UserController.getProfileInfo));

router.get('/', UserController.getUsers);

//// Allowed by the game server only

// Change the online status of a player
router.post('/change_online_status', requireServerToken(UserController.changeOnlineStatus));

// Change the player position
router.post('/changepos', requireServerToken(UserController.changePos));

module.exports = router;
