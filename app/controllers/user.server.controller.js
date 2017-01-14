'use strict'

var User = require('mongoose').model('User');
var Token = require('mongoose').model('Token');
var validator = require('is-my-json-valid');
var winston = require('winston');
var moment = require('moment');
var graphAPI = "https://graph.facebook.com/v2.7";
var request = require('request');

var validate = validator({
	required: true,
	type: 'object',
	properties: {
		email: {
			required: true,
			type: 'string'
		},
		password: {
			required: true,
			type: 'string'
		}
	}
});


module.exports.signup = function (req, res) {
	var body = req.body; // body contain email and password
	// validate input in angluarjs. front-end
	// find if email exist don db
	User.findOne({
		email: body.email
	}).then(function (user) {
		// if user exist
		if (user) {
			user.password = body.password;
			return user.save();
		} else {
			var user = new User(body);
			// user default role is user, Admine will set role for user after that.
			user.role = 'user';
			return user.save();
		}
	}).then(function(userR){
		res.json(userR.toPublicJSON());
	}).catch(function (err) {
		winston.log('error', 'local signup error', err);
		res.status(404).json(err);
	})
};

module.exports.login = function (req, res) {
	let body = req.body;
	let token = null;
	validate(body);
	if (validate.errors !== null) {
		res.send(401).send('Invalid email or password');
		return;
	}

	// authenticate
	let userInstance;
	User.authenticate(body).then(function (user) {
		token = user.generateToken();
		let tokenModelInstace = new Token({
			token: token,
			provider: 'local',
			lastVisited: moment()
		});

		userInstance = user;

		return tokenModelInstace.save();

	}).then(function (tokenInstace) {
		req.session.login(userInstance, token,function(err){
			res.header('Auth', tokenInstace.token).json(userInstance.toPublicJSON());
		})

	}).catch(function (err) {
		winston.log('error', "authenicate error")
		res.send(err);
	});
};

module.exports.logout = function (req, res) {
	var token = req.header('Auth') || req.query.access_token || "";
	Token.remove({
		token: token
	}).then(function (token) {
		req.session.destroy();
		if (token.result.n !== 0)
			res.send('logout success');
		else
			throw new Error("You haven't yet logged in");

	}).catch(function (err) {
		winston.log('error', 'logout error : ', err);
		res.status(404).send('logout error');
	})
}

// get profile - either local and facebook, google
module.exports.getProfile = function (req, res) {
	// console.log("------------- user in session ", req.session);
	var body;
	var user = req.session.user;
	var profileURL = graphAPI + '/me?fields=id,name,email,link'
		+ '&access_token=' + user.providerData.facebook.accessToken;
	request.get(profileURL, function (errR, resR, bodyR) {
		body = JSON.parse(bodyR);
		res.json(body);
	});
}
