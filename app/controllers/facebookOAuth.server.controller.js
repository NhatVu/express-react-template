'use strict'

var config = require('../../config/config');
var request = require('request');
var graphAPI = "https://graph.facebook.com/v2.7";
var accessToken = null;
var User = require('mongoose').model('User');
var Token = require('mongoose').model('Token');
var moment = require('moment');
var winston = require('winston');
var url = require('url');

module.exports.oauthFacebook = function (req, res) {
	// open facebook popup for login
	var oauthEndpoint = config.facebook.oauthEndpoint;

	oauthEndpoint += '?client_id=' + config.facebook.clientId
		+ '&redirect_uri=' + config.facebook.callbackURI
		+ '&response_type=' + config.facebook.responseType
		+ '&scope=' + config.facebook.scope;
	console.log(oauthEndpoint);
	res.redirect(oauthEndpoint);
}

// chua xu ly truong hop token cua facebook het han
module.exports.oauthFacebookCallback = function (req, res) {
	var resExpress = res;
	var code = req.query.code;

	var accessTokenEndpoint = config.facebook.accessTokenEndpoint;
	accessTokenEndpoint += '?client_id=' + config.facebook.clientId
		+ '&client_secret=' + config.facebook.clientSecret
		+ '&redirect_uri=' + config.facebook.callbackURI
		+ '&code=' + code;
	//var accessTokenEndpoint = "http://www.google.com.vn";
	request(accessTokenEndpoint, function (err, res, body) {
		var data = JSON.parse(body);
		accessToken = data.access_token;

		//accessToken = 'EAAOr2ojQMP8BAIKY0AuLSUZBEpPaZBHbQV3nRZCghSQyVzla37EEFhCWFXFnOoxZBGZAZB0tYj5ZAb4kxiVGXR4kPPcqyHKdR9FfmsYt21wkcSaGZAaPNkx7OTkmTaoCDZB63oms7v6q8ZBVnrjcZC0y3EVv3fefSDufegjtO6oW9ZCHlQZDZD';
		
		// using this token to get profile information
		var profileURL = graphAPI + '/me?fields=id,email'
			+ '&access_token=' + accessToken;
		winston.log('info', 'profile url: ', profileURL);

		request.get(profileURL, function (errRequest, resRequest, bodyRequest) {
			var body = JSON.parse(bodyRequest);
			var user = req.user;
			var userInstance;
			User.findOne({
				email: body.email
			}).then(function (userResult) {
				// if user with the email is exist and facebook provider exist
				var facebookData = {};
				if (userResult && userResult.providerData && userResult.providerData.facebook) {
					winston.info('existing facebook register');
					return new Promise(function (resolve, reject) {
						resolve(userResult);
					});
				} else if (userResult ) { ///&& typeof(userResult.providerData) == 'undefined'
					winston.info('existing email but not existing facebook');
					facebookData.id = body.id;
					facebookData.accessToken = accessToken;
					userResult.providerData = {};
					userResult.providerData.facebook = facebookData;
					return userResult.save();
				} else {
					// create new user model
					winston.info('not existing anyone');
					var userModel = new User();
					userModel.email = body.email;
					userModel.role = 'user';
					facebookData.id = body.id;
					facebookData.accessToken = accessToken;
					userModel.providerData = {};
					userModel.providerData.facebook = facebookData;
					console.log('new user', userModel);
					return userModel.save();
				}
			}).then(function (user) {
				userInstance = user;
				var token = user.generateToken();
				var tokenModel = new Token({
					token: token,
					provider: 'facebook',
					lastVisited: moment()
				});
				return tokenModel.save();
			}).then(function (tokenR) {
				resExpress.header('Auth', tokenR.token).json(userInstance.toPublicJSON());
			}).catch(function (err) {
				winston.log('error', 'sign in with facebook error :', err);
				resExpress.send(err);
			});
		});
	});
}

module.exports.getProfile = function (req, res) {
	var body;
	var user = req.user;
	var profileURL = graphAPI + '/me?fields=id,name,email,link'
		+ '&access_token=' + user.providerData.facebook.accessToken;
	request.get(profileURL, function (errR, resR, bodyR) {
		body = JSON.parse(bodyR);
		res.json(body);
	});
}