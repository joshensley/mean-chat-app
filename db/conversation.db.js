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
    try {
        let messages = Message.find({ conversation: conversationId })
            .populate('user', ['-avatar_image_title', '-avatar_image_uri', '-password', '-date', '-__v'])
            .sort({date: -1})
            //.skip(skip)
            //.limit(limit);

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

const getMessagesByDate = async (conversation, lastSendMessageDate, postMessageDate) => {
    try {
        
        // if there are no messages in the conversation
        // use the message that was just sent
        if (lastSendMessageDate === undefined) {

            let messages = Message.find({
                $and: [
                    { conversation: conversation },
                    { date: { $gte: postMessageDate } }
                ]
            })
            .populate('user', ['-avatar_image_title', '-avatar_image_uri', '-password', '-date', '-__v'])
            .sort({date: 1})

            return messages;

        } else {
            let messages = Message.find({
                $and: [
                    { conversation: conversation },
                    { date: { $gt: lastSendMessageDate } }
                ]
            })
            .populate('user', ['-avatar_image_title', '-avatar_image_uri', '-password', '-date', '-__v'])
            .sort({date: 1})
    
            console.log(messages);

            return messages;
        }

    } catch (err) {
        return [];
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
    getMessagesByDate,
    postMessage
}