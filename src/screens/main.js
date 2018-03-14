import React from 'react';
import foundations from 'foundations/*.js';
import actions from 'actions/*.js';

class Main extends React.Component {

	signout() {
		foundations.myFirebase.auth().signOut()
			.then(() => {
				foundations.store.set('user', null);
			});
	}
	testAdd() {
		let data = { test: 'test', yay: 1 };

		actions.data.remote.add('test', data);
	}
	renderSignedIn() {
		return (
			<div>Welcome {this.props.user.displayName}</div>
		);
	}
	renderNotSignedIn() {
		return (
			<a href="/#signin">Please sign in</a>
		);
	}
	render() {
		let display = this.props.user ? this.renderSignedIn() : this.renderNotSignedIn();

		return (
			<div>
				<div className="columns">
					{display}
					<div className="column is-half is-offset-one-quarter">
					</div>
					<a onClick={this.testAdd}>Test Add </a>
					<a onClick={this.signout}>Sign out</a>
				</div>
			</div>
		);
	}
}

export default foundations.store.subscribe(Main, {
	user: 'user',
});

