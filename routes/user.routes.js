const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check } = require('express-validator');

const { userController } = require('../controllers');

router.post(
    '/', 
    [
        check('name', 'Name is required')
            .not().isEmpty(),
        check('email', 'Please include a valid email')
            .isEmail(),
        check('password', 'Please enter a password with 6 or more characters')
            .isLength({ min: 6 })
        
    ], 
    userController.registerUser);

router.get('/all/:loginUser', auth, userController.getAllUsers);

module.exports = router;