'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/autocomplete', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/autocomplete?q=wea')
      .expect(404)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.equal('No results.');
        done();
      });
  });
});
