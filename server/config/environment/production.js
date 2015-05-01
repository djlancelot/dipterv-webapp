'use strict';

// Production specific configuration
// =================================

const SPARQL_PREFIXES = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> "+
    "PREFIX owl: <http://www.w3.org/2002/07/owl#> "+
    "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> "+
    "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> "+
    "PREFIX demo: <http://mit.bme.hu/cps/demo-sensors#> " +
    "PREFIX mit: <http://mit.bme.hu/cps/sensor-schema#> ";
module.exports = {
  // Server IP
  ip:       process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||
            undefined,

  // Server port
  port:     process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            8080,

  // MongoDB connection options
  mongo: {
    uri:    process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            process.env.OPENSHIFT_MONGODB_DB_URL+process.env.OPENSHIFT_APP_NAME ||
            'mongodb://localhost/dipterv'
  },
  sparql: {
    host: "http://localhost:5820/",
    db: "sont",
    user: "admin",
    pass: "admin",
    prefixes: SPARQL_PREFIXES
  },
  sos: {
    url: "http://152.66.253.152:8080/52n-sos-webapp-4.1.0/service"
  },
  status: {
    lifetime: 60,
    checkinterval: 15
  }
};
