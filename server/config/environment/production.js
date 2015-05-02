'use strict';

// Production specific configuration
// =================================

module.exports = {
  // Server IP
  ip:       process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||
            undefined,

  // Server port
  port:     process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            8087,

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
    pass: "admin"
   },
  sos: {
    url: "http://152.66.253.152:8080/52n-sos-webapp-4.1.0/service"
  },
  status: {
    checkinterval: 15
  }
};
