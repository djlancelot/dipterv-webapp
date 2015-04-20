'use strict';

var _ = require('lodash');
var config = require('../../config/environment');
var rest = require('restler');

exports.getObservation = function(params, callback)
{// post JSON
  if(params.hasOwnProperty("procedure") &&
    params.hasOwnProperty("offering") &&
    params.hasOwnProperty("observedProperty") &&
    params.hasOwnProperty("featureOfInterest")){
  var jsonData = {
    "request": "GetObservation",
    "service": "SOS",
    "version": "2.0.0",
    "procedure": params.procedure,
    "offering": params.offering,
    "observedProperty": params.observedProperty,
    "featureOfInterest": params.featureOfInterest
  };
  rest.postJson(config.sos.url, jsonData).on('complete', function (data, response) {
    console.log(data);
    callback(data.observations);
  });
  }else{
    return new Error("All for parameters are required.");
  }
}
