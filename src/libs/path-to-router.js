'use strict';

let pathToRegexp = require('path-to-regexp');
let defaultRoute;
let routes = [];

/**
 * GET route
 *
 * @param {String} pattern - Express.js style route pattern or bare URL string
 * @param {Function} callback
 */
function get(pattern, callback) {
	// Store in internal routes
	routes.push({
		pattern,
		callback
	});
}

/**
 * Match URL to given routes
 *
 * @param {String} url
 */
function match(url) {
	let urlParts = parseUri(url);
	let routesLen = routes.length;

	for (let i = 0; i < routesLen; i++) {
		let keys = [];
		let route = routes[i];
		let re = pathToRegexp(route.pattern, keys); // 'keys' will capture named parameters in route
		let match = re.exec(urlParts.path);

		if (match) {
			let params = {};

			if (keys.length > 0) {
				// Map extracted values back to named parameters in route from 'keys' (based on index position)
				match.slice(1).map(function(param, index) {
					params[keys[index].name] = param;
				});
			}

			// Return matching route info
			return {
				callback: route.callback,
				pattern: route.pattern,
				params,
				url,
				urlParts,
			};
		}
	}

	return false;
}

/**
 * Promise.all that accepts object as paramater i.e. {key1: Promise1, key2: Promise2}
 *
 * @return mixed - resolved promises mapped back to provided keys
 */
function promiseAll(obj) {
	if (obj instanceof Promise) {
		return obj;
	}

	if (Array.isArray(obj)) {
		return Promise.all(obj);
	}

	let keys = Object.keys(obj);
	let promises = keys.map(function(key) {
		return obj[key];
	});

	return Promise.all(promises)
		.then(function(results) {
			return keys.reduce(function(val, key, i) {
				val[key] = results[i];
				return val;
			}, {});
		});
}

// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License
// @link http://blog.stevenlevithan.com/archives/parseuri
function parseUri(str) {
	var o = parseUri.options,
		m = o.parser[o.strictMode ? 'strict' : 'loose'].exec(str),
		uri = {},
		i = 14;

	while (i--) uri[o.key[i]] = m[i] || '';

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function($0, $1, $2) {
		if ($1) uri[o.q.name][$1] = $2;
	});

	return uri;
}
parseUri.options = {
	strictMode: false,
	key: ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'],
	q: {
		name: 'queryKey',
		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	parser: {
		strict: /^(?:([^:/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:/?#]*)(?::(\d*))?))?((((?:[^?#/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose: /^(?:(?![^:@]+:[^:@/]*@)([^:/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#/]*\.[^?#/.]+(?:[?#]|$)))*\/?)?([^?#/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};

function normalizeUrl(url) {
	if (url.startsWith('/')) {
		url = url.substr(1);
	}

	if (url.endsWith('/')) {
		url = url.substring(0, url.length - 1);
	}

	return url;
}

/**
 * Setup hashbang routing
 */
function useHashbang() {
	/**
	 * Handle routing
	 */
	function getHashbangValue() {
		let hash = location.hash || '/';

		return normalizeUrl(hash
			.replace('#!', '')
			.replace('#', '')
			.replace('!', ''));
	}

	function onHashChange() {
		let hashRoute = getHashbangValue();

		if (hashRoute !== undefined) {
			executeRoute('/' + hashRoute);
		}
	}

	function executeRoute(route, tryDefault = true) {
		let matched = match(route);

		if (matched !== false) {
			matched.callback(matched);
		} else {
			if (tryDefault === true && defaultRoute !== undefined) {
				return executeRoute(defaultRoute, false);
			}

			console.log('Route 404', route); // eslint-disable-line no-console
		}
	}

	window.onhashchange = onHashChange;
	onHashChange();
}

function setDefaultRoute(route) {
	defaultRoute = route;
}


module.exports = {
	get,
	match,
	promiseAll,
	setDefaultRoute,
	useHashbang,
};
