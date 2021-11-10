const CategoryType = require('../models/CategoryType');

const getCategoryTypeDb = async () => {
    return await CategoryType.find();
}

const postCategoryTypeDb = async (name) => {
    const categoryType = new CategoryType({
        name: name
    });

    await categoryType.save();

    return categoryType;
}

module.exports = {
    getCategoryTypeDb,
    postCategoryTypeDb
}