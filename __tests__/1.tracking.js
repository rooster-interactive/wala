const request = require('supertest');
const app = require('../app');

describe('Tracking endpoints', () => {
    it('should create a new get to estafeta.', async () => {
        const res = await request(app)
            .get('/track')
            .send({
                courier: "estafeta",
                tracking_code: '12345l',
            });
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('status');
        expect(res.body).toHaveProperty('data');
        expect(res.body).toHaveProperty('message')
    })
});
