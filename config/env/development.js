'use strict'

module.exports = {
	db: 'mongodb://localhost/internship-todo',
	facebook: {
		clientId : '1033380016697599',
		clientSecret: '11ca05bc9332f0ec32cf6714f5572250',
		callbackURI : 'http://localhost:3000/oauth/facebook/callback',
		oauthEndpoint : 'https://www.facebook.com/dialog/oauth',
		accessTokenEndpoint : 'https://graph.facebook.com/v2.7/oauth/access_token',
		responseType : 'code',
		scope : 'public_profile email'
	}
}