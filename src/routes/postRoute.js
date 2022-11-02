const express = require('express');
const tokenValidation = require('../middlewares/tokenValidation');
const { blogPostController } = require('../controllers');

const router = express.Router();

router.use(tokenValidation);
router.post('/', blogPostController.createBlogPost);
router.get('/', blogPostController.getBlogPosts);
router.get('/:id', blogPostController.getBlogPosts);

module.exports = router;
