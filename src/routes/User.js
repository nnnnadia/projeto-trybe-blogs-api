const express = require('express');
const { UserController } = require('../controllers');
const { NewUserValidation } = require('../middlewares');

const router = express.Router();

router.post('/', NewUserValidation, UserController.createUser);
router.get('/', UserController.getAllUsers);

module.exports = router;