const express = require('express');
const loginRoute = require('./loginRoute');
const userRoute = require('./userRoute');
const categoriesRoute = require('./categoriesRoute');
const postRoute = require('./postRoute');

const router = express.Router();

router.use('/login', loginRoute);
router.use('/user', userRoute);
router.use('/categories', categoriesRoute);
router.use('/post', postRoute);

module.exports = router;
