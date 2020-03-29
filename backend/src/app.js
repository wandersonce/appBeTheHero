const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');
const app = express();

app.use(cors()); //configure who can access the app from the front-end
app.use(express.json()); //Using req body as json
app.use(routes); //will use the routes.js
app.use(errors()); //use the errors traitment from the celebrate api


module.exports = app;