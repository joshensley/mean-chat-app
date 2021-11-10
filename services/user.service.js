const { userDb } = require('../db');
const bcrypt = require('bcryptjs');

const findUserByEmail = async (email) => {
    try {
        return await userDb.findUserByEmailDb(email);
    } catch (err) {
        throw new Error(err.message);
    }
}

const findUserById = async (userId) => {
    try {
        return await userDb.findUserById(userId);
    } catch (err) {
        throw new Error(err.message);
    }
}

const findUserExists = async (userId) => {
    try {
        return await userDb.findUserExists(userId);
    } catch (err) {
        throw new Error(err.message);
    }
}

const findAllUsers = async (loginUser) => {
    try {
        return await userDb.findAllUsers(loginUser);
    } catch (err) {
        throw new Error(err.message);
    }
}

const registerUser = async (name, email, password) => {
    try {
        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        return await userDb.registerUserDb(name, email, encryptedPassword);

    } catch (err) {
        throw new Error(err.message);
    }
    
}

module.exports = {
    findUserByEmail,
    findUserById,
    findUserExists,
    findAllUsers,
    registerUser
}