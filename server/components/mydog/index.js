'use strict';

var _ = require('lodash');
var config = require('../../config/environment');
var stardog = require('stardog');

exports.getConnection = function(isReasoning){
    isReasoning = typeof isReasoning !== 'undefined' ? isReasoning : false;
    var conn = new stardog.Connection();
    conn.setReasoning(isReasoning);
    conn.setEndpoint(config.sparql.host);
    conn.setCredentials(config.sparql.user, config.sparql.pass);
    return conn;
}
exports.prefixes = config.sparql.prefixes;
exports.db = config.sparql.db;