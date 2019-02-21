const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthControllers');
const { requireUserToken } = require("../tokens/");

//Sign in
router.post('/signin', AuthController.signIn);

//Sign up
router.post('/signup', AuthController.signUp);

// delete user's account
router.delete('/delete', requireUserToken(AuthController.delete));

module.exports = router;
