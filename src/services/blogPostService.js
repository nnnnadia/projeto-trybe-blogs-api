const Sequelize = require('sequelize');
const config = require('../config/config');
const {
  BlogPost: blogPostModel,
  PostCategory: postCategoryModel,
  User: userModel,
  Category: categoryModel,
} = require('../models');
const categoryService = require('./categoryService');
const typeError = require('../utils/typeError');

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
    throw new Error();
  }
};

const getAllBlogPosts = async () => {
  try {
    const blogPosts = await blogPostModel.findAll({
      include: [
        { model: userModel, as: 'user', attributes: { exclude: 'password' } },
        { model: categoryModel, as: 'categories' }],
    });
    return blogPosts;
  } catch (_) {
    throw new Error();
  }
};

const isValidPost = async (id) => {
  try {
    const blogPost = await blogPostModel.findOne({ where: { id } });
    if (!blogPost) throw typeError('NOT_FOUND', 'Post does not exist');
  } catch (error) {
    if (error.type) throw error;
    throw new Error();
  }
};

const getBlogPostById = async (id) => {
  try {
    await isValidPost(id);
    const blogPost = await blogPostModel.findOne({
      where: { id },
      include: [
        { model: userModel, as: 'user', attributes: { exclude: 'password' } },
        { model: categoryModel, as: 'categories' }],
    });
    return blogPost;
  } catch (error) {
    if (error.type) throw error;
    throw new Error();
  }
};

const updateBlogPost = async (updatedData, id) => {
  try {
    await isValidPost(id);
    await blogPostModel.update(updatedData, { where: { id } });
  } catch (error) {
    if (error.type) throw error;
    throw new Error();
  }
};

const isOP = async (postId, loggedUserId) => {
  try {
    const { userId } = await blogPostModel.findOne({ where: { id: postId } });
    if (userId !== loggedUserId) throw typeError('UNAUTHORIZED', 'Unauthorized user');
  } catch (error) {
    if (error.type) throw error;
    throw new Error(error);
  }
};

module.exports = {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  isOP,
  isValidPost,
};
