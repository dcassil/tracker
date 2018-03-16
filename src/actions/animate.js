import foundations from 'foundations/*.js';

const after = {
	key: 'animate.after',
	ms200: function(localObjRef) {
		let thisKey = `${module.exports.after.key}.200`;
		let promise = new Promise((resolve) => {
			window.setTimeout(() => {
				localObjRef.isOpen = true;
				foundations.store.set(thisKey, true);
				resolve();
			}, 200);
		});

		

		return promise;
	},
};

module.exports = {
	after,
};


