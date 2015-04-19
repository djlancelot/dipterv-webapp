'use strict';

// Development specific configuration
// ==================================
const SPARQL_PREFIXES = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> "+
    "PREFIX owl: <http://www.w3.org/2002/07/owl#> "+
    "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> "+
    "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> "+
    "PREFIX demo: <http://mit.bme.hu/cps/demo-sensors#> " +
    "PREFIX mit: <http://mit.bme.hu/cps/sensor-schema#> ";
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/dipterv-dev'
  },

  seedDB: true,
  sparql: {
    host: "http://localhost:5820/",
    db: "sont",
    user: "admin",
    pass: "admin",
    prefixes: SPARQL_PREFIXES
  }
};

