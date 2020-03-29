const generateUniqueId = require('../../src/utils/generateUniqueId')

describe('Generate Unique ID', () => { //Describe what the test should do.
    it('should generate an unique ID', () => {
        const id = generateUniqueId();

        expect(id).toHaveLength(8);
    })
});