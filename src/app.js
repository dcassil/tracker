import React from 'react';
import ReactDOM from 'react-dom';
import 'app.css';
import routes from 'routes/routes'; // eslint-disable-line
import Screens from 'screens/screens';
import TopBar from 'components/topBar/topBar';
import BottomNav from 'components/bottomNav/bottomNav';
import actions from 'actions/*.js';
import foundations from 'foundations/*.js';

actions.ui.screen.initOrientaionListener();

class App extends React.Component {
	render() {
		return (
			<div className="trk-app-wrapper">
				<TopBar />
				<Screens />
				<BottomNav />
			</div>
		);
	}
}

foundations.myFirebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		// User is signed in.
		foundations.store.set('user', user);
		window.Tracker.user = user;

		// init db listeners
		actions.tracker.remote.loadAndInitListeners();
		// ...
	} else {
		// User is signed out.
		// ...
	}
});

ReactDOM.render(<App/>, app);
module.hot.accept();
