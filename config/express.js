'use strict'

var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var mongoose = require('./mongoose');

module.exports = function(){
	var app = express();

	if(process.env.NODE_ENV=='development')
		app.use(morgan('dev'));
	else if(process.env.NODE_ENV == 'production')
		app.use(compression());

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	// routing file
	require('../app/routes/user.server.route')(app);
	require('../app/routes/todo.server.route')(app);
	require('../app/routes/facebookOAuth.server.route')(app);

	app.use(express.static('./public'));

	return app;
}