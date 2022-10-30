const { authService, categoryService } = require('../services');

const createCategory = async (req, res) => {
  const { name } = authService.categoryValidation(req.body);
  const category = await categoryService.createCategory({ name });
  res.status(201).json(category);
};

const getCategories = async (_req, res) => {
  const categories = await categoryService.getCategories();
  res.status(200).json(categories);
};

module.exports = {
  createCategory,
  getCategories,
};
