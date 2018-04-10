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

let getUserQuery = function() {
	let user = actions.user.getUser();

	if (user)
		return db.collection('Users').doc(user.uid);

	actions.debug.error('Trying to query user scoped data but not able to get user');	
};
let	getUserAllTrackersQuery = function() {
	let userQuery = getUserQuery();

	if (userQuery)
		return userQuery.collection('Trackers');

	actions.debug.error('Trying to query tracker scoped data but not able to get tracker');
};
let	userScopedQuery = function(collectionKey, docKey) {
	if (typeof collectionKey !== 'string') return;
	let userQuery = getUserQuery();

	if (typeof docKey !== 'string') {
		return userQuery.collection(collectionKey)
			.catch(e => {
				actions.debug.logCatch(e, 'Data Actions', 'userScopedQuery', `Collection: ${collectionKey}`);
			});
	} else {
		return userQuery.collection(collectionKey).doc(docKey)
			.catch(e => {
				actions.debug.logCatch(e, 'Data Actions', 'userScopedQuery', `Collection: ${collectionKey}, Doc:${docKey}`);
			});
	}
};
let	getUserTrackerAllRecordsQuery = function() {
	let trackerQuery = getUserTrackerQuery();

	if (trackerQuery)
		return trackerQuery.collection('Records');

	actions.debug.error('Trying to query records scoped data but not able to get record');
};
let	getUserTrackerRecordQuery = function() {
	let trackerQuery = getUserTrackerQuery();
	let recordId = actions.tracker.records.getCurrentId;

	if (trackerQuery && recordId)
		return getUserTrackerAllRecordsQuery.doc(actions.tracker.records.getCurrentId);

	actions.debug.error('Trying to query records scoped data but not able to get record');
};

let userScoped = {
	current: getUserQuery,
	trackers: {
		collection: getUserAllTrackersQuery,
		current: getUserTrackerQuery,
		record: {
			collection: getUserTrackerAllRecordsQuery,
			current: getUserTrackerRecordQuery
		}
	}
};

window.Tracker.data = module.exports = {
	userScopedQuery,
	init,
};


