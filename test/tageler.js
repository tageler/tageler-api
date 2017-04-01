/**
 * Created by bauz on 12.03.17.
 */



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


describe('List of tageler', function() {
    before(function(done) {
        // Connect To Database
        if(mongoose.connection.db){
            console.log('tagelers:'+mongoose.connection.toLocaleString())
        }else{
            mongoose.connect(config.database);
        }

        mongoose.connection.on('open',function() {
            mongoose.connection.db.dropDatabase(function (err) {
                console.log(err);
            });
        });


        /*if (mongoose.connection.db) {
            console.log('tagelers: '+mongoose.connection);
        }else{
            mongoose.connect(dbURI, done);
        }
        mongoose.connection.on('open',function(){
            mongoose.connection.db.dropDatabase(function(err){
                console.log(err);
            });
            /*mongoose.connection.db.listCollections({name: 'tagelers'})
             .next(function(err, collinfo) {
             console.log('colInfTagelers:'+ collinfo);
             if (collinfo) {
             mongoose.connection.db.dropCollection('tagelers',function(err, p){
             if(err){
             console.log('tagelers-collection could not be deletd');
             } else{
             console.log('tagelers collection droped');
             }
             return;
             });
             }
             });* /
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
    /*after(function(done){
        var server = app.listen(3000);

        var handler = function() {
            server.close();
            done();
        };
    });*/
    it('creates some tagelers', function(done) {
        var tageler = [{
            title: 'Megafun im Wald',
            text: 'sdfg',
            group: 'Junglejungs',
            start:'2016-06-03T10:34',
            end: '2016-06-04T10:34',
            bring_along:'BMPTNZ',
            uniform:'bruni hosä',
            //picture:'http://www.beobachter.ch/fileadmin/dateien/bilder-editionen/Natur_2014/05_14/wald_gruenflaeche.jpg',
            checkout: {
                deadline: '2016-06-03',
                contact: {
                    name: 'Hans Hansenstein',
                    phone: '123456',
                    mail: 'hans@hans.hans',
                    other: ':)'
                }
            }
        },
            {
                title: 'Fürlä',
                text: 'adsfdg',
                group: 'Wondergirls',
                start:'2016-06-03T10:34',
                end: '2016-06-04T10:34',
                bring_along:'Fürzüg u Brönnsprit',
                uniform:'Fürfeschti häntschä',
                //picture:'http://s1.1zoom.me/big3/877/390221-svetik.jpg',
                checkout: {
                    deadline: '2017-01-02',
                    contact: {
                        name: 'Ben Zin',
                        phone: '0333333333',
                        mail: 'ben.zin@pfadi.ch',
                        other: ''
                    }
                }
            }];

        for (let i = 2, len = 12; i < len; i++) {
            tageler[i] = {
                title: faker.lorem.sentence(3,8),
                text: faker.hacker.phrase() + ' ' + faker.hacker.phrase(),
                group: faker.hacker.noun(),
                start: faker.date.future(),
                end: faker.date.future(),
                bring_along: faker.lorem.sentence(5,8),
                uniform:faker.hacker.phrase(),
                //picture:faker.image.image(),
                checkout: {
                    deadline: faker.date.future(),
                    contact: {
                        name: faker.name.findName(),
                        phone: faker.phone.phoneNumber(),
                        mail: faker.internet.email(),
                        other: faker.hacker.phrase()
                    }
                }
            };
        }


        for (var i = 0; i < tageler.length; i++){
            api.post('/v1/tageler/admin/create')
                .send(tageler[i])
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    console.log(res.toString());
                    if (i == tageler.length-1){
                        done();
                    }
                });
        }

    });
});
