const express = require('express');
const router = express.Router();
const ChallengeController = require('../controllers/ChallengeController');
const { requireUserToken, requireServerToken } = require("../routesRestrictions/");

router.post('/:userId', requireUserToken(ChallengeController.addChallenge));
router.get('/:userId', requireUserToken(ChallengeController.getChallenge));
router.post('/del/:userId', requireUserToken(ChallengeController.delChallenge))

module.exports = router;
