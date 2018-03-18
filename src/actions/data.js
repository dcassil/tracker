import foundations from 'foundations/*.js';
import actions from 'actions/*.js';

require('firebase/firestore');

const db = foundations.myFirebase.firestore();

function getUserWhere() {
	let user = actions.user.getUser();
	
	return {
		a: 'userId',
		b: '==',
		c: user.uid,
	};
}

function listenToDBCollectionChange(dbCollectionKey, storeKey) {
	let w = getUserWhere();

	db.collection(dbCollectionKey)
		.where(w.a, w.b, w.c)
		.onSnapshot(snapshot => {
			let data = [];

			snapshot.docs.forEach(doc => {
				let result = doc.data();

				result.id = doc.id;
				data.push(result);
			});

			foundations.store.set(storeKey, data);
		});
}

const remote = {
	add: function add(key, dataToSave) {
		dataToSave.userId = actions.user.getUser().uid;

		return db.collection(key).add(dataToSave)
			.then(docRef => {
				actions.debug.log(docRef);
			})
			.catch(error => {
				actions.debug.log(error);
			});
	},
	get: function get(key, where) {
		let w = getUserWhere();

		where.push(w);

		return module.exports.remote.getPublic(key, where);
	},
	getPublic: function get(key, where) {
		let query = db.collection(key);

		if (where) {
			where.forEach(w => {
				query = query.where(w.a, w.b, w.c);
			});
		}
		
		return query.get()
			.then(snapshot => {
				let data = [];

				snapshot.forEach(doc => {
					let result = doc.data();

					result.id = doc.id;
					data.push(result);
				});
				
				return data;
			})
			.catch(error => {// eslint-disable-line

			});
	},
};

window.Tracker.data = module.exports = {
	remote,
	listenToDBCollectionChange,
};


