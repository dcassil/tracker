import main from 'screens/main';
import signin from 'screens/signin';

const store = require('foundations/store');
const screens = {
	main,
	signin,
};

function getScreenByName(name) {
	return screens[name] || 'div';
}

function setSelected(name) {
	store.set('screens.selected', name);
}

module.exports = {
	getScreenByName,
	setSelected,
};


