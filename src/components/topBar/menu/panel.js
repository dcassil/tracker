import React from 'react';
import foundations from 'foundations/*.js';
import 'components/topBar/menu/panel.css';

class TopBarMenuPanel extends React.Component {
	
	render() {
		return (
			<div className={this.props.className}>
				<div className="trk-topbar-menu-panel-top">		
				</div>
			</div>);
	}
}

export default foundations.store.subscribe(TopBarMenuPanel, {

});

