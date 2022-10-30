const { authService, categoryService } = require('../services');

const createCategory = async (req, res) => {
  const { name } = authService.categoryValidation(req.body);
  const category = await categoryService.createCategory({ name });
  res.status(201).json(category);
};

module.exports = {
  createCategory,
};
