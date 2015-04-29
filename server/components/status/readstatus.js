/**
 * Created by Lacika on 2015.04.27..
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var status  = require('../status');

status.checkStates();
console.log(status.getStates());
