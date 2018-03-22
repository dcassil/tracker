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
	remote,
	set,
	setCurrent,
	setCurrentById,
	init,
	openAddRecordFor,
	closeAddRecord,
};


