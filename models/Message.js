const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    conversation: {
        type: Schema.Types.ObjectId,
        ref: 'conversation'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Message = mongoose.model('message', MessageSchema);