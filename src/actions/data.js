import foundations from 'foundations/*.js';
require('firebase/firestore');

let actions;

/**
 * Called by actions.js to avoid circular dependencies.
 */
function init(actionsRef) {
	actions = actionsRef;
}

const db = foundations.myFirebase.firestore();

function getUserWhere() {
	let user = actions.user.getUser();
	
	return {
		a: 'userId',
		b: '==',
		c: user.uid,
	};
}

const remote = {
	doc: {
		set: function(collectionKey, docKey, dataToSave) {
			dataToSave.userId = actions.user.getUser().uid;
	
			return db.collection(collectionKey).doc(docKey).set(dataToSave)
				.then(docRef => {
					actions.debug.log(docRef);
				})
				.catch(error => {
					actions.debug.log(error);
				});
		},
		get: function(collectionKey, docKey, where = []) {
			where.push(getUserWhere());
			return module.exports.remote.doc.getPublic(collectionKey, docKey, where);
		},
		getPublic: function(collectionKey, docKey, where) {
			let query = db.collection(collectionKey).doc(docKey);

			if (where) {
				where.forEach(w => {
					query = query.where(w.a, w.b, w.c);
				});
			}

			return query.get()
				.then(doc => {
					return doc && doc.data();
				})
				.catch(error => {
					actions.debug.log(error);
				});
		},
	},
	collection: {
		get: function get(key, where = []) {
			let w = getUserWhere();
	
			where.push(w);
	
			return module.exports.remote.collection.getPublic(key, where);
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
				.catch(error => {
					actions.debug.log(error);
				});
		},
		listenToDBCollectionChange: function(dbCollectionKey, storeKey) {
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
	}
	
	
};

window.Tracker.data = module.exports = {
	remote,
	init,
};


