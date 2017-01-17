'use strict'

import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import routes from '../../client/routes';
import NotFound from '../../client/ui/pages/NotFound.jsx';
import authenticationMiddleware from '../controllers/authenticationMiddleware.server.controller';

// var path = require("path");
import path from 'path';

module.exports = function(app) {
    // each request to /admin, it must login.
    //app.use('/admin', authenticationMiddleware.requireAuthentication)
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'));
    });
}
