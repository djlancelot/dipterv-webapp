'use strict';

var _ = require('lodash');
var sos = require('../../components/sos');
var async = require('async');
// Get observation
exports.index = function(req, res) {
  function handleData(type){
    var parser;
    switch (type) {
      case "quantity":
        parser = function (result) {
          return result.value;
        };
        break;
      case "boolean":
        parser = function (result) {
          if (result === true) {
            return 1;
          } else {
            return 0;
          }
        };
        break;
    }
    return function(data){
    if(typeof data === "undefined" || data === null || data.length === 0){
      return res.json(400,{msg: "No data in given range."});
    }
    var coord  = data[0].featureOfInterest.geometry.coordinates;
    var uom  = data[0].result.uom;
    var max = 50;
    var cnt = 0;
    var x = [];
    var y = [];
    function dateCompare(a,b){
        if (a.resultTime < b.resultTime)
            return 1;
        if (a.resultTime > b.resultTime)
            return -1;
        return 0;
    }
    data.sort(dateCompare);
    data.forEach(function(item, index, arr){
        if( index <  max){
            x[ index ]=item.resultTime;
            y[ index ]=parser(item.result);
          console.log(item.result);
        }
        cnt+=1;
        if(cnt >= arr.length){
            return res.json(200,{"location": {"lat": coord[0], "lng": coord[1]}, "uom": uom, "x": x, "y": y});
        }
    });

  };
  }


  var params = {
    "procedure": "procedure/eco/61BDF0",
    "offering": "offering/pir13",
    "featureOfInterest": "foi/ie322",
    "observedProperty": "observableProperty/temperature",
    "observationType": "quantity"
  };
  var body = req.body;
  var observation = body.observation || {};
  console.log(observation);
  if(observation.hasOwnProperty("procedure") &&
    observation.hasOwnProperty("offering") &&
    observation.hasOwnProperty("observedProperty") &&
    observation.hasOwnProperty("featureOfInterest") &&
    observation.hasOwnProperty("observationType")) {
    sos.getObservation(observation,body.starttime, body.endtime, handleData(observation.observationType));
  }else{
    res.json(404,observation);
  }

};
