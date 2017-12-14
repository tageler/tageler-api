const supertest = require('supertest');
const app = require('../src/app');
const api = supertest(app);
const faker = require('faker');
const _ = require('lodash');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dbService = require('../src/services/database');
const async = require('async');
const base64 = require('node-base64-image'); // ES5
const expect = require('chai').expect;
const fs = require('fs');
const picture = fs.readFileSync(require('path').resolve(__dirname, 'testImgBase64.txt'), 'UTF-8');

describe('tageler', () => {
    before(done => {
        dbService.openConnectionAndDropCollection('tagelers', () => {
            return done();
        });
    });

    let tageler1;
    let tageler2;

    it('/api/v1/tageler/admin/create', done => {
        // Successful creation 1
        const title = faker.lorem.word();
        const text = faker.hacker.phrase();
        const group = faker.lorem.word();
        const start = faker.date.future();
        const end = faker.date.future();
        const bringAlong = faker.lorem.word();
        const uniform = faker.lorem.word();
        const checkoutDeadline = faker.date.future();
        const checkoutContactName = faker.name.findName();
        const checkoutContactPhone = faker.phone.phoneNumber();
        const checkoutContactMail = faker.internet.email();
        const checkoutContactOther = faker.hacker.phrase();
        const free = false;

        api.post('/api/v1/tageler/admin/create')
            .send(
                {
                    title: title,
                    text: text,
                    group: group,
                    start: start,
                    end: end,
                    bringAlong: bringAlong,
                    uniform: uniform,
                    picture: picture,
                    checkout: {
                        deadline: checkoutDeadline,
                        contact: {
                            name: checkoutContactName,
                            phone: checkoutContactPhone,
                            mail: checkoutContactMail,
                            other: checkoutContactOther
                        }
                    },
                    free: free
                })
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                expect(res.body.success).to.equal(true);
                expect(res.body.result.title).to.equal(title);
                expect(res.body.result.text).to.equal(text);
                expect(res.body.result.group[0]).to.equal(group);
                expect(Date(res.body.result.start)).to.equal(Date(start));
                expect(Date(res.body.result.end)).to.equal(Date(end));
                expect(res.body.result.bringAlong).to.equal(bringAlong);
                expect(res.body.result.uniform).to.equal(uniform);
                expect(res.body.result.picture).to.equal(picture);
                expect(Date(res.body.result.checkout.deadline)).to.equal(Date(checkoutDeadline));
                expect(res.body.result.checkout.contact[0].name).to.equal(checkoutContactName);
                expect(res.body.result.checkout.contact[0].phone).to.equal(checkoutContactPhone);
                expect(res.body.result.checkout.contact[0].mail).to.equal(checkoutContactMail);
                expect(res.body.result.checkout.contact[0].other).to.equal(checkoutContactOther);
                expect(res.body.result.free).to.equal(free);
                tageler1 = res.body.result;
            });
        // Successful creation 2 for getTagelers unit test
        api.post('/api/v1/tageler/admin/create')
            .send(
                {
                    title: faker.lorem.word(),
                    text: faker.hacker.phrase(),
                    group: faker.lorem.word(),
                    start: faker.date.future(),
                    end: faker.date.future(),
                    bringAlong: faker.lorem.word(),
                    uniform: faker.lorem.word(),
                    picture: picture,
                    checkout: {
                        deadline: faker.date.future(),
                        contact: {
                            name: faker.name.findName(),
                            phone: faker.phone.phoneNumber(),
                            mail: faker.internet.email(),
                            other: faker.hacker.phrase()
                        }
                    },
                    free: faker.random.boolean()
                })
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                tageler2 = res.body.result;
                done();
            });
    });
    it('/api/v1/tageler/admin/create, unsuccessful creation', done => {
        // Unsuccessful creation 1
        const title = '';
        const text = 'test';
        const group = '';
        const start = '2017-10-21T07:47:55.333Z';
        const end = '2018-01-16T03:12:18.131Z';
        const bringAlong = 'test';
        const uniform = 'test';
        // const picture = 'test';
        const checkoutDeadline = 'test';
        const checkoutContactName = 'test';
        const checkoutContactPhone = '12345';
        const checkoutContactMail = 'test';
        const checkoutContactOther = 'test';
        const free = false;

        api.post('/api/v1/tageler/admin/create')
            .send(
                {
                    title: title,
                    text: text,
                    group: group,
                    start: start,
                    end: end,
                    bringAlong: bringAlong,
                    uniform: uniform,
                    picture: picture,
                    checkout: {
                        deadline: checkoutDeadline,
                        contact: {
                            name: checkoutContactName,
                            phone: checkoutContactPhone,
                            mail: checkoutContactMail,
                            other: checkoutContactOther
                        }
                    },
                    free: free
                })
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                expect(res.body.success).to.equal(false);
                expect(res.body.msg).to.equal('Failed to register Tageler');
                done();
            });
    });
    it('/api/v1/tageler/calForTageler/:id, correct id', done => {
        if (dbService.MONGODB_VERSION >= '3.4') {
            // console.log("MONGO_VERSION: " + dbService.MONGODB_VERSION);
            api.get('/api/v1/tageler/calForTageler/' + tageler1._id)
                .expect(200)
                .end((err, res) => {
                    expect(res.text.includes('BEGIN:VCALENDAR')).to.equal(true);
                    expect(res.text.includes('END:VCALENDAR')).to.equal(true);
                    expect(res.text.includes(tageler1.title)).to.equal(true);
                    done();
                });
        } else {
            done();
        }
    });
    it('/api/v1/tageler/calForTageler/:id, wrong id', done => {
        if (dbService.MONGODB_VERSION >= '3.4') {
            // console.log("MONGO_VERSION: " + dbService.MONGODB_VERSION);
            api.get('/api/v1/tageler/calForTageler/' + '12345nananaBatmanIdToForceErr' )
                .expect(200)
                .end((err, res) => {
                    expect(res.body.success).to.equal(false);
                    done();
                });
        } else {
            done();
        }
    });
    it('/api/v1/tageler/calForGroup/:group, correct group', done => {
        if (dbService.MONGODB_VERSION >= '3.4') {
            // console.log("MONGO_VERSION: " + dbService.MONGODB_VERSION);
            api.get('/api/v1/tageler/calForGroup/' + tageler1.group)
                .expect(200)
                .end((err, res) => {
                    expect(res.text.includes('BEGIN:VCALENDAR')).to.equal(true);
                    expect(res.text.includes('END:VCALENDAR')).to.equal(true);
                    expect(res.text.includes(tageler1.title)).to.equal(true);
                    done();
                });
        } else {
            done();
        }
    });
    it('/api/v1/tageler/calForGroup/:group, wrong group', done => {
        if (dbService.MONGODB_VERSION >= '3.4') {
            // console.log("MONGO_VERSION: " + dbService.MONGODB_VERSION);
            api.get('/api/v1/tageler/calForGroup/' + '12345nananaBatmanGROUPToForceErr' )
                .expect(200)
                .end((err, res) => {
                    expect(res.body.success).to.equal(false);
                    done();
                });
        } else {
            done();
        }
    });
    it('/api/v1/tageler/getTagelers', done => {
        if (dbService.MONGODB_VERSION >= '3.4') {
            // console.log("MONGO_VERSION: " + dbService.MONGODB_VERSION);
            api.get('/api/v1/tageler/getTagelers')
                .set('Accept', 'application/json')
                .expect(200)
                .end((err, res) => {
                    expect(res.body.length === 2).to.equal(true);
                    done();
                });
        } else {
            done();
        }
    });
    it('/api/v1/tageler/getById', done => {
        api.get('/api/v1/tageler/getById/' + tageler1._id)
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                expect(res.body.title).to.equal(tageler1.title);
                expect(res.body.text).to.equal(tageler1.text);
                expect(res.body.group[0]).to.equal(tageler1.group[0]);
                expect(Date(res.body.start)).to.equal(Date(tageler1.start));
                expect(Date(res.body.end)).to.equal(Date(tageler1.end));
                expect(res.body.bringAlong).to.equal(tageler1.bringAlong);
                expect(res.body.uniform).to.equal(tageler1.uniform);
                expect(res.body.picture).to.equal(tageler1.picture);
                expect(Date(res.body.checkout.deadline)).to.equal(Date(tageler1.checkoutDeadline));
                expect(res.body.checkout.contact[0].name).to.equal(tageler1.checkout.contact[0].name);
                expect(res.body.checkout.contact[0].phone).to.equal(tageler1.checkout.contact[0].phone);
                expect(res.body.checkout.contact[0].mail).to.equal(tageler1.checkout.contact[0].mail);
                expect(res.body.checkout.contact[0].other).to.equal(tageler1.checkout.contact[0].other);
                expect(res.body.free).to.equal(tageler1.free);
                done();
            });
    });
    it('/api/v1/tageler/getById, wrong ID', done => {
        api.get('/api/v1/tageler/getById/' + '12345nananaBatmanIdToForceErr')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.body.success).to.equal(false);
                expect(res.body.msg).to.equal('No Tageler found with ID: ' + '12345nananaBatmanIdToForceErr');
                done();
            });
    });
    it('/api/v1/tageler/admin/update', done => {
        api.put('/api/v1/tageler/admin/update/' + tageler2._id)
            .send(
                {
                    group: 'foobar'
                })
            .expect('Content-Type', /json/)
            .end((err, res) => {
                // console.log(JSON.stringify(res.body));
                expect(res.body.success).to.equal(true);
                expect(res.body.msg).to.equal('Tageler updated');
                done();
            });
    });
    it('/api/v1/tageler/admin/update, wrong ID', done => {
        api.put('/api/v1/tageler/admin/update/' + '12345nananaBatmanIdToForceErr')
            .send(
                {
                    title: 'new group name'
                })
            .expect('Content-Type', /json/)
            .end((err, res) => {
                expect(res.body.success).to.equal(false);
                expect(res.body.msg).to.equal('Failed to find the Tageler with ID: ' + '12345nananaBatmanIdToForceErr');
                done();
            });
    });
    /* need fix validations for this one :) */
    it('/api/v1/tageler/admin/update, mongoose validation for update', done => {
        api.put('/api/v1/tageler/admin/update/' + tageler1._id)
            .send(
                {
                    free: 'nanana'
                })
            .expect('Content-Type', /json/)
            .end((err, res) => {
                expect(res.body.success).to.equal(false);
                expect(res.body.msg).to.equal('Failed to update Tageler with ID: ' + tageler1._id);
                done();
            });
    });

    it('/api/v1/tageler/getByGroup/', done => {
        if (dbService.MONGODB_VERSION >= '3.4') {
            // console.log("MONGO_VERSION: " + dbService.MONGODB_VERSION);
            api.get('/api/v1/tageler/getByGroup/foobar')
                .set('Accept', 'application/json')
                .expect(200)
                .end((err, res) => {
                    // console.log(JSON.stringify(res.body));
                    expect(res.body[0].title).to.equal(tageler2.title);
                    expect(res.body[0].text).to.equal(tageler2.text);
                    expect(res.body[0].group[0]).to.equal('foobar');
                    expect(res.body[0].start).to.equal(tageler2.start);
                    expect(res.body[0].end).to.equal(tageler2.end);
                    expect(res.body[0].bringAlong).to.equal(tageler2.bringAlong);
                    expect(res.body[0].uniform).to.equal(tageler2.uniform);
                    // expect(res.body[0].picture).to.equal(tageler2.picture);
                    expect(res.body[0].picture.length).to.above(200);
                    expect(res.body[0].picture.length).to.below(tageler2.picture.length);
                    expect(Date(res.body[0].checkout.deadline)).to.equal(Date(tageler2.checkoutDeadline));
                    expect(res.body[0].checkout.contact[0].name).to.equal(tageler2.checkout.contact[0].name);
                    expect(res.body[0].checkout.contact[0].phone).to.equal(tageler2.checkout.contact[0].phone);
                    expect(res.body[0].checkout.contact[0].mail).to.equal(tageler2.checkout.contact[0].mail);
                    expect(res.body[0].checkout.contact[0].other).to.equal(tageler2.checkout.contact[0].other);
                    expect(res.body[0].free).to.equal(tageler2.free);
                    done();
                });
        } else {
            done();
        }
    });
    it('/api/v1/tageler/getByGroup/, wrong groupname', done => {
        api.get('/api/v1/tageler/getByGroup/nanananaBatman123456')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.body.success).to.equal(false);
                expect(res.body.msg).to.equal('No Tagelers found for Group: nanananaBatman123456');
                done();
            });
    });
    // must run if there is at least one entry in the tageler collection
    it('/api/v1/tageler/admin/delete, wrong ID: should fail and not delete the tageler collection', done => {
        api.del('/api/v1/tageler/admin/delete/' + '12345nananaBatmanIdToForceErr')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end((err, res) => {
                expect(res.body.success).to.equal(false);
            });
        // providing wrong ID should not delete the tageler collection
        api.get('/api/v1/tageler/getTagelers')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end((err, res) => {
                expect(res.body !== 0);
                done();
            });
    });
    it('/api/v1/tageler/admin/delete', done => {
        api.del('/api/v1/tageler/admin/delete/' + tageler1._id)
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                expect(res.body.success).to.equal(true);
            });
        api.del('/api/v1/tageler/admin/delete/' + tageler2._id)
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                expect(res.body.success).to.equal(true);
            });
        api.get('/api/v1/tageler/getTagelers')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                expect(res.body.msg).to.equal('No Tagelers found');
                done();
            });
    });
});


const NUM_OF_TAGELERS = 20;

describe('Fill MongoDB with Tageler entries', () => {
    before(done => {
        dbService.openConnectionAndDropCollection('tagelers', () => {
            return done();
        });
    });
    beforeEach(done => {
        done();
    });
    afterEach(() => {
        mongoose.connection.close();
    });
    it('creates some tagelers', function (done) {
        this.timeout(10000);
        setTimeout(done, 10000);
        var json = require('./tagelers.json');
        console.log("Finally fill db with " + json.length + " tagelers");
        async.forEachOf(json, (taglr, ind, callback) => {
            postTageler(taglr, (err, res) => {
                if (err) {
                    console.log('Error!! ' + err.toString());
                    return callback(err);
                }
                callback();
            });
        }, err => {
            if (err) {
                console.log("Tagelers could not be created. " + err.toString());
            }
            done();
        });
    });
});

function postTageler(tageler, callback) {
    api.post('/api/v1/tageler/admin/create')
        .send(tageler)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
            callback(err, res);
        });
};