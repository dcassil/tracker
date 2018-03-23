import React from 'react';
import actions from 'actions/*.js';
import foundations from 'foundations/*.js';
import 'components/tracker/record/add/addTrackerRecord.css';

class Tracker extends React.Component {
	constructor() {
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleValueOnChange = this.handleValueOnChange.bind(this);
		this.handleDateOnChange = this.handleDateOnChange.bind(this);
		this.handleCancelClick = this.handleCancelClick.bind(this);
	}
	handleValueOnChange(e) {
		this.recordValue = e.target.value;
	}
	handleDateOnChange(e) {
		this.recordDate = e.target.value;
	}
	handleSubmit(e) {
		e.preventDefault();

		let tracker = this.props.tracker;
		let value = this.recordValue;
		let record = {};
		let date = new Date().getTime();

		if (this.recordDate) {
			date = new Date(this.recordDate).getTime();
		}

		record.value = value;
		record.date = date;

		tracker.records.push(record);

		actions.tracker.remote.save(tracker);
		actions.ui.record.addPanel.close();
	}
	handleCancelClick() {
		actions.ui.record.addPanel.close();
	}
	render() {
		let now = new Date();
		let offset = now.getTimezoneOffset() * 60 * 1000;
		let mills = now.getTime();
		let utcNow = new Date(mills - offset).toISOString();

		utcNow = utcNow.substring(0, utcNow.indexOf('.'));
		return (
			<div className="trk-tracker-record-add-wrapper">
				<form className="trk-tracker-record-add-form" onSubmit={this.handleSubmit} >
					<span>
						<label htmlFor="trk-value">Value</label>
						<input type="number" id="trk-value" 
							className="trk-tracker-record-add-form-value" 
							onChange={this.handleValueOnChange} />
					</span>
					<span>
						<label htmlFor="trk-date">Date</label>
						<input type="datetime-local" id="trk-date"
							className="trk-tracker-record-add-form-date"
							onChange={this.handleDateOnChange} value={utcNow} />
					</span>
					<input className="trk-form-button" type="submit" defaultValue="Save" />
					<input className="trk-form-button" 
						type="cancel"
						defaultValue="Cancel"
						onClick={this.handleCancelClick} />
				</form>
				
			</div>
		);
	}
}

export default foundations.store.subscribe(Tracker, {

});

