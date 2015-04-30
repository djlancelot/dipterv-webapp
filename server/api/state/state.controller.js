'use strict';

var _ = require('lodash');
var state = require('../../components/status');

// Get list of states
exports.index = function(req, res) {
  res.json(200,state.getStates());
};
