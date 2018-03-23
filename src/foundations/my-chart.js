
function getChartOptions(opt) {
	return {
		responsive: true,
		maintainAspectRatio: false,
		legend: {
			display: false,
		},
		scales: {
			xAxes: [{
				display: opt.displayLabels,
				color: opt.secondary,
				scaleLabel: {
					display: false,
					labelString: 'date'
				},
				gridLines: {
					display: true,
					color: opt.secondary,
					stepSize: (opt.range / 10),
					scale: {
						drawTicks: true,
					}
				},
				ticks: {
					display: true,
					beginAtZero: true,
					fontColor: opt.secondary,
					fontSize: 10,
					stepSize: (opt.range / 10),
					drawTicks: true,
					
				},
			}],
			yAxes: [{
				display: opt.displayLabels,
				color: opt.secondary,
				scaleLabel: {
					display: false,
					labelString: 'Value'
				},
				gridLines: {
					display: true,
					color: opt.secondary,
					scale: {
						drawTicks: true,
					}
				},
				ticks: {
					display: true,
					beginAtZero: true,
					fontColor: opt.secondary,
					fontSize: 10,
					stepSize: (opt.range / 10),
					drawTicks: true,
				}
			}]
		},
		hover: {
			mode: 'nearest',
			intersect: true
		},
		title: {
			display: false,
			text: 'Normal Legend'
		}
	};
}

function defaultDataOptions(primary, secondary) {
	return {
		label: 'My First dataset',
		fill: false,
		lineTension: 0.5,
		color: primary,
		backgroundColor: 'rgba(75,192,192,0.4)',
		borderColor: primary,
		borderWidth: 1,
		borderCapStyle: 'butt',
		borderDash: [],
		borderDashOffset: 0.0,
		borderJoinStyle: 'miter',
		pointBorderColor: primary,
		pointBackgroundColor: secondary,
		pointBorderWidth: 1,
		pointHoverRadius: 5,
		pointHoverBackgroundColor: 'rgba(75,192,192,1)',
		pointHoverBorderColor: 'rgba(220,220,220,1)',
		pointHoverBorderWidth: 2,
		pointRadius: 3,
		pointHitRadius: 7,	
	};
}

function prepareData(records, _options) {
	let options = Object.assign({}, defaultDataOptions(_options.primary, _options.secondary), _options);
	let data = {};
	let consolidatedRecords = records.length > 0 ? getConsolidatedDataByScope(records, options.scope) : [];

	consolidatedRecords = sortData(consolidatedRecords);
	data.labels = getLabels(consolidatedRecords);
	data.values = getValues(consolidatedRecords);
	data.datasets = getDataSets(data.values, options);

	return data;
}

function sortData(data) {
	let sortedKeys = Object.keys(data).sort();
	let sortedObject = {};

	sortedKeys.forEach(key => {
		sortedObject[key] = data[key];
	});

	return sortedObject;
}

function getDataSets(data, options) {
	let dataSets = [Object.assign({}, options, { data })];

	console.log(dataSets);
	return dataSets;
}

function getLabels(data) {
	return Object.keys(data).map(key => {
		let x = new Date(key * 1).toLocaleDateString();

		return x.substring(0, x.length - 4) + x.substring(x.length - 2, x.length);
	});
}

function getConsolidatedDataByScope(data, scope) {
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

function getValues(records) {
	let values = [];

	Object.keys(records).forEach(date => {
		// sum up all values for each date.
		values.push(records[date].reduce((a, b) => (a * 1) + (b * 1), 0));
	});

	return values;
}

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
		d.setDate(0);
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

function consolidate(data) {
	let consolidatedData = [];

	data.map(item => {
		let d = new Date(item['date']); // eslint-disable-line
		
		consolidatedData[d] = consolidatedData[d] || [];
		consolidatedData[d].push(item.value);
	});

	return consolidatedData;
}

module.exports = {
	prepareData,
	options: getChartOptions,
};
