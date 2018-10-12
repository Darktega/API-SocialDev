require('dotenv').config();
require('@google-cloud/debug-agent').start();
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');
const { errorHandler } = require('./middlewares');

const app = express();

// Cargar middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

// Cargar errorHandler
app.use(errorHandler);

app.listen(process.env.PORT, () => console.log(`Started listening on port ${process.env.PORT}!`));
