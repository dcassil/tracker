import React from 'react';
import foundations from 'foundations/*.js';
import 'components/topBar/menu/topBarMenu.css';
import MenuPanel from 'components/topBar/menu/panel/topBarMenuPanel';
import Icon from 'components/icon/icon';
import actions from 'actions/*.js';

class TopBarMenu extends React.Component {

	renderClosed() {
		return (
			<div className="trk-topbar-menu">
				<Icon filename="menu" onClick={actions.ui.menu.toggleOpen}/>
				<MenuPanel className="trk-topbar-menu-panel-wrapper" />
			</div>
		);
	}
	renderOpen() {
		return (
			<div className="trk-topbar-menu">
				<Icon filename="menu" onClick={actions.ui.menu.toggleOpen}/>
				<MenuPanel className="trk-topbar-menu-panel-wrapper open" />
			</div>
		);
	}
	render() {
		let isOpen = this.props.menuIsOpen;
		
		if (isOpen) {
			return this.renderOpen();
		} else {
			return this.renderClosed();
		}
	}
}

export default foundations.store.subscribe(TopBarMenu, {
	menuIsOpen: 'ui.menu.isOpen',
});

