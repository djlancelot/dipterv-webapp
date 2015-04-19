'use strict';

var _ = require('lodash');
var mydog = require('../../components/mydog');
// Get list of autocompletes
exports.index = function(req, res) {
  var conn = mydog.getConnection();
  var result = [];
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
        if(data==null){
          res.json(404,"No results.");
        }else {
          var bindings = data.results.bindings;
          bindings.forEach(function (item) {
            result.push({"text": item.label.value, "value": item.name.value , "type": "sensortype"});
          });
          res.json(result);
        }
  });

};