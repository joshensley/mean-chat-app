const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    user_one: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    user_two: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

module.exports = Conversation = mongoose.model('conversation', ConversationSchema);