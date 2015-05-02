'use strict';

var _ = require('lodash');
var sos = require('../../components/sos');

// Get list of locations
exports.index = function(req, res) {


  var params = {
    "procedure": "procedure/eco/61BDF0",
    "offering": "offering/pir13",
    "featureOfInterest": "foi/ie322",
    "observedProperty": "observableProperty/temperature",
    "observationType": "quantity"
  };
  var observation = req.body.observation;
  console.log(observation);
  if(typeof observation !== 'undefined' &&
    observation.hasOwnProperty("procedure") &&
    observation.hasOwnProperty("observedProperty") &&
    observation.hasOwnProperty("featureOfInterest")) {
    sos.getFeatureOfInterest(observation,
    function(data){
      res.json(200,data);
    });
  }else{
    res.json(404,observation);
  }


};
