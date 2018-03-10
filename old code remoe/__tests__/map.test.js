const Map = require('map');
const common = require('common');

test('TBD', () => {
	let map = new Map('test', common.testSchema, common.testImport);

	console.log(map);
	expect(map.loaded).toBe(true);
})