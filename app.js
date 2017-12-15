'use strict'

//Defining libraries
const express 	  = require('express');
const bodyParser  = require('body-parser');
const app 		  = express();
const api		  = require('./routes')

//Config
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use('/music',api);

module.exports = app;