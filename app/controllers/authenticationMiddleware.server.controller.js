'use strict'

var User = require('mongoose').model('User');
var Token = require('mongoose').model('Token');
var edCrypto = require('../../config/EDCrypto');
var winston = require('winston');
var moment = require('moment');

/**
 * [requireAuthentication description] for every request that has /api/ in url. 
 * Token expired in 7 days
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
module.exports.requireAuthentication = function(req, res, next){
	var encryptToken = req.header('Auth') || req.query.access_token || '';
	Token.findOne({
		token: encryptToken // token that encrypt by EDCrypto.
	}).then(function(tokenR){
		if(!tokenR)
			throw  Error ('Invalid token');

		if(moment(tokenR.lastVisited) < moment().subtract(30, 'days')){
			// if token is expired, delete token
			tokenR.remove().then(function(){

			}).catch(function(){

			});

			throw Error('Token is expired')
		}

		// if tokenU is valid, update lastVisited
		tokenR.lastVisited = moment();
		tokenR.save().then(function(){
		}).catch(function(err){
			throw Error('Token save fail');
		});

		//var decryptToken = edCrypto.decryptString(encryptToken);

		return User.findByToken(tokenR.token);

	}).then(function(user){
		req.user = user;
		next();
	}).catch(function(err){
		winston.log('error', 'authenticationMiddle.server.controller requireAuthentication method error',err);
		res.status(401).send(err.message);
	})

}