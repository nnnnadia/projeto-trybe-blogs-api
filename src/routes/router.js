const express = require('express');
const loginRoute = require('./loginRoute');
const userRoute = require('./userRoute');
const categoriesRoute = require('./categoriesRoute');

const router = express.Router();

router.use('/login', loginRoute);
router.use('/user', userRoute);
router.use('/categories', categoriesRoute);

module.exports = router;
