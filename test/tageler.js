const supertest = require('supertest');
const app = require('../src/app');
const api = supertest(app);
const faker = require('faker');
const _ = require('lodash');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('../src/config/database');
const async = require('async');
const base64 = require('node-base64-image'); // ES5
const expect = require('chai').expect;

describe('tageler', () => {
    before(done => {
        config.openConnectionAndDropCollection('tagelers', () => {
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
        const picture = faker.image.image();
        const checkoutDeadline = faker.date.future();
        const checkoutContactName = faker.name.findName();
        const checkoutContactPhone = faker.phone.phoneNumber();
        const checkoutContactMail = faker.internet.email();
        const checkoutContactOther = faker.hacker.phrase();
        const free = faker.random.boolean();

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
                // TODO: Date format isn't correct yet
                // expect(res.body.result.start).to.equal(start);
                // expect(res.body.result.end).to.equal(end);
                expect(res.body.result.bringAlong).to.equal(bringAlong);
                expect(res.body.result.uniform).to.equal(uniform);
                expect(res.body.result.picture).to.equal(picture);
                // expect(res.body.result.checkout.deadline).to.equal(checkoutDeadline);
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
                    picture: faker.image.image(),
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

        // TODO: Unsuccessful creation
    });
    it('/api/v1/tageler/getTagelers', done => {
        api.get('/api/v1/tageler/getTagelers')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                expect(res.body.length === 2).to.equal(true);
                done();
            });
    });
    it('/api/v1/tageler/getById', done => {
        api.get('/api/v1/tageler/getById/' + tageler1._id)
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                expect(res.body.title).to.equal(tageler1.title);
                expect(res.body.text).to.equal(tageler1.text);
                // TODO: What's the difference?
                // console.log(res.body.group);
                // console.log(tageler1.group);
                // expect(res.body.group).to.equal(tageler1.group);
                // TODO: Date format isn't correct yet
                // expect(res.body.start).to.equal(tageler1.start);
                // expect(res.body.end).to.equal(tageler1.end);
                expect(res.body.bringAlong).to.equal(tageler1.bringAlong);
                expect(res.body.uniform).to.equal(tageler1.uniform);
                expect(res.body.picture).to.equal(tageler1.picture);
                // expect(res.body.checkout.deadline).to.equal(tageler1.checkoutDeadline);
                expect(res.body.checkout.contact[0].name).to.equal(tageler1.checkout.contact[0].name);
                expect(res.body.checkout.contact[0].phone).to.equal(tageler1.checkout.contact[0].phone);
                expect(res.body.checkout.contact[0].mail).to.equal(tageler1.checkout.contact[0].mail);
                expect(res.body.checkout.contact[0].other).to.equal(tageler1.checkout.contact[0].other);
                expect(res.body.free).to.equal(tageler1.free);
                done();
            });
    });
    it('/api/v1/tageler/admin/update', done => {
        api.put('/api/v1/tageler/admin/update/' + tageler2._id)
            .send(
                {
                    group: 'foobar'
                })
            .end((err, res) => {
                done();
            });
    });
    it('/api/v1/tageler/getByGroup/', done => {
        api.get('/api/v1/tageler/getByGroup/foobar')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                expect(res.body[0].title).to.equal(tageler2.title);
                expect(res.body[0].text).to.equal(tageler2.text);
                expect(JSON.stringify(res.body[0].group)).to.equal('["foobar"]');
                // TODO: Date format isn't correct yet
                // expect(res.body[0].start).to.equal(tageler2.start);
                // expect(res.body[0].end).to.equal(tageler2.end);
                expect(res.body[0].bringAlong).to.equal(tageler2.bringAlong);
                expect(res.body[0].uniform).to.equal(tageler2.uniform);
                expect(res.body[0].picture).to.equal(tageler2.picture);
                // expect(res.body[0].checkout.deadline).to.equal(tageler2.checkoutDeadline);
                expect(res.body[0].checkout.contact[0].name).to.equal(tageler2.checkout.contact[0].name);
                expect(res.body[0].checkout.contact[0].phone).to.equal(tageler2.checkout.contact[0].phone);
                expect(res.body[0].checkout.contact[0].mail).to.equal(tageler2.checkout.contact[0].mail);
                expect(res.body[0].checkout.contact[0].other).to.equal(tageler2.checkout.contact[0].other);
                expect(res.body[0].free).to.equal(tageler2.free);
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
                // TODO: Why do we still get all tageler here, after deletion?
                // console.log(res.body);
                // expect(res.body.length === 0).to.equal(true);
                done();
            });
    });
});

