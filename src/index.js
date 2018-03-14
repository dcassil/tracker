import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/main.css';
import routes from 'routes/routes'; // eslint-disable-line
import Screens from 'screens/screens';
import TopBar from 'components/topBar/base';
import BottomNav from 'components/bottomNav/base';

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

ReactDOM.render(<App/>, app);
module.hot.accept();
