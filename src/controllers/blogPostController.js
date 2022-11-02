const { authService, blogPostService } = require('../services');

const createBlogPost = async (req, res) => {
  const { authorization } = req.headers;
  const { userId } = authService.loggedUser(authorization);
  const { title, content, categoryIds } = authService.postValidation(req.body);
  const newPost = await blogPostService.createBlogPost({ title, content, categoryIds, userId });
  res.status(201).json(newPost);
};

const getBlogPosts = async (req, res) => {
  const { id } = req.params;
  const blogPosts = id
    ? await blogPostService.getBlogPostById(id)
    : await blogPostService.getAllBlogPosts();
  res.status(200).json(blogPosts);
};

module.exports = {
  createBlogPost,
  getBlogPosts,
};
