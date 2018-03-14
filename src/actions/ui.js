import foundations from 'foundations/*.js';

const menu = {
	key: 'ui.menu.isOpen',
	isOpen: function() {
		return foundations.store.get(module.exports.menu.key);
	},
	toggleOpen: function() {
		let isOpen = module.exports.menu.isOpen();

		foundations.store.set(module.exports.menu.key, !isOpen);
	}
};

module.exports = {
	menu,
};


