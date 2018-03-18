import actions from 'actions/*.js';
import foundations from 'foundations/*.js';

let record = {
	loadForCurrent: function() {
		let currentTracker = module.exports.getCurrent();
		
		return module.exports.record.getRecords(currentTracker.id)
			.then(records => {
				foundations.store.set('trackers.records.current', records);
			});
	},
	add: function(TrackerId, data) {
		let saveData = {
			'TrackerId': TrackerId,
			data,
		};
	
		actions.data.remote.add('TrackerRecords', saveData);
	},
	getRecords: function(containerId) {
		let where = [{
			a: 'TrackerId',
			b: '==',
			c: containerId,
		}];
	
		return actions.data.remote.get('TrackerRecords', where);
	}
};

function initListeners() {
	actions.data.listenToDBCollectionChange('Trackers', 'trackers.all');
}

function add(data) {
	actions.data.remote.add('Trackers', data);
}

function get() {
	return actions.data.remote.get('Trackers');
}

function getCurrent() {
	return foundations.store.get('trackers.current');
}

function setCurrent(data) {
	foundations.store.set('trackers.current', data);
}

function set(data) {
	foundations.store.set('trackers.all', data);
}

module.exports = {
	add,
	set,
	get,
	getCurrent,
	setCurrent,
	initListeners,
	record,
};


