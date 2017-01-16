'use strict'

import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import routes from '../../client/routes';
import NotFound from '../../client/ui/pages/NotFound.jsx';
// var path = require("path");
import path from 'path';

module.exports = function(app) {
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'));
    });
}
