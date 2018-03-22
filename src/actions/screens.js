import main from 'screens/main';
import signin from 'screens/signin';
import tracker from 'screens/tracker';
import foundations from 'foundations/*.js';

// let actions;

// /**
//  * Called by actions.js to avoid circular dependencies.
//  */
// function init(actionsRef) {
// 	actions = actionsRef;
// }

const store = foundations.store;
const screens = {
	main,
	signin,
	tracker,
};

function getScreenByName(name) {
	return screens[name] || 'div';
}

function getCurrentOptions() {
	return foundations.store.get('screens.selectedOptions');
}

function setSelected(name, options) {
	store.set('screens.selectedOptions', options);
	store.set('screens.selected', name);
}

module.exports = {
	getScreenByName,
	getCurrentOptions,
	setSelected,
};


