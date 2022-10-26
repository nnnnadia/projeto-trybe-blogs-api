const express = require('express');
const { UserController } = require('../controllers');
const { LoginValidation } = require('../middlewares');

const router = express.Router();

router.post('/', LoginValidation.loginValidation, UserController.login);

module.exports = router;
