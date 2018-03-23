import React from 'react';
import actions from 'actions/*.js';
import TopBar from 'components/topBar/topBar';
import foundations from 'foundations/*.js';
// import main from 'screens/main';

class Screens extends React.Component {
	render() {
		let name = this.props.screens || 'main';
		let options = actions.screens.getCurrentOptions();
		let Screen = actions.screens.getScreenByName(name); 

		return (
			<div className="trk-screen">
				<TopBar />
				<Screen {...options}/>
			</div>
		);
	}
}

export default foundations.store.subscribe(Screens, {
	screens: 'screens.selected',
});

