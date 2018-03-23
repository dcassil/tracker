import React from 'react';
import actions from 'actions/*.js';
import foundations from 'foundations/*.js';
import Tracker from 'components/tracker/tracker';
import Icon from 'components/icon/icon';
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
			<div className="trk-main-trackers">
				{trackers.map(tracker => {
					return <Tracker {...{ tracker: tracker }} key={tracker.id}/>;
				})}
			</div>
		);
	}
	render() {
		let display = !this.props.user ? this.renderNotSignedIn() : this.renderSignedIn();

		return (
			<div className="trk-main-body">
				{display}
				<div className="trk-main-bottom-bar">
					<Icon onClick={actions.ui.collectionPanel.open} filename="plus"/>
				</div>
			</div>
		);
	}
}

export default foundations.store.subscribe(Main, {
	user: 'user',
	trackers: 'trackers.all',
});

