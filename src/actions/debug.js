import foundations from 'foundations/*.js';

const store = foundations.store;

function log(data) {
	let debugMode = store.get('debug');

	if (debugMode) {
		console.log('DEBUG', data); // eslint-disable-line
	}
}

function error(data) {
	log(data);
	throw new Error(data);
}

function logCatch(e, className, functionName, info) {
	let message = `A Catch was triggered in ${className} at function ${functionName}.  ${info}.  ${e}`;

	log(message);
}

function enable() {
	store.set('debug', true);
}

function disable() {
	store.set('debug', false);
}

module.exports = {
	log,
	logCatch,
	error,
	enable,
	disable,
};


