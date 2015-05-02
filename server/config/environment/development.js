'use strict';

// Development specific configuration
// ==================================

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
    pass: "admin"
  },
  sos: {
    url: "http://152.66.253.152:8080/52n-sos-webapp-4.1.0/service"
  },
  status: {
    checkinterval: 15
  }
};

