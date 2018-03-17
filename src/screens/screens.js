import React from 'react';
import actions from 'actions/*.js';
import foundations from 'foundations/*.js';
// import main from 'screens/main';

class Screens extends React.Component {
	render() {
		let name = this.props.screens || 'main';
		
		let Screen = actions.screens.getScreenByName(name); 

		return (
			<div className="trk-screen-wrapper">
				<Screen />
			</div>
			
		);
	}
}

export default foundations.store.subscribe(Screens, {
	screens: 'screens.selected',
});

