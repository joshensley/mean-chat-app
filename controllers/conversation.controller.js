const { conversationService } = require('../services');
const { userService } = require('../services');

const getConversation = async (req, res) => {
    try {

        const { loginUser, otherUser } = req.params;
        let { skip, limit } = req.query;
        skip = parseInt(skip);
        limit = parseInt(limit);

        // find loginUser by id
        const loginUserExists = await userService.findUserExists(loginUser);
        if (!loginUserExists) {
            res.status(400).json({ errors: [{ msg: 'User not found' }]});
        }

        // find otherUser by id
        const otherUserExists = await userService.findUserExists(otherUser);
        if (!otherUserExists) {
            res.status(400).json({ errors: [{ msg: 'User not found' }]});
        }

        var conversation = await conversationService.getConversation(loginUser, otherUser);
        if (!conversation) {
            conversation = await conversationService.createConversation(loginUser, otherUser);
        } 

        var messages = await conversationService.getMessages(conversation._id, skip, limit);

        var totalCount = await conversationService.getMessagesCount(conversation._id);
        var messagesCount = { totalCount };

        var conversationMessages = { conversation, messages, messagesCount };

        return res.json(conversationMessages);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

const postMessage = async (req, res) => {
    try {

        const { conversation, loginUser, message, lastSentMessageDate } = req.body;

        const loginUserExists = await userService.findUserExists(loginUser);
        if (!loginUserExists) {
            res.status(400).json({ errors: [{ msg: 'User not found' }]});
        }

        const returnedMessage = await conversationService.postMessage(conversation, loginUser, message);

        const messages = await conversationService.getMessagesByDate(
            conversation, 
            lastSentMessageDate,
            returnedMessage.date);

        return res.json(messages);


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

module.exports = {
    getConversation,
    postMessage
}