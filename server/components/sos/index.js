'use strict';

var _ = require('lodash');
var config = require('../../config/environment');
var rest = require('restler');

exports.getObservation = function(params,starttime, endtime,  callback)
{// post JSON

  var jsonData = {
    "request": "GetObservation",
    "service": "SOS",
    "version": "2.0.0",
    "procedure": params.procedure,
    "offering": params.offering,
    "observedProperty": params.observedProperty,
    "featureOfInterest": params.featureOfInterest,
    "temporalFilter": {
      "during": {
        "ref": "om:phenomenonTime",
        "value": [
          starttime,
          endtime
        ]
      }
    }
  };
  rest.postJson(config.sos.url, jsonData).on('complete', function (data, response) {
    callback(data.observations);
  });
}
exports.getFeatureOfInterest = function(params, callback)
{// post JSON

  var jsonData = {
    "request": "GetFeatureOfInterest",
    "service": "SOS",
    "version": "2.0.0",
    "procedure": params.procedure,
    "observedProperty": params.observedProperty,
    "featureOfInterest": params.featureOfInterest
  };
  rest.postJson(config.sos.url, jsonData).on('complete', function (data, response) {
    console.log(data);
    if(data === null || data.featureOfInterest.length === 0){
      return callback({lat: 0, lng: 0});
    }
    var coords = data.featureOfInterest[0].geometry.coordinates;

    callback({lat: coords[0], lng: coords[1]});
  });
}
