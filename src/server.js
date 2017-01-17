'use strict'

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var PORT = process.env.PORT || 3000;
var mongoose = require('./config/mongoose');
var express = require('./config/express');
let path = require("path");

// execute mongoose first, because we need model for the other thing
mongoose();

var app = express();
app.listen(PORT, function() {
    console.log('Server listen at port: ', PORT);
})
