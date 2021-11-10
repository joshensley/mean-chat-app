const { authDb } = require('../db');
const bcrypt = require('bcryptjs');

const getUserById = async (userId) => {
    try {
        return await authDb.getUserByIdDb(userId);
    } catch (err) {
        throw new Error(err.message);
    }
} 

const validatePassword = async (userInputPassword, databasePassword) => {
    try {
        return await bcrypt.compare(userInputPassword, databasePassword);
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    getUserById,
    validatePassword
}