const express = require('express');
const tokenValidation = require('../middlewares/tokenValidation');
const { blogPostController } = require('../controllers');

const router = express.Router();

router.use(tokenValidation);
router.post('/', blogPostController.createBlogPost);
router.get('/', blogPostController.getAllBlogPosts);

module.exports = router;
