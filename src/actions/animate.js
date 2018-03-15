import foundations from 'foundations/*.js';

const after = {
	key: 'animate.after',
	ms200: function() {
		let thisKey = `${module.exports.after.key}.200`;

		window.setTimeout(() => {
			foundations.store.set(thisKey, true);
		}, 200);
	},
};

module.exports = {
	after,
};


