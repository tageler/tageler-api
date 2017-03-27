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
            date: '1.1.2017',
            group: 'Junglejungs',
            start:'2016-06-03T10:34',
            end: '2016-06-04T10:34',
            bring_along:'BMPTNZ',
            uniform:'bruni hosä',
            picture:'http://www.beobachter.ch/fileadmin/dateien/bilder-editionen/Natur_2014/05_14/wald_gruenflaeche.jpg',
            checkout_deadline:'1.1.2017'
        },
            {
                title: 'Fürlä',
                text: 'adsfdg',
                date: '1.7.2017',
                group: 'Wondergirls',
                start:'2016-06-03T10:34',
                end: '2016-06-04T10:34',
                bring_along:'Fürzüg u Brönnsprit',
                uniform:'Fürfeschti häntschä',
                picture:'http://s1.1zoom.me/big3/877/390221-svetik.jpg',
                checkout_deadline:'3.1.2017'
            }];

        for (let i = 2, len = 12; i < len; i++) {
            tageler[i] = {
                title: faker.lorem.sentence(3,8),
                text: faker.hacker.phrase() + ' ' + faker.hacker.phrase(),
                date: faker.date.future(),
                group: faker.hacker.noun(),
                start:'2016-06-03T10:34',
                end: '2016-06-04T10:34',
                bring_along: faker.lorem.sentence(5,8),
                uniform:faker.hacker.phrase(),
                picture:faker.image.image(),
                checkout_deadline:faker.date.future()
            };
        }


        for (var i = 0; i < tageler.length; i++){
            api.post('/v1/tageler/admin/create')
                .send(tageler[i])
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    console.log(res.toString());
                });
        }
        done();
    });
});
