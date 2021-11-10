const { userService } = require('../services');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route   POST api/users
// @desc    Register user
// @access  Public
const registerUser = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {

        let user = await userService.findUserByEmail(email);
        if (user) {
            return res.status(400).json({ errors: [{ param: 'userExists', msg: 'User already exists' }]});
        }

        const registeredUser = await userService.registerUser(name, email, password);

        const payload = {
            user: {
                id: registeredUser.id
            }
        }

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

const getAllUsers = async (req, res) => {
    try {

        const { loginUser } = req.params;

        const users = await userService.findAllUsers(loginUser);

        return res.json(users);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error'); 
    }
}

module.exports = {
    registerUser,
    getAllUsers
}