import React from 'react';
import foundations from 'foundations/*.js';
import 'components/topBar/base.css';
import TopMenu from 'components/topBar/menu/base';

class TopBarBase extends React.Component {

	render() {
		return (
			<div className="trk-topbar-wrapper">
				<TopMenu />
			</div>
		);
	}
}

export default foundations.store.subscribe(TopBarBase, {

});

