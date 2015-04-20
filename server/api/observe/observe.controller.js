'use strict';

var _ = require('lodash');
var sos = require('../../components/sos');
var async = require('async');
// Get observation
exports.index = function(req, res) {
  function handleData(data){
    var coord  = data[0].featureOfInterest.geometry.coordinates;
    var uom  = data[0].result.uom;
    var max = 20;
    var cnt = 0;
    var x = new Array(max);
    var y = new Array(max);
    function dateCompare(a,b){
        if (a.resultTime < b.resultTime)
            return 1;
        if (a.resultTime > b.resultTime)
            return -1;
        return 0;
    };
    data.sort(dateCompare);
    data.forEach(function(item, index, arr){
        if( index <  max){
            x[ index ]=item.resultTime;
            y[ index ]=item.result.value;
        }
        cnt+=1;
        if(cnt >= arr.length){
            return res.json(200,{"location": {"lat": coord[0], "lng": coord[1]}, "uom": uom, "x": x, "y": y});
        }
    });

  }
  var params = {
    "procedure": "procedure/eco/61BDF0",
    "offering": "offering/pir13",
    "featureOfInterest": "foi/ie322",
    "observedProperty": "observableProperty/temperature"
  };
  sos.getObservation(params,handleData);

};
