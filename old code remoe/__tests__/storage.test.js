const storage = require('storage');
const common = require('common');

test('addSchema / getSchema adds and gets a schema to/from the store', () => {
	storage.addSchema('test', common.testSchema);
	storage.addSchema('test2', {});
	let schema = storage.getSchema('test');
	let schema2 = storage.getSchema('test2');

	expect(schema).toEqual(common.testSchema);
	expect(schema2).toEqual({});
});
