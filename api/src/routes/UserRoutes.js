const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

//Get information about a user according to it's ID or username
router.get('/profile_info/:id', UserController.getProfileInfo);

module.exports = router;
