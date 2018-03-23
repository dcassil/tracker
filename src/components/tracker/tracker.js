import React from 'react';
import foundations from 'foundations/*.js';
import Icon from 'components/icon/icon';
import actions from 'actions/*.js';
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
		window.location.href = '/#tracker/' + this.props.tracker.id;
	}
	renderChart(records) {
		let chartOptions = {
			primary: 'rgba(255,255,255,1)',
			secondary: 'rgba(255,255,255,.3)',
			displayLabels: true,
			range: actions.tracker.records.getMaxForCurrentTracker(),
			scope: 'day',
		};
		let chartRecords = foundations.myChart.prepareData(records, chartOptions);

		return <Line data={chartRecords} options={foundations.myChart.options(chartOptions)} heigth={90} width={240}/>;
	}
	renderAddRecords() {
		let tracker = this.props.tracker;

		return <AddRecord tracker={tracker} />;
	}
	render() {
		let records = this.props.tracker.records || [];
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
					<div className="trk-tracker-leftCol">
						<div className="trk-tracker-body" onClick={this.handleTrackerClick}>
							<span className="trk-tracker-title" >{this.props.tracker.name}</span>
							<div className="trk-tracker-graphWrapper">
								{Chart}
							</div>
						</div>
					</div>
					<div className="trk-tracker-rightCol">
						<div className="trk-tracker-addWrapper">
							<Icon filename="plus-thin" onClick={this.handleAddClick}/>
						</div>
					</div>
					
					{/* <div className="trk-tracker-bottomBar">
						<input type="button" className="trk-button" value="day" onClick={function() { actions.tracker.current.setChartScope('day'); }}/>
						<input type="button" className="trk-button" value="week" onClick={function() { actions.tracker.current.setChartScope('week'); }}/>
						<input type="button" className="trk-button" value="month" onClick={function() { actions.tracker.current.setChartScope('month'); }}/>
					</div> */}
				</div>
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

