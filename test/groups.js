//const dbURI = 'mongodb://localhost:3000';

const should = require('chai').should();
const supertest = require('supertest');
const app = require('../src/app');
const models = require('../src/models/tageler');
const api = supertest(app);
const fixtures = require('node-mongoose-fixtures');
//const mongoose = require('mongoose');
const faker = require('faker');

const express = require('express');
// const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('../src/config/database');



describe('List of groups', function() {
    before(function(done) {
        if (mongoose.connection.db) {
            mongoose.connection.collections["groups"].drop(function(err){
                console.log(err);
            });
        }else{
            mongoose.connect(dbURI, done);
        }
        return done();
    });

    beforeEach(function(done) {
        done();
    });
    it('creates some groups', function(done) {
        var groups = [{
            type: 'Meute',
            name: 'Baghira'
        },{
            type: 'Meute',
            name: 'Tschil'
        },{
            type: 'Trupp',
            name: 'Turmalin'
        },{
            type: 'Trupp',
            name: 'Obsidian'
        },{
            type: 'Meute',
            name: 'Raschka'
        },{
            type: 'Meute',
            name: 'Rikki-Tikki'
        },{
            type: 'Meute',
            name: 'Bratwurscht'
        }];
        var cnt = 0;
        function Processed(msg ) {
             cnt++;
             console.log(msg + " " + cnt);
             if (cnt==groups.length){
                 done();
             }
        }
        for (var i = 0; i < groups.length; i++){
            api.post('/api/v1/group/admin/create')
                .send(groups[i])
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err){
                        console.log("failed creating groups "+err.toString());
                    }
                    Processed("Created group");
                });
        }
    });
});
