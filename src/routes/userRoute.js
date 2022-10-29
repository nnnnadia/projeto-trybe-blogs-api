const express = require('express');
const { userController } = require('../controllers');
const { newUserValidation } = require('../middlewares');

const router = express.Router();

router.post('/', newUserValidation, userController.createUser);
router.get('/', userController.getAllUsers);

module.exports = router;