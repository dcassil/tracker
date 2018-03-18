import React from 'react';
import foundations from 'foundations/*.js';
import Icon from 'components/icon/icon';
import actions from 'actions/*.js';
import Record from 'components/tracker/record/trackerRecord';
import 'components/tracker/tracker.css';

class Tracker extends React.Component {
	constructor() {
		super();

		this.handleTrackerClick = this.handleTrackerClick.bind(this);
		this.trackerOwnedRecords = this.trackerOwnedRecords.bind(this);
	}
	trackerOwnedRecords() {
		let records = this.props.currentRecords;
		let tracker = this.props.tracker;

		return records.filter(record => {
			return record.TrackerId === tracker.id;
		});
	}
	handleTrackerClick() {
		let previous = actions.tracker.getCurrent();
		let next = this.props.tracker;

		if (previous.id === next.id) {
			next = { id: -1 };
		}

		actions.tracker.setCurrent(next);
		actions.tracker.record.loadForCurrent();
	}	
	render() {
		let records = this.trackerOwnedRecords();

		return (
			<div className="trk-tracker-wrapper">
				<div className="trk-tracker" onClick={this.handleTrackerClick}>
					<div className="trk-tracker-topBar">
						<span>{this.props.tracker.name}</span>
						<Icon filename="edit" onClick={actions.tracker.record.loadForCurrent}/>
					</div>
					<div className="trk-tracker-body">
						<div className="trk-tracker-graphWrapper">
						</div>
						<div className="trk-tracker-addWrapper">
							<Icon filename="plus" onClick={actions.tracker.record.loadForCurrent}/>
						</div>
					</div>
				</div>
				<div className="trk-tracker-records-wrapper">
					{records.map(record => {
						return <Record {...record} key={record.id}/>;
					})}
				</div>
				
				
			</div>
		);
	}
}

export default foundations.store.subscribe(Tracker, {
	currentRecords: 'trackers.records.current',
});

