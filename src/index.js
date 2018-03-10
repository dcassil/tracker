import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.css';
import routes from 'routes/routes'; // eslint-disable-line
import Screens from 'screens/screens';

const title = 'Arbiter App';

// routes;

class App extends React.Component {
	render() {
		return (
			<div>
				<div className="column is-half is-offset-one-quarter">
					<div className="title">{title}</div>
				</div>
				<Screens />
			</div>
		);
	}
}

ReactDOM.render(<App/>, app);
module.hot.accept();
