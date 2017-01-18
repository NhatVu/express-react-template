'use strict'

import express from 'express';
//var morgan = require('morgan');
import compression from 'compression';
import bodyParser from 'body-parser';
import mongoose from './mongoose';
import session from 'express-session';
// const MongoStore = require('connect-mongo')(session);
import connectMongo from 'connect-mongo';
import mongooseModule from 'mongoose';
import path from "path";
import axios from 'axios'

// var cookieParser = require('cookie-parser');

module.exports = function() {
    let app = express();
    let MongoStore = connectMongo(session)
    // if (process.env.NODE_ENV == 'development')
    //     app.use(morgan('dev'));
    if (process.env.NODE_ENV == 'production')
        app.use(compression());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use(express.static(path.join(__dirname, '..', 'public')));
    app.use(express.static(path.join(__dirname, '..', '..', 'node_modules', 'admin-lte')));
    // config session
    session.Session.prototype.login = function login(user, token, cb) {
        let req = this.req;
        this.regenerate(function(err) {
            if (err) {
                cb(err);
                return;
            }
            req.session._loggedInAt = Date.now();
            req.session.user = user;
            req.session.token = token;
            cb();
        });
    };

    // app.use(cookieParser());
    app.use(session({
        store: new MongoStore({
            mongooseConnection: mongooseModule.connection,
            ttl: (20 * 60)
        }),
        key: "id",
        secret: 'this is a nice secret',
        resave: false,
        saveUninitialized: true
    }));

    // routing file
    require('../server/routes/user.server.route')(app);
    require('../server/routes/todo.server.route')(app);
    require('../server/routes/facebookOAuth.server.route')(app);

    // routing for react must place at the end. So other route can you. such as /profile, /test
    // especially api/todos?access_token
    require('../server/routes/reactRoutes')(app);

    return app;
}
