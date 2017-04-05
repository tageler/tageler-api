const expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../src/app');
const api = supertest(app);

describe('server', () => {
    it('/', (done) => {
        api.get('/')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.equal('The game is on!');
                done();
            });
    });
});