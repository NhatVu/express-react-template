'use strict'

var express = require('express');
import React from 'react';
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import routes from '../../client/routes';
import NotFound from '../../ui/pages/NotFound.jsx';

module.exports = function(app) {

	app.get('*', (req, res) => {
		console.log("request url", req.url);
		match({
			routes,
			location: req.url
		}, (err, redirectLocation, renderProps) => {
			console.log("redirectLocation: ", redirectLocation);
			console.log("renderProps: ", renderProps);
			// in case of error display the error message
			if (err) {
				return res.status(500).send(err.message);
			}

			// in case of redirect propagate the redirect to the browser
			if (redirectLocation) {
				return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
			}

			// generate the React markup for the current route
			let markup;
			if (renderProps) {
				// if the current route matched we have renderProps
				markup = renderToString(<RouterContext {...renderProps}/>);
			} else {
				// otherwise we can render a 404 page
				markup = renderToString(<NotFound/>);
				res.status(404);
			}

			// render the index template with the embedded React markup
			// return res.redirect("/");
			return res.render('index', {markup});
		});
	});

}
