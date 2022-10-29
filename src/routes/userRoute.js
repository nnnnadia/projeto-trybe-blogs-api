const express = require('express');
const { UserController } = require('../controllers');
const { newUserValidation } = require('../middlewares');

const router = express.Router();

router.post('/', newUserValidation, UserController.createUser);
router.get('/', UserController.getAllUsers);

module.exports = router;