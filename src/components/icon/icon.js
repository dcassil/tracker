import React from 'react';
import foundations from 'foundations/*.js';
import 'components/icon/icon.css';

class TopBarMenuIcon extends React.Component {
	
	render() {
		return (
			<span className="trk-icon-vWrapper">
				<span className="trk-icon-hWrapper">
					<img onClick={this.props.onClick} className="trk-topbar-icon" src={'assets/images/icons/' + this.props.filename + '.svg'}/>
				</span>
			</span>
		);
	}
}

export default foundations.store.subscribe(TopBarMenuIcon, {

});

