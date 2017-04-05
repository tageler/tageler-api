const expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../src/app');
const api = supertest(app);
const mongoose = require('mongoose');

describe('group', function () {
    // TODO
    it('/getGroups', function (done) {
        api.get('/')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.equal('The game is on!');
                done();
            });
    });
    // TODO
    it('/getById', function (done) {
        api.get('/')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.equal('The game is on!');
                done();
            });
    });
    // TODO
    it('/admin/create', function (done) {
        api.get('/')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.equal('The game is on!');
                done();
            });
    });
    // TODO
    it('/admin/update', function (done) {
        api.get('/')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.equal('The game is on!');
                done();
            });
    });
    // TODO
    it('/admin/delete', function (done) {
        api.get('/')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.equal('The game is on!');
                done();
            });
    });
});