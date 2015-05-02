'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'dipterv-secret'
  },

  // List of user roles
  userRoles: ['guest', 'user', 'admin'],
  // Sparql prefixes
  sparql: {
    host: "http://localhost:5820/",
    prefixes: "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> "+
    "PREFIX owl: <http://www.w3.org/2002/07/owl#> "+
    "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> "+
    "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> "+
    "PREFIX demo: <http://mit.bme.hu/cps/demo-sensors#> " +
    "PREFIX mit: <http://mit.bme.hu/cps/sensor-schema#> "
  },
  status: {
    lifetime: 60
  },
  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});
