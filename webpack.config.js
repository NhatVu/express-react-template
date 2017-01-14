// webpack.config.js
const webpack = require('webpack');
const path = require('path');
var debug = process.env.NODE_ENV !== "production";

module.exports = {
	entry: path.join(__dirname, 'client', 'client.js'),
	devtool: debug
		? "inline-sourcemap"
		: null,
	output: {
		path: '/js',
		filename: 'bundle.js',
		publicPath: '/js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: ['babel-loader'],
				query: {
					cacheDirectory: 'babel_cache',
					presets: ['react', 'es2015']
				}
			}
		]
	},
	plugins: debug
		? []
		: [
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.OccurenceOrderPlugin(),
			new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false})
		]
};
