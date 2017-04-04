const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../src/app');
const api = supertest(app);

describe('index', function () {
    it('/', function (done) {
        api.get('/')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.equal('The game is on!');
                done();
            });
    });
});