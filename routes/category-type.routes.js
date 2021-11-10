const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { categoryTypeController } = require('../controllers');

// @route   GET api/category-type
router.get('/', categoryTypeController.getCategoryTypes);
router.post('/', categoryTypeController.postCategoryType);

module.exports = router;