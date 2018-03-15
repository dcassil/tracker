import React from 'react';
import actions from 'actions/*.js';
import foundations from 'foundations/*.js';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

class Signin extends React.Component {

	render() {
		actions.debug.log(actions); //eslint-disable-line
		let blaw = actions.user; //eslint-disable-line
		
		return (
			<div>
				<StyledFirebaseAuth uiConfig={actions.user.uiConfig} firebaseAuth={foundations.myFirebase.auth()}/>
			</div>
		);
	}
}

export default foundations.store.subscribe(Signin, {

});

