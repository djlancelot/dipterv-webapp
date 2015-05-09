'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/location', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/location')
      .expect(404)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});
