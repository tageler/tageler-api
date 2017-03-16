/**
 * Created by bauz on 12.03.17.
 */

const dbURI = 'mongodb://localhost:8080';

const should = require('chai').should();
const supertest = require('supertest');
const server = require('../src/server');
const models = require('../src/models');
const api = supertest(server);
const fixtures = require('node-mongoose-fixtures');
const mongoose = require('mongoose');

describe('List of units', function() {
    before(function(done) {
        if (mongoose.connection.db) {
            console.log('units: '+mongoose.connection);
        }else{
            mongoose.connect(dbURI, done);
        }
        /*
        mongoose.connection.on('connected',function() {
            mongoose.connection.db.listCollections({name: 'units'})
                .next(function (err, collinfo) {
                    console.log('colInfTagelers:' + collinfo);
                    if (collinfo) {
                        mongoose.connection.db.dropCollection('units', function (err, p) {
                            if (err) {
                                console.log('tagelers-collection could not be deletd');
                            } else {
                                console.log('tagelers collection droped');
                            }
                            return;
                        });
                    }
                });
        });*/
        return done();
    });

    beforeEach(function(done) {

        done();
        /*        models.Tageler.remove(function(err, p){
         if(err){
         throw err;
         } else{
         console.log('No Of Documents deleted:' + p);
         done();
         }
         });*/
    });
    it('creates some units', function(done) {
        var units = [{
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
        for (var i = 0; i < units.length; i++){
            api.post('/createUnit')
                .send(units[i])
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    console.log(res.toString());
                });
        }

        done();
    });
});
