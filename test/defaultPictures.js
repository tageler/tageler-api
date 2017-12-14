/*
const supertest = require('supertest');
const app = require('../src/app');
const api = supertest(app);
const faker = require('faker');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dbService = require('../src/services/database');
const async = require('async');
const expect = require('chai').expect;
const _ = require('lodash');
const fs = require('fs');
const picture = fs.readFileSync(require('path').resolve(__dirname, 'testImgBase64.txt'), 'UTF-8');


describe('defaultPicture', () => {
    before(done => {
        dbService.openConnectionAndDropCollection('defaultpictures', () => {
            return done();
        });
    });

    let picture1;
    let picture2;

    it('/api/v1/picture/admin/save', done => {
        // Successful creation 1

        api.post('/api/v1/picture/admin/save')
            .send(
                {
                    name: 'KevinPicture',
                    picture: 'base64Picture'
                })
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                expect(res.body.result.name).to.equal('KevinPicture');
                expect(res.body.result.picture).to.equal('base64Picture');
                picture1 = res.body.result;
            });
        // Successful creation 2 for getPictures unit test
        api.post('/api/v1/picture/admin/save')
            .send(
                {
                    name: 'BatmanPicture',
                    picture: 'veryNiceBatmanPicture'
                })
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                expect(res.body.result.name).to.equal('BatmanPicture');
                expect(res.body.result.picture).to.equal('veryNiceBatmanPicture');
                picture2 = res.body.result;
            });
        // Unsuccessful saving
        api.post('/api/v1/picture/admin/save')
            .send(
                {
                    name: 'noPictureSentHere'
                })
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                expect(res.body.success).to.equal(false);
                done();
            });
    });
    it('/api/v1/picture/getPictures', done => {
        api.get('/api/v1/picture/getPictures')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
            // to be done
                done();
            });
    });
    it('/api/v1/picture/admin/update, expecting no error', done => {
        api.put('/api/v1/picture/admin/update/' + picture1._id)
            .send(
                {
                    name: 'new picture name'
                })
            .expect('Content-Type', /json/)
            .end((err, res) => {
                expect(res.body.success).to.equal(true);
                expect(res.body.updatedPicture._id).to.equal(picture1._id);
                expect(res.body.updatedPicture.name).to.equal('new picture name');
                expect(res.body.updatedPicture.picture).to.equal(picture1.picture);
                done();
            });
    });
    it('/api/v1/picture/admin/update, wrong ID', done => {
        api.put('/api/v1/picture/admin/update/' + '12345nananaBatmanIdToForceErr')
            .send(
                {
                    name: 'new picture name'
                })
            .expect('Content-Type', /json/)
            .end((err, res) => {
                expect(res.body.success).to.equal(false);
                expect(res.body.msg).to.equal('Failed to find the Picture with ID: '+'12345nananaBatmanIdToForceErr');
                done();
            });
    });
    it('/api/v1/picture/getById/:id', done => {
        api.get('/api/v1/picture/getById/' + picture2._id)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.body._id).to.equal(picture2._id);
                expect(res.body.name).to.equal(picture2.name);
                expect(res.body.picture).to.equal(picture2.picture);
                done();
            });
    });
    it('/api/v1/picture/getById/:id, wrong ID', done => {
        api.get('/api/v1/picture/getById/' + '12345nananaBatmanIdToForceErr')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end((err, res) => {
                expect(res.body.success).to.equal(false);
                done();
            });
    });
    // must run when there is at least one entry in the defaultpicture collection
    it('/api/v1/picture/admin/delete, wrong ID: should fail and not delete the defaultpictures collection', done => {
        api.del('/api/v1/picture/admin/delete/' + '12345nananaBatmanIdToForceErr')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end((err, res) => {
                expect(res.body.success).to.equal(false);
            });
        api.get('/api/v1/picture/getPictures')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end((err,res) => {
                expect(res.body !== 0);
                done();
            });
    });
    it('/api/v1/picture/admin/delete', done => {
        api.del('/api/v1/picture/admin/delete/' + picture1._id)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.body.success).to.equal(true);
            });
        api.del('/api/v1/picture/admin/delete/' + picture2._id)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.body.success).to.equal(true);
            done()
            });
    });
});

describe('Fill MongoDB with Picture entries', () => {
    before(done => {
        dbService.openConnectionAndDropCollection('defaultpictures', () => {
            return done();
        });
    });
    beforeEach(done => {
        done();
    });
    afterEach(() => {
        mongoose.connection.close();
    });
    it('creates some pictures', done => {
        const pictures = [
            {
                name: 'ArthPicture',
                picture: picture,
                category: 'pse'
            }, {
                name: 'BalzPicture',
                picture: picture,
                category: 'pse'
            }, {
                name: 'FluPicture',
                picture: picture,
                category: 'pse'
            }, {
                name: 'KevinPicture',
                picture: picture,
                category: 'pse'
            }, {
                name: 'RamonaPicture',
                picture: picture,
                category: 'pse'
            }, {
                name: 'SvenPicture',
                picture: picture,
                category: 'pse'
            }
        ];

        async.forEachOf(pictures,
            (picture, ind, callback) => {
                postPicture(picture, (err, res) => {
                    if (err) {
                        return callback(err);
                    }
                    callback();
                });
            },
            err => {
                if (err) {
                    console.log('error in posting pictures: ' + err.toString());
                }
                return done();
            });
    });
});


function postPicture(picture, callback) {
    api.post('/api/v1/picture/admin/save')
        .send(picture)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
            callback(err, res);
        });
};
*/
