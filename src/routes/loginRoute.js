const express = require('express');
const { userController } = require('../controllers');
const { loginValidation } = require('../middlewares');

const router = express.Router();

router.post('/', loginValidation, userController.login);

module.exports = router;
