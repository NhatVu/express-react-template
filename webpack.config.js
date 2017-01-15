// webpack.config.js
const webpack = require('webpack');
const path = require('path');
var debug = process.env.NODE_ENV !== "production";

module.exports = {
	// context: path.join(__dirname, "src"),
	entry: path.join(__dirname, "src", 'client', 'client.js'),
	devtool: debug
		? "inline-sourcemap"
		: null,
	output: {
		path: path.join(__dirname, 'src', 'public', 'js'),
		filename: 'bundle.js',
		publicPath: '/js/'
	},
	devServer: {
		inline: true,
		port: 3333,
		contentBase: "src/public/",
		historyApiFallback: {
			index: '/index.html'
		}
	},
	module: {
		resolve: {
			extensions: ['', '.js', '.js']
		},
		loaders: [
			{
				test: /.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: ['babel-loader'],
				query: {
					cacheDirectory: 'babel_cache',
					"plugins": ["react-html-attrs"],
					presets: debug
						? ['react', 'es2015', 'react-hmre', 'stage-0']
						: ['react', 'es2015', 'stage-0']
				}
			}
		]
	},
	plugins: debug
		? []
		: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
			}),
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.OccurenceOrderPlugin(),
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				},
				mangle: true,
				sourcemap: false,
				beautify: false,
				dead_code: true
			})
		]
};
