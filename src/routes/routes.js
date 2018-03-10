import router from 'libs/path-to-router';
import actions from 'actions/*.js';

router.get('/', function() {
	actions.screens.setSelected('main');
});

router.get('/signin', function(route) {
	actions.screens.setSelected('signin');
	console.log(route); // eslint-disable-line
});

router.get('/sources', function(route) {
	actions.screens.setSelected('sources');
	console.log(route); // eslint-disable-line
});

router.get('/source/:id', function(route) {
	actions.screens.setSelected('source');
	console.log(route.url); // eslint-disable-line
	console.log(route.params.id); // eslint-disable-line
});

router.useHashbang();
