const Sequelize = require('sequelize');
const config = require('../config/config');
const {
  BlogPost: blogPostModel,
  PostCategory: postCategoryModel,
} = require('../models');
const categoryService = require('./categoryService');

const env = process.env.NODE_ENV;
const sequelize = new Sequelize(config[env]);

const createBlogPost = async (postData) => {
  await categoryService.countExistingCategories(postData.categoryIds);
  try {
    const result = await sequelize.transaction(async (t) => {
      const { dataValues } = await blogPostModel.create(postData, { transaction: t });
      const postId = dataValues.id;
      const newPostCategories = postData.categoryIds
        .map((categoryId) => ({ postId, categoryId }));
      await postCategoryModel.bulkCreate(newPostCategories, { transaction: t });
      return dataValues;
    });
    return result;
  } catch (error) {
    if (error.type) throw error;
    throw new Error(error);
  }
};

module.exports = {
  createBlogPost,
};
