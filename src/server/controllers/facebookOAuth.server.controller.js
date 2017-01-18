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
import axios from 'axios'
module.exports.oauthFacebook = function(req, res) {
    // open facebook popup for login
    var oauthEndpoint = config.facebook.oauthEndpoint;

    oauthEndpoint += '?client_id=' + config.facebook.clientId + '&redirect_uri=' + config.facebook.callbackURI + '&response_type=' + config.facebook.responseType + '&scope=' + config.facebook.scope;
    res.redirect(oauthEndpoint);
}

// chua xu ly truong hop token cua facebook het han
module.exports.oauthFacebookCallback = function(reqExpress, resExpress) {
    var code = reqExpress.query.code;

    var accessTokenEndpoint = config.facebook.accessTokenEndpoint;
    accessTokenEndpoint += '?client_id=' + config.facebook.clientId + '&client_secret=' + config.facebook.clientSecret + '&redirect_uri=' + config.facebook.callbackURI + '&code=' + code;
    request(accessTokenEndpoint, function(err, res, body) {
        var data = JSON.parse(body);
        accessToken = data.access_token;
        // using this token to get profile information
        var profileURL = graphAPI + '/me?fields=id,email' + '&access_token=' + accessToken;

        // use request module to access URL
        request.get(profileURL, function(errRequest, resRequest, bodyRequest) {
            let body = JSON.parse(bodyRequest);
            let user = reqExpress.session.user;
            let userInstance;
            User.findOne({email: body.email}).then(function(userResult) {
                // if user with the email is exist and facebook provider exist
                let facebookData = {};
                if (userResult) {
                    // if facebook provider exists, you must update access_token
                    facebookData.id = body.id;
                    facebookData.accessToken = accessToken;
                    userResult.providerData = {};
                    userResult.providerData.facebook = facebookData;
                    return userResult.save();
                } else {
                    // if facebook is not exists, create new user model
                    let userModel = new User();
                    userModel.email = body.email;
                    userModel.role = ['user'];
                    facebookData.id = body.id;
                    facebookData.accessToken = accessToken;
                    userModel.providerData = {};
                    userModel.providerData.facebook = facebookData;
                    return userModel.save();
                }
            }).then(function(user) {
                userInstance = user;
                var token = user.generateToken();
                var tokenModel = new Token({token: token, provider: 'facebook'});
                return tokenModel.save();
            }).then(function(tokenR) {
                // winston.info("-------------------session.id", reqExpress.session.id);
                // console.log("-------------------session", reqExpress.session);
                let token = tokenR.token;
                reqExpress.session.login(userInstance, token, function(err) {
                    //resExpress.header('Auth', token).json(userInstance.toPublicJSON());
                    resExpress.redirect('/admin')
                })
            }).catch(function(err) {
                winston.log('error', 'sign in with facebook error :', err);
                resExpress.send(err);
            });
        });
    });
}
