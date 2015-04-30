/**
 * Created by Lacika on 2015.04.27..
 */

var _ = require('lodash');
var config = require('../../config/environment');
var rest = require('restler');
var moment = require('moment');
var sos = require('../sos');
var mydog = require('../mydog');
var states = [];

/**
 * This variable sets the time after which each sensor
 * will be considered dead.
 */
var lifeLimit = 60;
/**
 * This variable sets the interval in minutes when each
 * status check is called.
 */
var intervalMin = 15;


exports.getStates = function(){
  return states;
};
exports.getInterval = function(){
  return intervalMin*60000;
};

exports.checkStates = checkStates = function(callback){
  console.log("Checking state");
  var conn = mydog.getConnection();

  var query = mydog.prefixes +
    "SELECT ?procedure ?name ?offering ?foi ?observable ?obs_name ?obs "  +
    "{ ?class rdfs:subClassOf+ mit:sensor  ."+
    " ?procuri rdf:type  ?class;demo:procedure ?procedure ; rdfs:label ?name ; demo:offering ?offering;  demo:observedProperty ?obs ; mit:hasLoc ?loc." +
    " ?loc demo:foi ?foi. ?obs demo:observedPropertyURI ?observable ; rdfs:label ?obs_name ; mit:hasObservedPropertyType ?type ." +
    " ?type rdfs:label ?type_label}";
  conn.query({
      database: mydog.db,
      query: query,
      limit: 500,
      offset: 0
    },
    function (data) {
      if(data==null){
        return null;
      }else {
        var bindings = data.results.bindings;
        if(bindings.length == 0){
          return null;
        }
        var counter =0;
        var printResult = function(){
          console.log(states);
        };
        bindings.forEach(function (item, index) {
          var params = {
            "procedure": item.procedure.value,
            "name": item.name.value,
            "offering": item.offering.value,
            "featureOfInterest": item.foi.value,
            "observedProperty": item.observable.value,
            "observedPropetyName": item.obs_name.value
          }
          var starttime = moment().subtract(lifeLimit,'minutes');
          var endtime = moment();
          var saveState = function(params){
            return function(data){
              var isDown = data == undefined?true:data.length == 0?true:false;
              params["down"]= isDown;
              console.log(params.name + "/"+ params.observedPropetyName+": " + isDown);
              if(states.indexOf(params)==-1){
                //This state is not registered
                params["down"]= !isDown;
                var revStateIdx = states.indexOf(params);
                if(revStateIdx > -1){
                  //Reverse state is registered
                  //1. restore state
                  params["down"]= isDown;
                  //2. remove the other and replace with current
                  states.splice(revStateIdx,1,params);
                }else{
                  // Nothing registered yet
                  //1. restore state
                  params["down"]= isDown;
                  //2. add to array
                  states.push(params)

                }
                //3. send an event of change

              }
              if (++counter >= bindings.length){

                return typeof callback == "function"?callback(states):states;
              }
            }
          };
          sos.getObservation(params,starttime.toISOString(),endtime.toISOString(),saveState(params));

        });
      }
    });
};

exports.startTimer = function(delay, callback){
  checkStates(callback);
  return setInterval(checkStates,delay, callback);
};
