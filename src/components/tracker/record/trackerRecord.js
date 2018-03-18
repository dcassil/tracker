import React from 'react';
import foundations from 'foundations/*.js';
import 'components/tracker/record/trackerRecords.css';

class Tracker extends React.Component {
	render() {
		let record = this.props;

		return (
			<div className="trk-tracker-records">
				<span>{record.date}</span>
				<span>{record.data.value}</span>
			</div>
		);
	}
}

export default foundations.store.subscribe(Tracker, {

});

