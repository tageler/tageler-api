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

describe('List of tageler', function() {
    before(function(done) {
        if (mongoose.connection.db) {
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
                });*/
        });
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
    it('creates some tagelers', function(done) {
        var tageler = [{
            title: 'Megafun im Wald',
            unit: 'Junglejungs',
            start:'1.1.2017',
            end: '1.2.2017',
            bring_along:'BMPTNZ',
            uniform:'bruni hosä',
            picture:'http://www.beobachter.ch/fileadmin/dateien/bilder-editionen/Natur_2014/05_14/wald_gruenflaeche.jpg',
            checkout_deadline:'1.1.2017'
        },
            {
                title: 'Fürlä',
                unit: 'Wondergirls',
                start:'1.5.2017',
                end: '1.19.2017',
                bring_along:'Fürzüg u Brönnsprit',
                uniform:'Fürfeschti häntschä',
                picture:'http://s1.1zoom.me/big3/877/390221-svetik.jpg',
                checkout_deadline:'3.1.2017'
            }];
        for (var i = 0; i < tageler.length; i++){
            api.post('/createTageler')
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