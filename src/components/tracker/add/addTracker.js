import React from 'react';
import foundations from 'foundations/*.js';
import actions from 'actions/*.js';
import 'components/tracker/add/addTracker.css';

class AddCollectionPanelBase extends React.Component {
	constructor() {
		super();

		this.tracker = { records: [] };
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
		actions.animate.after.ms200(this.open);
	}
	handleSubmit(e) {
		e.preventDefault();
		let tracker = this.tracker;
		
		actions.tracker.remote.save(tracker);
		actions.ui.collectionPanel.close();
	}
	handleCancelClick() {
		actions.ui.collectionPanel.close();
	}
	nameChange(e) {
		this.tracker.name = e.target.value;
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
					<form className="trk-form" onSubmit={this.handleSubmit} >
						<span>
							<label htmlFor="trk-fomr-label">Name</label>
							<input className="trk-form-text" type="text" id="trk-form-text" onChange={this.nameChange} />
						</span>
						<input className="trk-form-button" type="submit" defaultValue="Save" />
						<input className="trk-form-button" 
							type="cancel"
							defaultValue="Cancel"
							onClick={this.handleCancelClick} />
					</form>
				</div>
			</div>
		);
	}
}

export default foundations.store.subscribe(AddCollectionPanelBase, {
	after200ms: 'animate.after.200',
});

