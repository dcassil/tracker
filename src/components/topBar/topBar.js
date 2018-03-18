import React from 'react';
import foundations from 'foundations/*.js';
import actions from 'actions/*.js';
import 'components/topBar/topBar.css';
import TopMenu from 'components/topBar/menu/topBarMenu';
import AddCollectionPanel from 'components/tracker/add/addTracker';
import Icon from 'components/icon/icon.js';

class TopBarBase extends React.Component {
	render() {
		let collectionPanelIsOpen = this.props.collectionPanelIsOpen;
		let content = null;

		if (collectionPanelIsOpen) {
			content = <AddCollectionPanel />;
		} else {
			content = <Icon onClick={actions.ui.collectionPanel.open} filename="plus"/>;
		}
		return (
			<div className="trk-topbar-wrapper">
				<TopMenu />
				<div>
					{content}
				</div>
			</div>
		);
	}
}

export default foundations.store.subscribe(TopBarBase, {
	collectionPanelIsOpen: 'ui.addCollectionPanel.isOpen',
});
