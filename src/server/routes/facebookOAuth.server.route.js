'use strict'
var facebookOAuthController  = require('../controllers/facebookOAuth.server.controller');
var authenticationMiddleware = require('../controllers/authenticationMiddleware.server.controller');

module.exports = function (app) {
	app.route("/oauth/facebook")
		.get(facebookOAuthController.oauthFacebook);

	app.route('/oauth/facebook/callback')
		.get(facebookOAuthController.oauthFacebookCallback);

	// app.get('/profile',authenticationMiddleware.requireAuthentication,
	//  facebookOAuthController.getProfile);
}
