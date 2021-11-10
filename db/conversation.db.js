const Conversation = require('../models/Conversation');
const Message = require('../models/Message');

const getConversation = async (loginUser, otherUser) => {
    try {

        var conversation = await Conversation.findOne({
            $or: [
                { $and: [{user_one: loginUser}, {user_two: otherUser}] },
                { $and: [{user_one: otherUser}, {user_two: loginUser}] },
            ]
        })
        .populate('user_one', ['-password', '-date'])
        .populate('user_two', ['-password', '-date']);

        return conversation;
    
    } catch (err) {
        // conversation not found return null
        return null;
    }
}

const createConversation = async (loginUser, otherUser) => {
    try {
        let conversation = new Conversation({
            user_one: loginUser,
            user_two: otherUser
        });

        await conversation.save();

        return conversation;

    } catch (err) {
        throw new Error(err.message); 
    }
}

const getMessages = async (conversationId, skip, limit) => {
    console.log(typeof skip, typeof limit);
    try {
        let messages = Message.find({ conversation: conversationId })
            .sort({date: -1})
            .skip(skip)
            .limit(limit);

        return messages;
    } catch (err) {
        // no messages found return []
        return [];
    }
}

const getMessagesCount = async (conversationId) => {
    try {
        let count = Message.find({ conversation: conversationId}).count();
        return count;
    } catch (err) {
        // no messages found return 0 count
        return 0;
    }
}

const postMessage = async (conversation, loginUser, message) => {
    try {

        var message = new Message({
            conversation: conversation,
            user: loginUser,
            message: message
        });

        await message.save();

        return message;

    } catch (err) {
        return err.mesasge;
    }
}

module.exports = {
    getConversation,
    createConversation,
    getMessages,
    getMessagesCount,
    postMessage
}