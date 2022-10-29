const express = require('express');
require('express-async-errors');
const { errorHandler } = require('./middlewares');
const router = require('./routes/router');

const app = express();

app.use(express.json());

app.use(router);

app.use(errorHandler);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
