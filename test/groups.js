const supertest = require('supertest');
const app = require('../src/app');
const api = supertest(app);
const faker = require('faker');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('../src/config/database');
const async = require('async');
const expect = require('chai').expect;
const _ = require('lodash');

describe('group', () => {
    before(done => {
        config.openConnectionAndDropCollection('groups', () => {
            return done();
        });
    });
    after(() => {
    });
    beforeEach(() => {
    });
    afterEach(() => {
    });

    let group1;
    let group2;

    it('/api/v1/group/admin/create', done => {
        // Successful creation 1
        const type = _.sample(['Meute', 'Trupp', 'Equipe']);
        const name = faker.lorem.word();

        api.post('/api/v1/group/admin/create')
            .send(
                {
                    type: type,
                    name: name
                })
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                expect(res.body.result.type).to.equal(type);
                expect(res.body.result.name).to.equal(name);
                group1 = res.body.result;
            });
        // Successful creation 2
        const type2 = _.sample(['Meute', 'Trupp', 'Equipe']);
        const name2 = faker.lorem.word();

        api.post('/api/v1/group/admin/create')
            .send(
                {
                    type: type2,
                    name: name2
                })
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                expect(res.body.result.type).to.equal(type2);
                expect(res.body.result.name).to.equal(name2);
                group2 = res.body.result;
            });
        // Unsuccessful creation
        api.post('/api/v1/group/admin/create')
            .send(
                {
                    type: 'No valid group type',
                    name: faker.lorem.word()
                })
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                expect(res.body.success).to.equal(false);
                done();
            });
    });
    it('/api/v1/group/getGroups', done => {
        api.get('/api/v1/group/getGroups')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                // TODO: Why do we not get all groups here?
                // console.log(res.body);
                // expect(res.body.length > 1).to.equal(true);
                done();
            });
    });
    it('/api/v1/group/admin/update', done => {
        api.put('/api/v1/group/admin/update')
            .send(
                {
                    id: group1._id,
                    name: 'new group name'
                })
            .end((err, res) => {
                expect(res.body.success).to.equal(true);
                expect(res.body.updatedGroup._id).to.equal(group1._id);
                expect(res.body.updatedGroup.type).to.equal(group1.type);
                expect(res.body.updatedGroup.name).to.equal('new group name');
                done();
            });
    });
    it('/api/v1/group/getById/', done => {
        api.get('/api/v1/group/getById/' + group2._id)
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                expect(res.body._id).to.equal(group2._id);
                expect(res.body.type).to.equal(group2.type);
                expect(res.body.name).to.equal(group2.name);
                done();
            });
    });
    it('/api/v1/group/admin/delete', done => {
        api.del('/api/v1/group/admin/delete').send(
            {
                _id: group1._id
            })
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                expect(res.body.success).to.equal(true);
            });
        api.del('/api/v1/group/admin/delete').send(
            {
                _id: group2._id
            })
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                expect(res.body.success).to.equal(true);
            });
        api.get('/api/v1/group/getGroups')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                // TODO: Why do we still get all groups here, after deletion?
                // console.log(res.body);
                // expect(res.body.length === 0).to.equal(true);
                done();
            });
    });
});

describe('Fill MongoDB with Groups entries', () => {
    before(done => {
        config.openConnectionAndDropCollection('groups', () => {
            return done();
        });
    });
    beforeEach(done => {
        done();
    });
    afterEach(() => {
        mongoose.connection.close();
    });
    it('creates some groups', done => {
        const groups = [
            {
                type: 'Meute',
                name: 'Baghira'
            }, {
                type: 'Meute',
                name: 'Tschil'
            }, {
                type: 'Trupp',
                name: 'Turmalin'
            }, {
                type: 'Trupp',
                name: 'Obsidian'
            }, {
                type: 'Meute',
                name: 'Raschka'
            }, {
                type: 'Meute',
                name: 'Rikki-Tikki'
            }, {
                type: 'Meute',
                name: 'Bratwurscht'
            }
        ];

        async.forEachOf(groups,
            (group, ind, callback) => {
                postGroup(group, (err, res) => {
                    if (err) {
                        console.log('Error!! ' + err.toString());
                        return callback(err);
                    }
                    // console.log("created group: " + ind);
                    callback();
                });
            },
            err => {
                if (err) {
                    console.log('error in posting groups: ' + err.toString());
                }
                return done();
            });
    });
});


function postGroup(group, callback) {
    api.post('/api/v1/group/admin/create')
        .send(group)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
            callback(err, res);
        });
}