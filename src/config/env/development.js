'use strict'

module.exports = {
	db: 'mongodb://localhost/internship-todo',
	facebook: {
		clientId : '575835819273024',
		clientSecret: '0ef0ea2ac652069a0358bb5e25cbb7e3',
		callbackURI : 'http://localhost:3000/oauth/facebook/callback',
		oauthEndpoint : 'https://www.facebook.com/dialog/oauth',
		accessTokenEndpoint : 'https://graph.facebook.com/v2.7/oauth/access_token',
		responseType : 'code',
		scope : 'public_profile email'
	}
}
