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

		return Math.round(tracker.records.map(r => r.value * 1).reduce((a, b) => (a * 1) + (b * 1), 0) / tracker.records.length);
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
	getMax(records) {
		if (records.length <= 0) return 0;

		let data = getValues(records);

		return Math.max(...data);
	},
	consolidateByScope: function(data, scope) {
		let consolidatedData = {};
	
		switch (scope) {
			case 'day':
				consolidatedData = consolidateByDay(data);
				break;
			case 'week':
				consolidatedData = consolidateByWeek(data);
				break;
			case 'month':
				consolidatedData = consolidateByMonth(data);
				break;
			case undefined:
			default:
				consolidatedData = consolidate(data);
				break;
		}
	
		Object.keys(consolidatedData).forEach(key => {
			let millsDate = new Date(key).getTime();
	
			consolidatedData[millsDate] = consolidatedData[key];
			delete consolidatedData[key];
		});
	
		return consolidatedData;
	}
};

function consolidateByDay(data) {
	let consolidatedData = [];

	data.map(item => {
		let d = new Date(item['date']); // eslint-disable-line

		d = removeTime(d);
		consolidatedData[d] = consolidatedData[d] || [];
		consolidatedData[d].push(item.value);
	});

	return consolidatedData;
}

function consolidateByWeek(data) {
	let consolidatedData = [];

	data.map(item => {
		let d = new Date(item['date']); // eslint-disable-line
		
		d = removeTime(d);
		d.setDate(d.getDate() - d.getDay());
		consolidatedData[d] = consolidatedData[d] || [];
		consolidatedData[d].push(item.value);
	});

	return consolidatedData;
}

function consolidateByMonth(data) {
	let consolidatedData = [];

	data.map(item => {
		let d = new Date(item['date']); // eslint-disable-line
		
		d = removeTime(d);
		d.setDate(1);
		consolidatedData[d] = consolidatedData[d] || [];
		consolidatedData[d].push(item.value);
	});

	return consolidatedData;
}

function removeTime(d) {
	d.setHours(0);
	d.setMinutes(0);
	d.setSeconds(0);
	d.setMilliseconds(0);

	return d;
}

function getValues(records) {
	let values = [];

	Object.keys(records).forEach(date => {
		// sum up all values for each date.
		values.push(records[date].reduce((a, b) => (a * 1) + (b * 1), 0));
	});

	return values;
}

function consolidate(data) {
	let consolidatedData = [];

	data.map(item => {
		let d = new Date(item['date']); // eslint-disable-line
		
		consolidatedData[d] = consolidatedData[d] || [];
		consolidatedData[d].push(item.value);
	});

	return consolidatedData;
}
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


