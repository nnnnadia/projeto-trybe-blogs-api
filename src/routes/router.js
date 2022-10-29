const express = require('express');
const loginRoute = require('./loginRoute');
const userRoute = require('./userRoute');

const router = express.Router();

router.use('/login', loginRoute);
router.use('/user', userRoute);

module.exports = router;
