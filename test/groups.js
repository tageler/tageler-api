const dbURI = 'mongodb://localhost/test';

const should = require('chai').should();
const supertest = require('supertest');
const server = require('../src/server');
const models = require('../src/models');
const api = supertest(server);
const fixtures = require('node-mongoose-fixtures');
const mongoose = require('mongoose');

describe('List of groups', function() {
  before(function(done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  beforeEach(function(done) {
    mongoose.connection.db.dropDatabase(function(err, result) {
      if (err) return done(err);
      // kludge to let mongodb do its thing before the next test runs
      setTimeout(done, 1);
    });
  });

  it('returns an empty list of groups', function(done) {
    api.get('/api/groups')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array).and.to.have.lengthOf(0);
        done();
      });
  });

  it('returns an error if an invalid group is accessed', function(done) {
    api.get('/api/groups/56ccdd2070be1923d5091c7b')
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('creates a new group', function(done) {
    var group = {id: 'xix', name: 'XIX. Trupp'};

    api.post('/api/groups')
      .send(group)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        done();
      });
  });

  it('sends CORS headers', function(done) {
    api.get('/api/groups')
      .expect(200)
      .expect('Access-Control-Allow-Methods', 'GET, POST')
      .expect('Access-Control-Allow-Origin', '*')
      .expect('Access-Control-Expose-Headers', /api-version/i)
      .expect('Access-Control-Allow-Headers', /accept/i)
      .end(function(err, data) {
          if (err) return done(err);
          done();
      });
  });

  it('reads prexisting groups', function(done) {
    fixtures({
      group: [
        {name: 'XX. Trupp'}
      ]
    }, function(err, data) {
      if (err) return done(err);

      api.get('/api/groups')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Array).and.to.have.lengthOf(1);
          done();
        });
    });
  });

  it('reads existing groups directly', function(done) {
    fixtures({
      group: [
        {name: 'XX. Trupp'}
      ]
    }, function(err, data) {
      if (err) return done(err);

      api.get('/api/groups/' + data[0][0]._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Object).and.to.have.property('name', 'XX. Trupp');
          done();
        });
    });
  });
});
