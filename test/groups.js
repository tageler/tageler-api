const supertest = require('supertest');
const app = require('../src/app');
const api = supertest(app);
const faker = require('faker');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('../src/config/database');
const async = require('async');

describe('Fill MongoDB with Groups entries', function () {
    before(function (done) {
        config.openConnectionAndDropCollection('groups', () => {
            return done();
        });
    });
    beforeEach(function (done) {
        done();
    });
    afterEach(function () {
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

        async.forEachOf(groups,
            function (group, ind, callback) {
                postGroup(group, (err, res) => {
                    if (err) {
                        console.log('Error!! ' + err.toString());
                        return callback(err);
                    }
                    // console.log("created group: " + ind);
                    callback();
                });
            },
            function (err) {
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
        .end(function (err, res) {
            callback(err, res);
        });
}