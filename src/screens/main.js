import React from 'react';
import foundations from 'foundations/*.js';
import Tracker from 'components/tracker/base';
import 'screens/main.css';

class Main extends React.Component {

	renderNoTrackers() {
		return <div></div>;
	}
	renderNotSignedIn() {
		return (
			<div><span>Please </span><a href="/#signin">sign in</a></div>
		);
	}
	renderSignedIn() {
		let trackers = this.props.trackers;

		if (trackers) {
			return this.renderTrackers(trackers);
		} else {
			return this.renderNoTrackers();
		}
	}
	renderTrackers(trackers) {
		return (
			<div className="trk-trackers-wrapper">
				{trackers.map(container => {
					return <Tracker {...container.data} key={container.id}/>;
				})}
			</div>
		);
	}
	render() {
		let display = !this.props.user ? this.renderNotSignedIn() : this.renderSignedIn();

		return (
			<div className="trk-main-wrapper">
				<div className="trk-main-body">
					{display}
				</div>
				
			</div>
		);
	}
}

export default foundations.store.subscribe(Main, {
	user: 'user',
	trackers: 'trackers.all',
});

