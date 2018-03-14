const firebase = require('firebase');

require('firebase/firestore');

firebase.initializeApp({
	apiKey: 'AIzaSyAr4msYX0eSfrc2Bgm-dWLAiL87YQ2mk30',
	authDomain: 'tracker-5756d.firebaseapp.com',
	databaseURL: 'https://tracker-5756d.firebaseio.com',
	projectId: 'tracker-5756d',
	storageBucket: 'tracker-5756d.appspot.com',
	messagingSenderId: '263471316363'
});

module.exports = {
	auth: firebase.auth,
	storage: firebase.storage,
	database: firebase.database,
	firestore: firebase.firestore,
};



