const express = require('express');
const { UserController } = require('../controllers');
const { loginValidation } = require('../middlewares');

const router = express.Router();

router.post('/', loginValidation, UserController.login);

module.exports = router;
