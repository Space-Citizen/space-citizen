const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserControllers/');
const { requireUserToken } = require("../tokens/");

//Get information about a user according to it's ID or username
router.get('/info/:id', requireUserToken(UserController.getProfileInfo));

module.exports = router;
