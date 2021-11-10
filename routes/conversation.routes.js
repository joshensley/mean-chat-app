const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check } = require('express-validator');

const { conversationController } = require('../controllers');

router.get(
    '/:loginUser/:otherUser', 
    auth, 
    conversationController.getConversation);

router.post(
    '/',
    auth,
    conversationController.postMessage);

module.exports = router;