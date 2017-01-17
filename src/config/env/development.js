'use strict'

module.exports = {
    db: 'mongodb://localhost/internship-todo',
    facebook: {
        clientId: '1803191813282480',
        clientSecret: '72a96563ead5f98478a10242c5189eea',
        callbackURI: 'http://localhost:3000/oauth/facebook/callback',
        oauthEndpoint: 'https://www.facebook.com/dialog/oauth',
        accessTokenEndpoint: 'https://graph.facebook.com/v2.7/oauth/access_token',
        responseType: 'code',
        scope: 'public_profile email'
    },
    'base_url': "http:/localhost:" + process.env.PORT
}
