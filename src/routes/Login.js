const express = require('express');
const { UserController } = require('../controllers');
const { LoginValidation } = require('../middlewares');

const router = express.Router();

router.post('/', LoginValidation, UserController.login);

module.exports = router;
