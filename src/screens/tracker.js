import React from 'react';
import actions from 'actions/*.js';
import foundations from 'foundations/*.js';
import {Line} from 'react-chartjs-2'; //eslint-disable-line
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
		let primary = 'rgba(255,255,255,1)';
		let secondary = 'rgba(255,255,255,.3)';

		let chartRecords = foundations.myChart.prepareData(this.tracker.records, { scope: 'day', primary, secondary });
		// let LineChart = foundations.myChart.Line;

		return <Line data={chartRecords} options={ foundations.myChart.options(primary, secondary, true) } />;
	}
	render() {
		let trackerId = this.props.trackerId && decodeURI(this.props.trackerId);

		if (!this.props.user || !trackerId) {
			return this.returnToMainIfNoUser();
		} else {
			window.clearTimeout(this.userTimeout);
		}
		this.tracker = this.tracker || actions.tracker.getById(trackerId);

		let Chart = this.renderChart();

		return (
			<div className="trk-screen-tracker-wrapper">
				<div className="trk-tracker-topBar">
					<span>{this.tracker && this.tracker.id}</span>
					<span><a href="/#">Go Back</a></span>
				</div>
				<div className="trk-screen-tracker-body">
					{Chart}
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

