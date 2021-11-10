const User = require('../models/User');

const getUserByIdDb = async (userId) => {
    return await User.findById(userId).select('-password');
}

module.exports = {
    getUserByIdDb
}