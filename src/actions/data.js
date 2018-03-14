import foundations from 'foundations/*.js';

require('firebase/firestore');

const db = foundations.myFirebase.firestore();

const remote = {
	add: function add(key, value) {
		let dataToSave = { userId: window.Tracker.user.uid, data: value };

		return db.collection(key).add(dataToSave)
			.then(docRef => {// eslint-disable-line
				console.log(docRef); // eslint-disable-line
			})
			.catch(error => {// eslint-disable-line
				console.log(error); // eslint-disable-line
			});
	},
	get: function get(key) {
		let collectionRef = db.collection(key);
		let query = collectionRef.where('userId', '==', window.Tracker.user.uid);

		return query
			.get()
			.then(snapshot => {
				let data = [];

				snapshot.forEach(doc => {
					data.push({ id: doc.id, data: doc.data().data });
				});

				return data;
			})
			.catch(error => {// eslint-disable-line
				console.log("Error getting documents: ", error); // eslint-disable-line
			});
	},
	getPublic: function get(key) {
		return db.collection(key).get()
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


