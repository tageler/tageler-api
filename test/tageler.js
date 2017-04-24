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
        this.timeout(5000);
        setTimeout(done, 5000);
        var tagelers = [];
        var url_gruenwald = 'http://www.beobachter.ch/fileadmin/dateien/bilder-editionen/Natur_2014/05_14/wald_gruenflaeche.jpg';
        var url_feuerwald = 'http://s1.1zoom.me/big3/877/390221-svetik.jpg';
        var urls = [url_gruenwald, url_feuerwald];
        for (let i = 2, len = NUM_OF_TAGELERS; i < len; i++) {
            urls[i] = faker.image.image();
        }
        base64images = [];

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
                    console.log('Fuckin error');
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
                }
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