const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check } = require ('express-validator');

const { authController } = require('../controllers');

// @route   GET api/auth
// @desc    auth route
// @access  Public
router.get('/', auth, authController.getUserById);

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post(
    '/',
    [
        check('email', 'Please include a valid email')
            .isEmail(),
        check('password', 'Password is required')
            .exists()
    ], 
    authController.userAuthenticationLogin);

module.exports = router;