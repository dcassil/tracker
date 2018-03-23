import React from 'react';
import actions from 'actions/*.js';
import foundations from 'foundations/*.js';
import {Line} from 'react-chartjs-2'; //eslint-disable-line
import Record from 'components/tracker/record/trackerRecord';
import 'screens/tracker.css';

class Tracker extends React.Component {
	constructor() {
		super();

		this.returnToMainIfNoUser = this.returnToMainIfNoUser.bind(this);
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
		if (!this.tracker) return null;
		let chartOptions = {
			primary: 'rgba(255,255,255,1)',
			secondary: 'rgba(255,255,255,.3)',
			displayLabels: true,
			range: actions.tracker.records.getMaxForCurrentTracker(),
			scope: 'day',
		};
		
		let chartRecords = foundations.myChart.prepareData(this.tracker.records, chartOptions);

		return <Line data={chartRecords} options={ foundations.myChart.options(chartOptions) } />;
	}
	renderPortrait() {
		let Chart = this.renderChart();

		return (
			<div className="trk-tracker-portrait-wrapper">
				<div className="trk-tracker-portrait-chart">
					{Chart}
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
					</div>
					<div className="trk-tracker-portrait-details-row">
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
				<div className="trk-tracker-portrait-records">
					{this.renderRecords()}
				</div>
			</div>
		);
	}
	renderLandscape() {
		return this.renderChart();
	}
	renderRecords() {
		if (!this.tracker) return null;

		return (
			<div className="trk-tracker-records-wrapper">
				{this.tracker.records.map(record => {
					record.date = new Date(record.date).toString();
					return <Record {...record} key={record.date}/>;
				})}
			</div>
		);
	}
	render() {
		let trackerId = this.props.trackerId && decodeURI(this.props.trackerId);
		let isLandscape = this.props.orientation === 'landscape-primary';

		if (!this.props.user || !trackerId) {
			return this.returnToMainIfNoUser();
		} else {
			window.clearTimeout(this.userTimeout);
		}
		this.tracker = this.tracker || actions.tracker.getById(trackerId);
		actions.tracker.setCurrent(this.tracker);
		
		let body = isLandscape ? this.renderLandscape() : this.renderPortrait();

		return (
			<div className="trk-screen-tracker-wrapper">
				<div className="trk-tracker-topBar">
					<span>{this.tracker && this.tracker.id}</span>
					<span><a href="/#">Go Back</a></span>
				</div>
				<div className="trk-screen-tracker-body">
					{body}
				</div>
			</div>
		);
	}
}

export default foundations.store.subscribe(Tracker, {
	chartScope: 'trackers.current.chart.scope',
	orientation: 'ui.screen.orientation',
	user: 'user',
	trackers: 'trackers.all',
});

