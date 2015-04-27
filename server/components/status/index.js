/**
 * Created by Lacika on 2015.04.27..
 */

var _ = require('lodash');
var config = require('../../config/environment');
var rest = require('restler');
var moment = require('moment');
var states = [];

exports.getStates = function(){
  return states;
};

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
        return res.json(404,{msg: "Error retrieving data."});
      }else {
        var bindings = data.results.bindings;
        if(bindings.length == 0){
          return res.json(200,[]);
        }
        var result = new Array(bindings.length);
        var transformed = 0;
        bindings.forEach(function (item, index) {
          //TODO query sensor data
          result[index] = {"name": item.name.value, "procedure": item.procedure.value, "offering": item.offering.value};
          transformed+=1;
          if (transformed >= bindings.length){
            return res.json(200, result);
          }
        });
      }
    });
};
