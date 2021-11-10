const { categoryTypeService } = require('../services');

const getCategoryTypes = async (req, res, next) => {
    try {
        const response = await categoryTypeService.getCategoryTypes();
        res.json(response)
        next()
    } catch (err) {
        console.log(err);
    }
}

const postCategoryType = async ( req, res, next) => {
    try {
        await categoryTypeService.postCategoryType('test')
        res.sendStatus(201);
        next();
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getCategoryTypes,
    postCategoryType,
}