import React from 'react';
import ReactDOM from 'react-dom';
import 'app.css';
import routes from 'routes/routes'; // eslint-disable-line
import Screens from 'screens/screens';
import actions from 'actions/*.js';
import foundations from 'foundations/*.js';

actions.ui.screen.initOrientaionListener();

class App extends React.Component {
	render() {
		return <Screens />;
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
