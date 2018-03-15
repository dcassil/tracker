import actions from 'actions/*.js';

function addNew() {
	actions.data.remote.add('tracker', { data: 'stuff' });
}

module.exports = {
	addNew,
};


