import React from 'react';
import foundations from 'foundations/*.js';
import Icon from 'components/icon/icon';
import actions from 'actions/*.js';
import Record from 'components/tracker/record/trackerRecord';
import AddRecord from 'components/tracker/record/add/addTrackerRecord';
import 'components/tracker/tracker.css';
import {Line} from 'react-chartjs-2'; //eslint-disable-line

class Tracker extends React.Component {
	constructor() {
		super();

		this.handleTrackerClick = this.handleTrackerClick.bind(this);
		this.renderAddRecords = this.renderAddRecords.bind(this);
		this.handleAddClick = this.handleAddClick.bind(this);
	}
	handleAddClick(e) {
		e.stopPropagation();

		actions.tracker.openAddRecordFor(this.props.tracker.id);
		console.log('add hit');
	}
	handleEditClick(e) {
		e.stopPropagation();
		console.log('edit hit');
	}
	handleTrackerClick() {
		// if (e.target.className === 'chartjs-render-monitor') {
		// 	return;
		// }

		// let previous = this.props.currentTracker;
		// let next = this.props.tracker;

		// if (previous.id === next.id) {
		// 	next = { id: -1 };
		// }

		// actions.tracker.setCurrent(next);
		window.location.href = '/#tracker/' + this.props.tracker.id;
	}
	renderChart(records) {
		let primary = 'rgba(0,0,0,1)';
		let secondary = 'rgba(0,0,0,.3)';
		let chartRecords = foundations.myChart.prepareData(records, { scope: 'day', primary, secondary });

		return <Line data={chartRecords} options={foundations.myChart.options(primary, secondary)} heigth={90} width={240}/>;
	}
	renderRecords(currentTracker, thisTracker) {
		if (currentTracker && thisTracker && currentTracker.id === thisTracker.id) {
			return (
				<div className="trk-tracker-records-wrapper">
					{this.props.tracker.records.map(record => {
						record.date = new Date(record.date).toString();
						return <Record {...record} key={record.date}/>;
					})}
				</div>
			);
		} else {
			return null;
		}
		
	}
	renderAddRecords() {
		let tracker = this.props.tracker;

		return <AddRecord tracker={tracker} />;
	}
	render() {
		let records = this.props.tracker.records || [];
		let recordsComponent = this.renderRecords(this.props.currentTracker, this.props.tracker);
		let Chart = null;
		let AddRecord = null;

		if (records.length > 0) {
			Chart = this.renderChart(records);
		}

		if (this.props.addRecordOpenFor === this.props.tracker.id) {
			AddRecord = this.renderAddRecords();
		}

		return (
			<div className="trk-tracker-wrapper">
				<div className="trk-tracker">
					{AddRecord}
					<div className="trk-tracker-topBar">
						<span>{this.props.tracker.name}</span>
						<div className="trk-tracker-moreWrapper">
							<Icon filename="elipses" onClick={this.handleEditClick}/>
						</div>
					</div>
					<div className="trk-tracker-body" onClick={this.handleTrackerClick}>
						<div className="trk-tracker-graphWrapper">
							{Chart}
						</div>
						<div className="trk-tracker-addWrapper">
							<Icon filename="plus-dark" onClick={this.handleAddClick}/>
						</div>
					</div>
					<div className="trk-tracker-bottomBar">
						<input type="button" className="trk-button" value="day" onClick={function() { actions.tracker.current.setChartScope('day'); }}/>
						<input type="button" className="trk-button" value="week" onClick={function() { actions.tracker.current.setChartScope('week'); }}/>
						<input type="button" className="trk-button" value="month" onClick={function() { actions.tracker.current.setChartScope('month'); }}/>
					</div>
				</div>
				{recordsComponent}
			</div>
		);
	}
}

export default foundations.store.subscribe(Tracker, {
	currentTracker: 'trackers.current.instance',
	addRecordOpenFor: 'trackers.addRecordOpenFor',
	chartScope: 'trackers.current.chart.scope',
	orientation: 'ui.screen.orientation',
});

