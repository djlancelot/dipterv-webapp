'use strict';

var _ = require('lodash');
var state = require('../../components/status');

// Get list of states
exports.index = function(req, res) {
  res.json(200,{"states": state.getStates(),
    "header": [
      {"text": "Procedure", "value": "name"},
      {"text": "Observed Property", "value": "observedPropetyName"}
    ]});
};
