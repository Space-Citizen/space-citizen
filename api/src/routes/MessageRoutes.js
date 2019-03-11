const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/MessageControllers/');
const { requireUserToken } = require("../routesRestrictions/");

// send a message to a user
router.post('/send', requireUserToken(MessageController.send));

// list messages from and to a user
router.get('/get_messages_from/:userId', requireUserToken(MessageController.getMessagesFrom));

// list contacts
router.get('/list_contacts', requireUserToken(MessageController.listContacts));

// search a contact
router.post('/search_contact', requireUserToken(MessageController.searchContact));

module.exports = router;
