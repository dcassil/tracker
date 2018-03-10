const path = require('path');

module.exports = {
	entry: './index.js',
	output: {
		filename: './build/bundle.js'
	},
	resolve: {
		modules: [
			path.resolve('.src/'),
			path.resolve('./__tests__'),
			path.resolve('./node_modules')
		]
	}
};
