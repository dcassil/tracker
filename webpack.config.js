const webpack = require('webpack');
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
		extensions: ['*', '.js', '.jsx', '.css'],
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
			filename: 'bundle.css',
			allChunks: true
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
			}
		})
	],
	devServer: {
		contentBase: './dist',
		historyApiFallback: true
	}
};

if (process.env.NODE_ENV === 'production') {
	config.devtool = 'cheap-module-source-map';
	config.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true
		}),
		new webpack.optimize.AggressiveMergingPlugin({
			minSizeReduce: 1,
			moveToParents: true
		})
	);
} else {
	config.devtool = 'cheap-module-eval-source-map';
	config.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true
		})
	);
}

module.exports = config;