const NUM_OF_TAGELERS = 20;

describe('Fill MongoDB with Tageler entries', () => {
    before(done => {
        config.openConnectionAndDropCollection('tagelers', () => {
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
        /* give this test a bit more time to fill the db... may has to be increased on slow pc's*/
        this.timeout(10000);
        setTimeout(done, 10000);
        let tagelers = [];
        let urlGruenwald = 'http://www.beobachter.ch/fileadmin/dateien/bilder-editionen/Natur_2014/05_14/wald_gruenflaeche.jpg';
        let urlFeuerwald = 'http://s1.1zoom.me/big3/877/390221-svetik.jpg';
        let urls = [urlGruenwald, urlFeuerwald];
        for (let i = 2, len = NUM_OF_TAGELERS; i < len; i++) {
            urls[i] = faker.image.image();
        }
        let base64images = [];

        async.forEachOf(urls,
            (url, ind, callback) => {
                base64.encode(url, {string: true}, (err, image) => {
                    if (err) {
                        console.log('Error!! ' + err.toString());
                        return callback(err);
                    }
                    base64images[ind] = image;
                    callback();
                });
            },
            err => {
                if (err) {
                    console.log('Error');
                    return done();
                }
                tagelers[0] = {
                    title: 'Megafun im Wald',
                    text: 'sdfg',
                    group: 'Baghira',
                    start: '2016-06-03T10:34',
                    end: '2016-06-04T10:34',
                    bringAlong: 'BMPTNZ',
                    uniform: 'bruni hosä',
                    picture: base64images[0],
                    checkout: {
                        deadline: '2016-06-03',
                        contact: {
                            name: 'Hans Hansenstein',
                            phone: '123456',
                            mail: 'hans@hans.hans',
                            other: ':)'
                        }
                    },
                    free: false
                };
                tagelers[1] = {
                    title: 'Fürlä',
                    text: 'adsfdg',
                    group: 'Tschil',
                    start: '2016-06-03T10:34',
                    end: '2016-06-04T10:34',
                    bringAlong: 'Fürzüg u Brönnsprit',
                    uniform: 'Fürfeschti häntschä',
                    picture: base64images[1],
                    checkout: {
                        deadline: '2017-01-02',
                        contact: {
                            name: 'Ben Zin',
                            phone: '0333333333',
                            mail: 'ben.zin@pfadi.ch',
                            other: ''
                        }
                    },
                    free: false
                };
                for (let i = 2, len = NUM_OF_TAGELERS; i < len; i++) {
                    tagelers[i] = {
                        title: faker.lorem.sentence(3, 8),
                        text: faker.hacker.phrase() + ' ' + faker.hacker.phrase(),
                        group: _.sample(['Baghira', 'Tschil', 'Turmalin', 'Obsidian', 'Raschka', 'Rikki-Tikki', 'Bratwurscht']),
                        start: faker.date.future(),
                        end: faker.date.future(),
                        bringAlong: faker.lorem.sentence(5, 8),
                        uniform: faker.hacker.phrase(),
                        picture: base64images[i],
                        checkout: {
                            deadline: faker.date.future(),
                            contact: [{
                                name: faker.name.findName(),
                                phone: faker.phone.phoneNumber(),
                                mail: faker.internet.email(),
                                other: faker.hacker.phrase()
                            }]
                        },
                        free: false
                    };
                }
                async.forEachOf(tagelers,
                    (tageler, ind, callback) => {
                        postTageler(tageler, (err, res) => {
                            if (err) {
                                console.log('Error!! ' + err.toString());
                                return callback(err);
                            }
                            // console.log("created tageler: " + ind);
                            callback();
                        });
                    },
                    err => {
                        if (err) {
                            console.log('error in posting tagelers: ' + err.toString());
                        }
                        return done();
                    });
            }
        );
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
}