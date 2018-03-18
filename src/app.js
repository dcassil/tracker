import React from 'react';
import ReactDOM from 'react-dom';
import 'app.css';
import routes from 'routes/routes'; // eslint-disable-line
import Screens from 'screens/screens';
import TopBar from 'components/topBar/topBar';
import BottomNav from 'components/bottomNav/bottomNav';

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
