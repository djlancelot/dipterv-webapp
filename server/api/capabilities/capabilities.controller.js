'use strict';

var _ = require('lodash');
var mydog = require('../../components/mydog');
var SEPARATOR = ",";
// Get list of capabilitiess
exports.index = function(req, res) {
  var procs = req.query.p.split(SEPARATOR);
  var conn = mydog.getConnection();

  var query = mydog.prefixes +
      "SELECT ?label ?procedure ?offering ?foi ?flabel ?observable ?obs_name ?tlabel " +
      "WHERE { <" + procs[0] + "> " +
      "demo:procedure ?procedure ; rdfs:label ?label; demo:offering ?offering  ; demo:observedProperty ?obs ; mit:hasLoc ?loc."+
      "?loc demo:foi ?foi; rdfs:label ?flabel. ?obs demo:observedPropertyURI ?observable ; rdfs:label ?obs_name ; mit:hasObservedPropertyType ?type ."+
      "?type rdfs:label ?tlabel}";

  console.log(query);
  conn.query({
        database: mydog.db,
        query: query,
        limit: 50,
        offset: 0
      },
      function (data) {
        console.log(data);
        if(data==null){
          res.json(404,"No results.");
        }else {
          var bindings = data.results.bindings;

          var result = new Array(bindings.length);
          var transformed = 0;
          bindings.forEach(function (item, index) {
            console.log(item);
            result[index] = {
              "name": item.label.value,
              "procedure": item.procedure.value,
              "offering": item.offering.value,
              "observedProperty": item.observable.value,
              "observation": item.obs_name.value,
              "observationType": item.tlabel.value,
              "featureOfInterest": item.foi.value,
              "featureOfInterestLabel": item.flabel.value
            };
            transformed+=1;
            if (transformed >= bindings.length){
              return res.json(200, result);
            }
          });
        }
      });
};
