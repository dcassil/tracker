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

window.createTestData = function(name, xHours, xDay) {
	let _date = new Date();
	let hour = 3600000;
	let day = hour * 24;
	let tracker = {
		id: name,
		name: name,
		records: [],
	};

	for (let i = 0; i < xHours; i++) {
		_date.setTime(_date.getTime() + hour);
		tracker.records.push({
			date: _date.getTime(),
			value: Math.round(Math.random() * 10),
		});
	}

	for (let i = 0; i < xDay; i++) {
		_date.setTime(_date.getTime() + day);
		tracker.records.push({
			date: _date.getTime(),
			value: Math.round(Math.random() * 10),
		});
	}

	actions.tracker.remote.save(tracker);
};

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
