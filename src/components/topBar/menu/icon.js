import React from 'react';
import actions from 'actions/*.js';
import foundations from 'foundations/*.js';
import 'components/topBar/menu/panel.css';

class TopBarMenuIcon extends React.Component {
	
	render() {
		return <img onClick={actions.ui.menu.toggleOpen} className="trk-topbar-menu-icon" src="assets/images/icons/menu.svg" />;
	}
}

export default foundations.store.subscribe(TopBarMenuIcon, {

});

