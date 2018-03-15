import React from 'react';
import foundations from 'foundations/*.js';
import actions from 'actions/*.js';
import 'components/topBar/base.css';
import TopMenu from 'components/topBar/menu/base';
import Icon from 'components/icon/icon.js';

class TopBarBase extends React.Component {

	render() {
		return (
			<div className="trk-topbar-wrapper">
				<TopMenu />
				<div>
					<Icon onClick={actions.tracker.addNew} filename="plus"/>
				</div>
			</div>
		);
	}
}

export default foundations.store.subscribe(TopBarBase, {

});

