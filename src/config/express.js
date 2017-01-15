'use strict'

var express = require('express');
//var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var mongoose = require('./mongoose');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongooseModule = require('mongoose');
var path = require("path");

// var cookieParser = require('cookie-parser');

module.exports = function() {
	var app = express();

	// if (process.env.NODE_ENV == 'development')
	//     app.use(morgan('dev'));
	if (process.env.NODE_ENV == 'production')
		app.use(compression());

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));

	app.set('view engine', 'ejs');
	app.set('views', path.join(__dirname, '..', 'views'));
	// config session
	session.Session.prototype.login = function login(user, token, cb) {
		var req = this.req;
		this.regenerate(function(err) {
			if (err) {
				cb(err);
				return;
			}
			req.session._loggedInAt = Date.now();
			req.session.user = user;
			req.session.token = token;
			cb();
		});
	};

	// app.use(cookieParser());
	app.use(session({
		store: new MongoStore({
			mongooseConnection: mongooseModule.connection,
			ttl: (20 * 60)
		}),
		key: "id",
		secret: 'this is a nice secret',
		resave: false,
		saveUninitialized: true
	}));
	// routing file
	require('../app/routes/user.server.route')(app);
	require('../app/routes/todo.server.route')(app);
	require('../app/routes/facebookOAuth.server.route')(app);

	require('../app/routes/reactRoutes')(app);
	app.use(express.static('./public'));

	return app;
}
