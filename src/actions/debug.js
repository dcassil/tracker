import foundations from 'foundations/*.js';

const store = foundations.store;

function log(data) {
	let debugMode = store.get('debug');

	if (debugMode) {
		console.log('DEBUG', data); // eslint-disable-line
	}
}

function enable() {
	store.set('debug', true);
}

function disable() {
	store.set('debug', false);
}

module.exports = {
	log,
	enable,
	disable,
};


