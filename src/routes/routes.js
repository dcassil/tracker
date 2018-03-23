import router from 'libs/path-to-router';
import actions from 'actions/*.js';

router.get('/', function() {
	actions.screens.setSelected('main');
});

router.get('/signin', function() {
	actions.screens.setSelected('signin');
});

router.get('/tracker/:id', function(route) {
	actions.screens.setSelected('tracker', { trackerId: route.params.id });
});

router.useHashbang();
