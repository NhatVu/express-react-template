'use strict'
import mongoose from 'mongoose'
import edCrypto from '../../config/EDCrypto';
import winston from 'winston';
import moment from 'moment';

let User = mongoose.model('User');
let Token = mongoose.model('Token');
/**
 * [requireAuthentication description] for every request that has /api/ in url.
 * Token expired in 7 days
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
module.exports.apiAuthentication = function(req, res, next) {
    var encryptToken = req.header('Auth') || req.query.access_token || '';
    let token = null;
    Token.findOne({
        token: encryptToken // token that encrypt by EDCrypto.
    }).then(function(tokenR) {
        if (!tokenR)
            throw Error('You must contain valid token in your query');

        // if token is valid, update createdAt. Each request must update createdAt
        tokenR.createdAt = Date.now();
        tokenR.save().then(function() {}).catch(function(err) {
            throw Error('Token save fail');
        });
        token = tokenR.token;
        return User.findByToken(tokenR.token);

    }).then(function(user) {
        req.session.login(user, token, function() {
            next();
        })
    }).catch(function(err) {
        winston.log('error', 'authenticationMiddle.server.controller apiAuthentication method error', err);
        res.status(401).send(err.message);
    })
}

module.exports.requireAuthentication = function(req, res, next) {
    // user authenticationMiddle
    if (req.session.user) {
        next();
    } else {
        res.redirect("/login");
    }
}
