import React from 'react';
import foundations from 'foundations/*.js';
import actions from 'actions/*.js';
import 'components/addCollectionPanel/base.css';

class AddCollectionPanelBase extends React.Component {
	
	componentDidMount() {
		actions.animate.after.ms200();
	}
	render() {
		let className = 'trk-add-collection-panel-wrapper';
		
		if (this.props.after200ms) {
			className += ' open';
		}
		return <div className={className}>add collection</div>;
	}
}

export default foundations.store.subscribe(AddCollectionPanelBase, {
	after200ms: 'animate.after.200',
});

