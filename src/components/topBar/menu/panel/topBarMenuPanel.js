import React from 'react';
import foundations from 'foundations/*.js';
import actions from 'actions/*.js';
import 'components/topBar/menu/panel/topBarMenuPanel.css';

class TopBarMenuPanel extends React.Component {
	renderUserName() {
		return (
			<div>
				<div>
					Welcome {this.props.user.displayName}
				</div>
				<a onClick={actions.user.signout}>Sign out</a>
			</div>
		);	
	}
	renderSignin() {
		return <a href="/#signin">Please sign in</a>;
	}
	render() {
		let userInfo = this.props.user ? this.renderUserName() : this.renderSignin();

		return (
			<div className={this.props.className}>
				<div className="trk-topbar-menu-panel-top"></div>
				<div></div>
				{userInfo}
			</div>);
	}
}

export default foundations.store.subscribe(TopBarMenuPanel, {
	user: 'user',
});

