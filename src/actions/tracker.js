import foundations from 'foundations/*.js';

let actions;

/**
 * Called by actions.js to avoid circular dependencies.
 */
export function init(actionsRef) {
	actions = actionsRef;
}

export class Tracker {
	load() {
		actions.data.userScopedQuery('trackers').get().then(doc => {
			let trackers = doc && doc.data();
	
			this.set('trackers.all', trackers);
			actions.records.remote.load();
		});
	}
	save(tracker) {
		let trackers = this.get('trackers.all');
	
		if (typeof tracker === 'object') {
			actions.data.userScopedQuery('trackers', tracker.name).set(tracker);
		} else {
			actions.data.userScopedQuery('trackers').set(trackers);
		}
	}
	loadAndInitListeners() {
		this.load();
		actions.data.remote.collection.listenToDBCollectionChange('Trackers', 'trackers.all');
	}
	set(data) {
		foundations.store.set('trackers.all', data);
	}
	setCurrent(data) {
		foundations.store.set('trackers.current.instance', data);
	}
	setCurrentById(id) {
		let tracker = this.getById(id);
	
		this.setCurrent(tracker);
	}
	getCurrent() {
		return foundations.store.get('trackers.current.instance');
	}
	getById(id) {
		let trackers = foundations.store.get('trackers.all');
	
		return trackers && trackers.find(tracker => {
			return tracker.id === id;
		});
	}
}
// 	records: {
// 		save: function(trackerKey, UTCTime, newRecord) {
// 			let records = actions.data.remote.doc.get('Records', UTCTime) || [];

// 			records.push(newRecord);
// 			actions.data.remote.doc.set('Records', UTCTime, records).then(() => {
// 				module.exports.remote.load();
// 			});
// 		},
// 		load: function(trackerId) {
// 			let where = { a: 'trackerId', b: '==', c: trackerId };

// 			actions.data.remote.collection.get('Records', where)
// 				.then(data => {
// 					module.exports.set(data);
// 					setCurrentById(getCurrentId());
// 				});
// 		}
// 	}
// };

// const records = {
// 	getTotalForCurrentTracker() {
// 		let tracker = getCurrent();

// 		if (!tracker || !tracker.records.length > 0) return 0;

// 		return tracker.records.map(r => r.value * 1).reduce((a, b) => a + b, 0);
// 	},
// 	getAverageForCurrentTracker() {
// 		let tracker = getCurrent();

// 		if (!tracker || !tracker.records.length > 0) return 0;

// 		return Math.round(tracker.records.map(r => r.value * 1).reduce((a, b) => (a * 1) + (b * 1), 0) / tracker.records.length);
// 	},
// 	getMinForCurrentTracker() {
// 		let tracker = getCurrent();

// 		if (!tracker || !tracker.records.length > 0) return 0;

// 		return Math.min(...tracker.records.map(r => r.value * 1));
// 	},
// 	getMaxForCurrentTracker() {
// 		let tracker = getCurrent();

// 		if (!tracker || !tracker.records.length > 0) return 0;

// 		return Math.max(...tracker.records.map(r => r.value * 1));
// 	},
// 	getMax(records) {
// 		if (records.length <= 0) return 0;

// 		let data = getValues(records);

// 		return Math.max(...data);
// 	},
// 	consolidateByScope: function(data, scope, limit) {
// 		let consolidatedData = {};
	
// 		switch (scope) {
// 			case 'hour':
// 				consolidatedData = consolidateByHour(data);
// 				break;
// 			case 'day':
// 				consolidatedData = consolidateByDay(data);
// 				break;
// 			case 'week':
// 				consolidatedData = consolidateByWeek(data);
// 				break;
// 			case 'month':
// 				consolidatedData = consolidateByMonth(data);
// 				break;
// 			case undefined:
// 			default:
// 				consolidatedData = consolidate(data);
// 				break;
// 		}
// 		let sortedDateKeys = Object.keys(consolidatedData).sort();
// 		let limitedDateKeys = sortedDateKeys.slice(limit * -1);
// 		let newData = {};

// 		limitedDateKeys.forEach(key => {
// 			let label = getLabel(key);
// 			let value = consolidatedData[key];
	
// 			newData[key] = {
// 				label,
// 				value
// 			};
// 		});
	
// 		return newData;
// 	}
// };

// function getLabel(date, scope) {
// 	let x = new Date(date * 1);

// 	switch (scope) {
// 		case 'hour':
// 			return x.toLocaleString();
// 		case 'day':
// 			return x.toLocaleDateString();
// 		case 'week':
// 			return x.toLocaleDateString();
// 		case 'month':
// 			return x.toLocaleDateString();
// 		case undefined:
// 		default:
// 			return x.toLocaleString();
// 	}
// }

// function getValues(records) {
// 	let values = [];

// 	Object.keys(records).forEach(date => {
// 		// sum up all values for each date.
// 		values.push(records[date].value.reduce((a, b) => (a * 1) + (b * 1), 0));
// 	});

// 	return values;
// }

// function consolidateByHour(data) {
// 	let consolidatedData = [];

// 	data.map(item => {
// 		let d = new Date(item['date']); // eslint-disable-line

// 		d = removeTime(d, false, true);
// 		d = d.getTime();
// 		consolidatedData[d] = consolidatedData[d] || [];
// 		consolidatedData[d].push(item.value);
// 	});

// 	return consolidatedData;
// }

// function consolidateByDay(data) {
// 	let consolidatedData = [];

// 	data.map(item => {
// 		let d = new Date(item['date']); // eslint-disable-line

// 		d = removeTime(d);
// 		d = d.getTime();
// 		consolidatedData[d] = consolidatedData[d] || [];
// 		consolidatedData[d].push(item.value);
// 	});

// 	return consolidatedData;
// }

// function consolidateByWeek(data) {
// 	let consolidatedData = [];

// 	data.map(item => {
// 		let d = new Date(item['date']); // eslint-disable-line
		
// 		d = removeTime(d);
// 		d.setDate(d.getDate() - d.getDay());
// 		d = d.getTime();
// 		consolidatedData[d] = consolidatedData[d] || [];
// 		consolidatedData[d].push(item.value);
// 	});

// 	return consolidatedData;
// }

// function consolidateByMonth(data) {
// 	let consolidatedData = [];

// 	data.map(item => {
// 		let d = new Date(item['date']); // eslint-disable-line
		
// 		d = removeTime(d);
// 		d.setDate(1);
// 		d = d.getTime();
// 		consolidatedData[d] = consolidatedData[d] || [];
// 		consolidatedData[d].push(item.value);
// 	});

// 	return consolidatedData;
// }

// function removeTime(d, hours = true, minutes = true) {
// 	hours && d.setHours(0);
// 	minutes && d.setMinutes(0);
// 	d.setSeconds(0);
// 	d.setMilliseconds(0);

// 	return d;
// }

// function consolidate(data) {
// 	let consolidatedData = [];

// 	data.map(item => {
// 		let d = new Date(item['date']); // eslint-disable-line
		
// 		consolidatedData[d] = consolidatedData[d] || [];
// 		consolidatedData[d].push(item.value);
// 	});

// 	return consolidatedData;
// }


