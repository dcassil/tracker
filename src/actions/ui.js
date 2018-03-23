import foundations from 'foundations/*.js';

const menu = {
	key: 'ui.menu',
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
	},
	close: function() {
		let thisKey = module.exports.collectionPanel.key + '.isOpen';

		foundations.store.set(thisKey, false);
	}
};

const record = {
	addPanel: {
		openFor: function(id) {
			foundations.store.set('ui.record.addPanel.openFor', id);
		},
		close: function() {
			foundations.store.set('ui.record.addPanel.openFor', null);
		}
	}
};

const chart = {
	setRange: function(key) {
		foundations.store.set('ui.chart.range', key);
	}
};

const screen = {
	setIsPortrait: function(key) {
		foundations.store.set('ui.screen.orientation.portrait', key);
		console.log('set portrait =' + key);
	},
	initOrientaionListener: function() {
		window.matchMedia('(orientation: portrait)').addListener(m => {
			module.exports.screen.setIsPortrait(m.matches);
		});
	}
};

module.exports = {
	menu,
	chart,
	collectionPanel,
	record,
	screen,
};


