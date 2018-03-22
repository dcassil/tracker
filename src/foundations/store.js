const toystore = require('toystore');
const toystoreReact = require('toystore-react');

const keys = {
	screens: {
		selected: 'main',
		selectedOptions: {},
	},
	user: null,
	ui: {
		menu: {
			isOpen: false,
		},
		addCollectionPanel: {
			isOpen: false,
		},
		screen: {
			orientation: window.screen.orientation.type,
		},
	},
	animate: {
		after: {
			'200': false, 
		}
	},
	debug: false,
	trackers: {
		current: {
			instance: null,
			chart: {
				scope: 'day',
			}
		},
		all: [],
		addRecordOpenFor: null,
	}
};

let store = toystore.create(keys);

store.keys = keys;

// Use partial application to add the 'subscribe' method from toystore-react, bound to this store
store.subscribe = (Component, mapping) => toystoreReact.subscribe(store, Component, mapping);

module.exports = store;
