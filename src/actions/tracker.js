import actions from 'actions/*.js';
import foundations from 'foundations/*.js';

function initListeners() {
	actions.data.listenToDBCollectionChange('Trackers', 'trackers.all');
}

function add(data) {
	actions.data.remote.add('Trackers', data);
}

function addRecord(TrackerId, data) {
	let saveData = {
		'TrackerId': TrackerId,
		data,
	};

	actions.data.remote.add('TrackerRecords', saveData);
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

function getRecords(containerId) {
	let where = [{
		a: 'TrackerId',
		b: '==',
		c: containerId,
	}];

	return actions.data.remote.get('TrackerRecords', where);
}

module.exports = {
	add,
	set,
	addRecord,
	get,
	getRecords,
	getCurrent,
	setCurrent,
	initListeners,
};


