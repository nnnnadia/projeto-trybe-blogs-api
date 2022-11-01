const { Op } = require('sequelize');
const { Category: categoryModel } = require('../models');
const typeError = require('../utils/typeError');

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

const countExistingCategories = async (categoryIds) => {
  try {
    const { count } = await categoryModel
      .findAndCountAll({ where: { id: { [Op.in]: categoryIds } } });
    if (count !== categoryIds.length) {
      throw typeError('INVALID_FIELD', 'one or more "categoryIds" not found');
    }
  } catch (error) {
    if (error.type) throw error;
    throw new Error(error);
  }
};

module.exports = {
  createCategory,
  getCategories,
  countExistingCategories,
};
