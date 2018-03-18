import foundations from 'foundations/*.js';

const uiConfig = {
	// Popup signin flow rather than redirect flow.
	signInFlow: 'popup',
	// Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
	signInSuccessUrl: '/main',
	// We will display Google and Facebook as auth providers.
	signInOptions: [
		foundations.myFirebase.auth.GoogleAuthProvider.PROVIDER_ID,
		foundations.myFirebase.auth.EmailAuthProvider.PROVIDER_ID,
		foundations.myFirebase.auth.PhoneAuthProvider.PROVIDER_ID,
	]
};

function signout() {
	foundations.myFirebase.auth().signOut()
		.then(() => {
			foundations.store.set('user', null);
		});
}

function getUser() {
	return foundations.store.get('user');
}

module.exports = {
	uiConfig,
	signout,
	getUser,
};


