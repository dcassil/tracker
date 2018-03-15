import foundations from 'foundations/*.js';

const menu = {
	key: 'ui.menu.isOpen',
	isOpen: function() {
		let thisKey = `${module.exports.menu.key}.isOpen`;

		return foundations.store.get(thisKey);
	},
	toggleOpen: function() {
		let thisKey = `${module.exports.menu.key}.isOpen`;
		let isOpen = module.exports.menu.isOpen();

		foundations.store.set(thisKey, !isOpen);
	}
};

const collectionPanel = {
	key: 'ui.addCollectionPanel',
	open: function() {
		let thisKey = module.exports.collectionPanel.key + '.isOpen';

		foundations.store.set(thisKey, true);
	}
};

module.exports = {
	menu,
	collectionPanel,
};


