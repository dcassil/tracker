import * as screens from 'actions/screens';
import * as user from 'actions/user';
import * as data from 'actions/data';
import * as ui from 'actions/ui';
import * as Tracker from 'actions/tracker';
import * as debug from 'actions/debug';
import * as animate from 'actions/animate';

const actions = { 
	data,
	debug,
	screens,
	user,
	ui,
	tracker: new Tracker(),
	animate,
};

for (let key in actions) {
	let action = actions[key];

	// Some base actions files like logic and cookies don't use other actions so they won't have init
	if (typeof action.init === 'function') {
		action.init(actions);
	}
}

export default actions;
	
