import actions from 'actions/*.js';

function addNew(data) {
	actions.data.remote.add('TrackerContainer', data);
}

function addNewInstance(TrackerContainerId, data) {
	let saveData = {
		'TrackerContainerId': TrackerContainerId,
		data,
	};

	actions.data.remote.add('TrackerContainer', saveData);
}

function getTrackerContainers() {
	return actions.data.remote.get('TrackerContainer');
}

function getTrackersForContianer(containerId) {
	let where = [{
		a: 'TrackerContainerId',
		b: '==',
		c: containerId,
	}];

	return actions.data.remote.get('TrackerInstance', where);
}

module.exports = {
	addNew,
	addNewInstance,
	getTrackerContainers,
	getTrackersForContianer,
};


