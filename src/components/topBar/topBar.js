import React from 'react';
import foundations from 'foundations/*.js';
import 'components/topBar/topBar.css';
import TopMenu from 'components/topBar/menu/topBarMenu';
import AddRecordPanel from 'components/tracker/record/add/addTrackerRecord';
import AddTrackerPanel from 'components/tracker/add/addTracker';

class TopBarBase extends React.Component {
	render() {
		let collectionPanelIsOpen = this.props.collectionPanelIsOpen;
		let addRecordOpenFor = this.props.addRecordOpenFor;
		let tracker = this.props.tracker;
		let AddTracker = null;
		let AddRecord = null;

		if (collectionPanelIsOpen) {
			AddTracker = <AddTrackerPanel />;
		}

		if (tracker && addRecordOpenFor === tracker.id) {
			AddRecord = <AddRecordPanel tracker={this.props.tracker} />;
		}

		return (
			<div className="trk-topbar-wrapper">
				<TopMenu />
				<div>
					{AddTracker}
					{AddRecord}
				</div>
			</div>
		);
	}
}

export default foundations.store.subscribe(TopBarBase, {
	collectionPanelIsOpen: 'ui.addCollectionPanel.isOpen',
	addRecordOpenFor: 'ui.record.addPanel.openFor',
	tracker: 'trackers.current.instance',
});

