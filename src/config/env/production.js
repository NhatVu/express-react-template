'use stric'

module.exports = {
	db: 'mongodb://minhnhat:vuminhnhatnhat123@ds111489.mlab.com:11489/heroku_xqwgb0vz',
	facebook: {
		clientId: '575835819273024',
		clientSecret: '0ef0ea2ac652069a0358bb5e25cbb7e3',
		callbackURI: 'https://express-react-template.herokuapp.com/oauth/facebook/callback',
		oauthEndpoint: 'https://www.facebook.com/dialog/oauth',
		accessTokenEndpoint: 'https://graph.facebook.com/v2.7/oauth/access_token',
		responseType: 'code',
		scope: 'public_profile email'
	}
}
