/**
 * Created by Lacika on 2015.04.27..
 */

var _ = require('lodash');
var config = require('../../config/environment');
var rest = require('restler');
var moment = require('moment');
var sos = require('../sos');
var states = [];

exports.getStates = function(){
  return states;
};
function saveState(data){
  //TODO recieve obs data and save state
}
exports.checkStates = function(){
  var conn = mydog.getConnection();

  var query = mydog.prefixes +
    "SELECT ?procedure ?name ?offering ?foi ?observable ?obs_name "  +
    "{ ?class rdfs:subClassOf+ mit:sensor  ."+
    " ?procedure rdf:type  ?class ; rdfs:label ?name ; demo:offering ?offering;  demo:observedProperty ?obs ; mit:hasLoc ?loc." +
    " ?loc demo:foi ?foi. ?obs demo:observedPropertyURI ?observable ; rdfs:label ?obs_name ; mit:hasObservedPropertyType ?type ." +
    " ?type rdfs:label ?type_label}";


    console.log(query);
  conn.query({
      database: mydog.db,
      query: query,
      limit: 500,
      offset: 0
    },
    function (data) {
      console.log(data);
      if(data==null){
        return null;
      }else {
        var bindings = data.results.bindings;
        if(bindings.length == 0){
          return null;
        }
        bindings.forEach(function (item, index) {
          var params = {
            "procedure": item.procedure.value,
            "name": item.name.value,
            "offering": item.offering.value,
            "featureOfInterest": item.foi.value,
            "observedPropery": item.observable.value,
            "observedPropetyName": item.obs_name.value
          }
          var starttime = moment().subtract(1,'hour');
          var endtime = moment();

          sos.getObservation(params,starttime,endtime,saveState);

        });
      }
    });
};
