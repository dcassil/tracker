// import * from 'whatwg-fetch';

function get(url, opts) {
	return fetch(url, opts)
		.then(resp => {
			return resp.json();
		});
}

module.exports = {
	get,
};

