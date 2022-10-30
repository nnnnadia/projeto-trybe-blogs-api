const express = require('express');
const { categoryController } = require('../controllers');
const tokenValidation = require('../middlewares/tokenValidation');

const route = express.Router();

route.use(tokenValidation);
route.post('/', categoryController.createCategory);

module.exports = route;
