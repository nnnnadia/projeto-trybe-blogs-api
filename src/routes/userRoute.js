const express = require('express');
const { userController } = require('../controllers');

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);

module.exports = router;