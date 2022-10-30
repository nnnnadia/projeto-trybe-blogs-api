const { Category: categoryModel } = require('../models');

const createCategory = async ({ name }) => {
  try {
    const category = await categoryModel.create({ name });
    return category;
  } catch (_) {
    throw new Error();
  }
};

const getCategories = async () => {
  try {
    const categories = await categoryModel.findAll();
    return categories;
  } catch (_) {
    throw new Error();
  }
};

module.exports = {
  createCategory,
  getCategories,
};
