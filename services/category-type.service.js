const { categoryTypeDb } = require('../db');

const getCategoryTypes = async () => {
    try {
        return await categoryTypeDb.getCategoryTypeDb();
    } catch (err) {
        throw new Error(err.message);
    }
}

const postCategoryType = async (name) => {
    try {
        return await categoryTypeDb.postCategoryTypeDb(name);
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    getCategoryTypes,
    postCategoryType
}