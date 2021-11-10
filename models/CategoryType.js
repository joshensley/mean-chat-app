const mongoose = require('mongoose');

const CategoryTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = CategoryType = mongoose.model('categoryType', CategoryTypeSchema);