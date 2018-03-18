import React from 'react';
import foundations from 'foundations/*.js';
import 'components/tracker/tracker.css';

class Tracker extends React.Component {
	render() {
		return (
			<div className="trk-tracker">
				{this.props.name}
			</div>
		);
	}
}

export default foundations.store.subscribe(Tracker, {
});

