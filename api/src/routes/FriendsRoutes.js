const express = require('express');
const router = express.Router();
const FriendsController = require('../controllers/FriendsController/');
const { requireUserToken, requireServerToken } = require("../routesRestrictions/");

router.get('/isfriend/:userId', requireUserToken(FriendsController.isFriend));

router.post('/addfriend/:userId', requireUserToken(FriendsController.addFriend));

router.post('/removefriend/:userId', requireUserToken(FriendsController.removeFriend));

router.get('/getfriends/:userId', FriendsController.getFriends);

module.exports = router;
