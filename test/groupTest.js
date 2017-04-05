const expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../src/app');
const api = supertest(app);
const mongoose = require('mongoose');

describe('group', () => {
    // TODO
    it('/getGroups', (done) => {
        api.get('/')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.equal('The game is on!');
                done();
            });
    });
    // TODO
    it('/getById', (done) => {
        api.get('/')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.equal('The game is on!');
                done();
            });
    });
    // TODO
    it('/admin/create', (done) => {
        api.get('/')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.equal('The game is on!');
                done();
            });
    });
    // TODO
    it('/admin/update', (done) => {
        api.get('/')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.equal('The game is on!');
                done();
            });
    });
    // TODO
    it('/admin/delete', (done) => {
        api.get('/')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.equal('The game is on!');
                done();
            });
    });
});