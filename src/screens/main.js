import React from 'react';
import store from 'foundations/store';

class Main extends React.Component {

	render() {
		return (
			<div>
				<div className="columns">
					<div className="column is-half is-offset-one-quarter">
					</div>
				</div>
			</div>
		);
	}
}

export default store.subscribe(Main, {

});

