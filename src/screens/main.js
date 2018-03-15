import React from 'react';
import foundations from 'foundations/*.js';
import 'screens/main.css';

class Main extends React.Component {

	renderNotSignedIn() {
		return (
			<div><span>Please </span><a href="/#signin">sign in</a></div>
		);
	}
	render() {
		let display = !this.props.user ? this.renderNotSignedIn() : '';

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
});

