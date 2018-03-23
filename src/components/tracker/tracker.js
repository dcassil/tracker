import React from 'react';
import foundations from 'foundations/*.js';
import Icon from 'components/icon/icon';
import actions from 'actions/*.js';
import 'components/tracker/tracker.css';
import {Line} from 'react-chartjs-2'; //eslint-disable-line

class Tracker extends React.Component {
	constructor() {
		super();

		actions.ui.chart.setRange('day');
		this.handleTrackerClick = this.handleTrackerClick.bind(this);
		this.handleAddClick = this.handleAddClick.bind(this);
	}
	handleAddClick(e) {
		e.stopPropagation();

		actions.tracker.setCurrentId(this.props.tracker.id);
		actions.ui.record.addPanel.openFor(this.props.tracker.id);
	}
	handleTrackerClick() {
		actions.tracker.setCurrentId(this.props.tracker.id);
		window.location.href = '/#tracker/' + this.props.tracker.id;
	}
	renderChart(records) {
		let consolidatedRecords = actions.tracker.records.consolidateByScope(records, 'day');
		let chartOptions = {
			primary: 'rgba(255,255,255,1)',
			secondary: 'rgba(255,255,255,.3)',
			displayLabels: true,
			range: actions.tracker.records.getMax(consolidatedRecords),
		};
		let chartRecords = foundations.myChart.prepareData(consolidatedRecords, chartOptions);

		return <Line data={chartRecords} options={foundations.myChart.options(chartOptions)} heigth={90} width={240}/>;
	}

	render() {
		let records = this.props.tracker.records || [];
		let Chart = null;

		if (records.length > 0) {
			Chart = this.renderChart(records);
		}

		return (
			<div className="trk-tracker-wrapper">
				<div className="trk-tracker">
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
				</div>
			</div>
		);
	}
}

export default foundations.store.subscribe(Tracker, {
	currentTracker: 'trackers.current.instance',
});

