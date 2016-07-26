'use strict'

var User = require('mongoose').model('User');
var Token = require('mongoose').model('Token');
var validator = require('is-my-json-valid');
var winston = require('winston');

var validate =  validator({
	required: true,
	type: 'object',
	properties: {
		email: {
			required: true,
			type: 'string'
		},
		password:{
			required: true,
			type: 'string'
		}
	}
});


module.exports.signup = function(req, res){
	var body = req.body; // body contain email and password
	// validate input in angluarjs. front-end
	var user = new User(body);
	// user default role is user, Admine will set role for user after that.
	user.role= 'user';
	
	user.save().then(function(user){
		res.json(user.toPublicJSON());
	}).catch(function(err){
		res.status(404).json(err);
	});
};

module.exports.login = function(req, res){
	winston.info('user.server.controller login function called');
	var body = req.body;
	validate(body);
	if(validate.errors !== null){
		res.send(401).send('Invalid email or password');
		return;
	}

	// authenticate
	var userInstance;
	User.authenticate(body).then(function(user){
		var token = user.generateToken();
		var tokenModelInstace = new Token({
			token: token,
			lastVisited: new Date()
		});

		userInstance = user;

		return tokenModelInstace.save();

	}).then(function(tokenInstace){
		res.header('Auth', tokenInstace.token).json(userInstance.toPublicJSON());

	}).catch(function(err){
		winston.log('error', "authenicate error")
		res.send(err);
	});
};

module.exports.logout = function(req, res){
	var token = req.header('Auth');
	Token.remove({
		token: token
	}).then(function(token){
		if(token == null)
			res.send('logout success');
		else
			throw new Error("You haven't yet logged in");

	}).catch(function(err){
		winston.log('error', 'logout error : ', err);
		res.status(404).send('logout error');
	})
}