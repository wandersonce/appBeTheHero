const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback(); //Clear data in the test database before the actual test
        await connection.migrate.latest(); //will implement the test database to be executed on the test
    });

    afterAll(async () => {
        await connection.destroy(); //will destroy the connection that was created to test 
    });

    it('should be able to create a new ONG', async () => {
        const res = await request(app)
            .post('/ongs')
            .send({
                name: "TesteName",
                email: "test@email.com",
                whatsapp: "947874982173",
                city: "testCity",
                uf: "bc"
            });

        expect(res.body).toHaveProperty('id');
        expect(res.body.id).toHaveLength(8);
    });
});