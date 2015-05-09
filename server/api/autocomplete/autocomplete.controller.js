'use strict';

var _ = require('lodash');
var async = require('async');
var mydog = require('../../components/mydog');
// Get list of autocompletes
exports.index = function(req, res) {
  var conn = mydog.getConnection();
  var param = req.query.q || "";
  var query = 'SELECT ?name ?label {?name rdfs:subClassOf+ mit:sensor ; rdfs:label ?label. FILTER regex(?label, "'+
      param +
      '","i")}';
  conn.query({
        database: mydog.db,
        query: mydog.prefixes + query,
        limit: 50,
        offset: 0
      },function(data){
        if(data === null ||  typeof data.results === 'undefined' ||typeof data.results.bindings === 'undefined'){
          res.json(404,"No results.");
        }else {
          var bindings = data.results.bindings;
          async.map(bindings,function (item, callback) {
            callback(null, {"text": item.label.value, "value": item.name.value , "type": "sensortype"});
          },function(err, arr){
            res.json(200,arr);
          });
        }
  });

};
