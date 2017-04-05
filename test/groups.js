const supertest = require('supertest');
const app = require('../src/app');
const api = supertest(app);
const fixtures = require('node-mongoose-fixtures');
const faker = require('faker');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('../src/config/database');

describe('Fill MongoDB with Groups entries', function () {
    before(function (done) {
        if (mongoose.connection.db) {
            mongoose.connection.collections['groups'].drop(function (err) {
                if (err) {
                    console.log(err);
                }
            });
        } else {
            mongoose.connect(config.database, done);
        }
        return done();
    });
    beforeEach(function (done) {
        done();
    });
    afterEach(function() {
        mongoose.connection.close();
    });
    it('creates some groups', function (done) {
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

        let cnt = 0;

        for (let i = 0; i < groups.length; i++) {
            api.post('/api/v1/group/admin/create')
                .send(groups[i])
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res)  {
                    if (err) {
                        console.log('failed creating groups ' + err.toString());
                    }
                    cnt++;
                    // console.log('Created group' + ' ' + cnt);
                    if (cnt == groups.length) {
                        done();
                    }
                });
        }
    });
});
