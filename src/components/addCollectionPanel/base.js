import React from 'react';
import foundations from 'foundations/*.js';
import actions from 'actions/*.js';
import 'components/addCollectionPanel/base.css';

class AddCollectionPanelBase extends React.Component {
	constructor() {
		super();

		this.handleSubmit = this.handleSubmit.bind(this);
		this.nameChange = this.nameChange.bind(this);
	}

	componentWillMount() {
		this.open = { isOpen: false };
	}
	componentDidMount() {
		actions.animate.after.ms200(this.open);
	}
	componentWillUnmount() {
		this.open.isOpen = false;
		actions.animate.after.ms200();
	}
	handleSubmit(e) {
		e.preventDefault();
		
		actions.tracker.addNew(this.props.currentContainer);
	}
	nameChange(e) {
		this.props.currentContainer.name = e.target.value;
	}
	render() {
		let className = 'trk-add-collection-panel-wrapper';
		
		if (this.open.isOpen && this.props.after200ms) {
			className += ' open';
		}
		return (
			<div className={className}>
				<div className="trk-add-collection-panel-header">
				</div>
				<div className="trk-add-collection-panel-body">
					<form onSubmit={this.handleSubmit} >
						<label htmlFor="trk-addCollectionPanelName">Name</label>
						<input type="text" id="trk-addCollectionPanelName" onChange={this.nameChange} />
						<input type="submit" value="Save" />
					</form>
				</div>
			</div>
		);
	}
}

export default foundations.store.subscribe(AddCollectionPanelBase, {
	after200ms: 'animate.after.200',
	currentContainer: 'trackers.containers.current',
});

