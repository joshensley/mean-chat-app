const User = require('../models/User');

const findUserByEmailDb = async (email) => {
    try {
        return await User.findOne({ email });
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

const findUserById = async (userId) => {
    try {
        return await User.findOne({ _id: userId});
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

const findUserExists = async (userId) => {
    try {
        return await User.findOne({ _id: userId}).select('_id');
    } catch (err) {
        return null;
    }
}

const findAllUsers = async (loginUser) => {
    try {
        return await User.find(
            { _id: { $ne: loginUser } }
            );
    } catch (err) {
        return null;
    }
}

const registerUserDb = async (name, email, password) => {
    try {
        let user = new User({
            name: name,
            email: email,
            password: password,
            avatar_image_title: "",
            avatar_image_uri: ""
        });
    
        await user.save();
    
        return user;

    } catch (err) {
        throw new Error(err.message);
    }
    
}

module.exports = {
    findUserByEmailDb,
    findUserById,
    findUserExists,
    findAllUsers,
    registerUserDb
}