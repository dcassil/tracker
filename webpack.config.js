const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const config = {
	entry: [
		'./src/index.js'
	],
	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			use: [
				'react-hot-loader',
				'babel-loader'
			]
		},
		{
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				use: ['css-loader']
			})
		},
		{
			test: /\.js$/,
			exclude: /node_modules/,
			use: ['babel-loader', 'eslint-loader']
		}]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx'],
		modules: [
			path.resolve('./src'),
			path.resolve('./node_modules')
		]
	},
	output: {
		path: path.join(__dirname, '/dist'),
		publicPath: '/',
		filename: 'bundle.js'
	},
	plugins: [
		new ExtractTextPlugin({ // define where to save the file
			filename: path.join(__dirname, '/dist/bundle.css'),
			allChunks: true
		})
	],
	devServer: {
		contentBase: './dist',
		historyApiFallback: true
	}
};

module.exports = config;
