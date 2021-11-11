const { 
    authService,
    userService
 } = require('../services');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

const getUserById = async (req, res) => {
    try {
        const user = await authService.getUserById(req.user.id);
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

const userAuthenticationLogin = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await userService.findUserByEmail(email);
        if (!user) {
            res.status(400).json({ errors: [{ param: 'invalidCredentials', msg: 'Invalid Credentials' }]});
        }

        var isValid = await authService.validatePassword(password, user.password);
        if (!isValid) {
            res.status(400).json({ errors: [{ param: 'invalidCredentials', msg: 'Invalid Credentials' }]});
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000},
            (err, token) => {
                if (err) throw err;
                res.json({token});
            })

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
    
}

module.exports = {
    getUserById,
    userAuthenticationLogin
}