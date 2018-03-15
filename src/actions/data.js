import foundations from 'foundations/*.js';
import actions from 'actions/*.js';

require('firebase/firestore');

const db = foundations.myFirebase.firestore();

const remote = {
	add: function add(key, dataToSave) {
		dataToSave.userId = actions.user.getUser();

		return db.collection(key).add(dataToSave)
			.then(docRef => {
				actions.debug.log(docRef);
			})
			.catch(error => {
				actions.debug.log(error);
			});
	},
	get: function get(key, where) {
		where.unshift({
			a: 'userId',
			b: '==',
			c: window.Tracker.user.uid,
		});

		return exports.remote.getPublic(key, where);
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
					data.push({ id: doc.id, data: doc.data().data });
				});
				
				return data;
			})
			.catch(error => {// eslint-disable-line

			});
	},
};

window.Tracker.data = module.exports = {
	remote,	
};


