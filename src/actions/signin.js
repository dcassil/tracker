import myFirebase from 'foundations/my-firebase';

const uiConfig = {
	// Popup signin flow rather than redirect flow.
	signInFlow: 'popup',
	// Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
	signInSuccessUrl: '/signedIn',
	// We will display Google and Facebook as auth providers.
	signInOptions: [
		myFirebase.auth.GoogleAuthProvider.PROVIDER_ID,
		myFirebase.auth.FacebookAuthProvider.PROVIDER_ID
	]
};

module.exports = {
	uiConfig,
};


