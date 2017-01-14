'use strict'

var userController = require('../controllers/user.server.controller');
var authenticationMiddleware = require('../controllers/authenticationMiddleware.server.controller');

module.exports = function(app){
	app.post('/users', userController.signup);

	app.post('/users/login', userController.login);
	app.post('/users/logout', userController.logout);

	app.get('/profile',authenticationMiddleware.requireAuthentication,
	 userController.getProfile);
}
