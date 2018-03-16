import actions from 'actions/*.js';
import foundations from 'foundations/*.js';

function addNew(data) {
	actions.data.remote.add('TrackerContainers', data);
}

function addNewInstance(TrackerContainerId, data) {
	let saveData = {
		'TrackerContainerId': TrackerContainerId,
		data,
	};

	actions.data.remote.add('TrackerContainers', saveData);
}

function getTrackerContainers() {
	return actions.data.remote.get('TrackerContainers');
}

function getCurrentContainer() {
	return foundations.store.get('trackers.containers.current');
}

function setCurrentContainer(data) {
	foundations.store.set('trackers.containers.current', data);
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
	getCurrentContainer,
	setCurrentContainer,
};


