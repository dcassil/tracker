import React from 'react';
import actions from 'actions/*.js';
import foundations from 'foundations/*.js';
import {Line} from 'react-chartjs-2'; //eslint-disable-line
import Record from 'components/tracker/record/trackerRecord';
import Icon from 'components/icon/icon';
import 'screens/tracker.css';

const ranges = ['hour', 'day', 'week', 'month'];

class Tracker extends React.Component {
	constructor() {
		super();

		this.returnToMainIfNoUser = this.returnToMainIfNoUser.bind(this);
		this.handleAddClick = this.handleAddClick.bind(this);
		this.handleRangeChange = this.handleRangeChange.bind(this);
	}
	componentDidMount() {
		actions.tracker.setCurrentId(decodeURI(this.props.q_trackerId));
		document.body.ontouchend = function(e) {
			if (e.target.id === 'myRange') {
				actions.ui.chart.setRange(Math.round(e.target.value / 100) * 100);
			}
		};
	}
	handleAddClick(e) {
		e.stopPropagation();

		actions.ui.record.addPanel.openFor(this.props.tracker.id);
	}
	handleRangeChange(e) {
		actions.ui.chart.setRange(e.target.value);
	}
	returnToMainIfNoUser() {
		this.userTimeout = window.setTimeout(() => {
			window.location.href = '/#';
		}, 2500);
		return (
			<div>
				<span>You are not logged in or No Tracker was found for this id.</span>
				<span>Please wait to be redirected</span>
			</div>
		);
	}
	renderChart() {
		if (!this.props.tracker) return null;
		let range = ranges[Math.round(this.props.chartRange / 100)];
		let consolidatedRecords = actions.tracker.records.consolidateByScope(this.props.tracker.records, range, 30);
		let chartOptions = {
			primary: 'rgba(255,255,255,1)',
			secondary: 'rgba(255,255,255,.3)',
			displayLabels: true,
			range: actions.tracker.records.getMax(consolidatedRecords),
		};
		
		let chartRecords = foundations.myChart.prepareData(consolidatedRecords, chartOptions);

		return <Line data={chartRecords} options={ foundations.myChart.options(chartOptions) } />;
	}
	renderPortrait() {
		let Chart = this.renderChart();

		return (
			<div className="trk-tracker-portrait-wrapper">
				<div className="trk-tracker-portrait-chart">
					{Chart}
				</div>
				<div className="trk-tracker-portrait-chart-options">
					<input type="range" list="myRangeList" min="0" max="300" step="1" value={this.props.chartRange} id="myRange" onChange={this.handleRangeChange}></input>
					<span className="trk-tracker-chart-range-label" >{ranges.map(r => { return <span key={r}>{r}</span>; })}</span>
				</div>
				<div className="trk-tracker-portrait-details">
					<div className="trk-tracker-portrait-details-row">
						<div className="trk-tracker-portrait-details-item">
							<span>Average</span>
							<div className="trk-tracker-portrait-details-item-value">
								<span>{actions.tracker.records.getAverageForCurrentTracker()}</span>
							</div>
						</div>
						<div className="trk-tracker-portrait-details-item">
							<span>Total</span>
							<div className="trk-tracker-portrait-details-item-value">
								<span>{actions.tracker.records.getTotalForCurrentTracker()}</span>
							</div>
						</div>
						<div className="trk-tracker-portrait-details-item">
							<span>Max</span>
							<div className="trk-tracker-portrait-details-item-value">
								<span>{actions.tracker.records.getMaxForCurrentTracker()}</span>
							</div>
						</div>
						<div className="trk-tracker-portrait-details-item">
							<span>Min</span>
							<div className="trk-tracker-portrait-details-item-value">
								<span>{actions.tracker.records.getMinForCurrentTracker()}</span>
							</div>
						</div>
					</div>
				</div>
				<div className="trk-tracker-portrait-details">
					<Icon filename="plus-thin" onClick={this.handleAddClick}/>
				</div>
				{this.renderRecords()}
			</div>
		);
	}
	renderLandscape() {
		return this.renderChart();
	}
	renderRecords() {
		if (!this.props.tracker) return null;

		return (
			<div className="trk-tracker-records-wrapper">
				{this.props.tracker.records.map(record => {
					record.date = new Date(record.date).toString();
					return <Record {...record} key={record.date}/>;
				})}
			</div>
		);
	}
	render() {
		let isPortrait = this.props.isPortrait;

		if (!this.props.user || !this.props.q_trackerId) {
			return this.returnToMainIfNoUser();
		} else {
			window.clearTimeout(this.userTimeout);
		}
		
		let body = isPortrait ? this.renderPortrait() : this.renderLandscape();

		return (
			<div className="trk-screen-tracker-wrapper">
				<div className="trk-tracker-topBar">
					<span>{this.props.tracker && this.props.tracker.id}</span>
					<span><a href="/#">Go Back</a></span>
				</div>
				{body}
			</div>
		);
	}
}

export default foundations.store.subscribe(Tracker, {
	chartRange: 'ui.chart.range',
	isPortrait: 'ui.screen.orientation.portrait',
	user: 'user',
	tracker: 'trackers.current.instance',
});

