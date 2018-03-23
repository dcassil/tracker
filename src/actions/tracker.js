import foundations from 'foundations/*.js';

let actions;

/**
 * Called by actions.js to avoid circular dependencies.
 */
function init(actionsRef) {
	actions = actionsRef;
}

let remote = {
	save: function(data) {
		actions.data.remote.doc.set('Trackers', data.name, data);
	},
	load: function() {
		actions.data.remote.collection.get('Trackers')
			.then(data => {
				module.exports.set(data);
			});
	},
	loadAndInitListeners: function() {
		module.exports.remote.load();
		actions.data.remote.collection.listenToDBCollectionChange('Trackers', 'trackers.all');
	}
};

const records = {
	getTotalForCurrentTracker() {
		let tracker = module.exports.getCurrent();

		if (!tracker || !tracker.records.length > 0) return 0;

		return tracker.records.map(r => r.value * 1).reduce((a, b) => a + b, 0);
	},
	getAverageForCurrentTracker() {
		let tracker = module.exports.getCurrent();

		if (!tracker || !tracker.records.length > 0) return 0;

		return tracker.records.map(r => r.value * 1).reduce((a, b) => (a * 1) + (b * 1), 0) / tracker.records.length;
	},
	getMinForCurrentTracker() {
		let tracker = module.exports.getCurrent();

		if (!tracker || !tracker.records.length > 0) return 0;

		return Math.min(...tracker.records.map(r => r.value * 1));
	},
	getMaxForCurrentTracker() {
		let tracker = module.exports.getCurrent();

		if (!tracker || !tracker.records.length > 0) return 0;

		return Math.max(...tracker.records.map(r => r.value * 1));
	},
};

function set(data) {
	foundations.store.set('trackers.all', data);
}

function setCurrent(data) {
	foundations.store.set('trackers.current.instance', data);
}

function setCurrentById(id) {
	let tracker = module.exports.getById(id);

	module.exports.setCurrent(tracker);
}

function getCurrent() {
	return foundations.store.get('trackers.current.instance');
}

function getById(id) {
	let trackers = foundations.store.get('trackers.all');

	return trackers && trackers.find(tracker => {
		return tracker.id === id;
	});
}

function openAddRecordFor(id) {
	foundations.store.set('trackers.addRecordOpenFor', id);
}

function closeAddRecord() {
	foundations.store.set('trackers.addRecordOpenFor', null);
}

module.exports = {
	getById,
	getCurrent,
	remote,
	records,
	set,
	setCurrent,
	setCurrentById,
	init,
	openAddRecordFor,
	closeAddRecord,
};


