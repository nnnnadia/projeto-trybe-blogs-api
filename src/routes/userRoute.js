const express = require('express');
const { userController } = require('../controllers');
const tokenValidation = require('../middlewares/tokenValidation');

const router = express.Router();

router.post('/', userController.createUser);
router.use(tokenValidation);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);

module.exports = router;