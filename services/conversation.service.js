const { conversationDb } = require('../db');

const getConversation = async (loginUser, otherUser) => {
    try {
        return await conversationDb.getConversation(loginUser, otherUser);
    } catch (err) {
        throw new Error(err.message);
    }
}

const createConversation = async (loginUser, otherUser) => {
    try {
        return await conversationDb.createConversation(loginUser, otherUser);
    } catch (err) {
        throw new Error(err.message);
    }
}

const getMessages = async (conversationId, skip, limit) => {
    try {
        return await conversationDb.getMessages(conversationId, skip, limit);
    } catch (err) {
        throw new Error(err.message);
    }
}

const getMessagesCount = async (conversationId) => {
    try {
        return await conversationDb.getMessagesCount(conversationId);
    } catch (err) {
        throw new Error(err.message);
    }
}

const postMessage = async (conversation, loginUser, message) => {
    try {
        return await conversationDb.postMessage(conversation, loginUser, message);
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    getConversation,
    createConversation,
    getMessages,
    getMessagesCount,
    postMessage
}