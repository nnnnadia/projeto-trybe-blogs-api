const express = require('express');
const { LoginRouter, UserRouter } = require('./routes');
const { ErrorHandler } = require('./middlewares');

const app = express();

app.use(express.json());

app.use('/login', LoginRouter);
app.use('/user', UserRouter);

app.use(ErrorHandler);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
