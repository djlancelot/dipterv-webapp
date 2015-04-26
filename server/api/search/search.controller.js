'use strict';

var _ = require('lodash');
var mydog = require('../../components/mydog');


// Search
exports.index = function(req, res) {
  var params = req.body.data_or || [];
  var class_filter_list = [];
  var class_condition = "";
  if(params.length > 0){
      params.forEach(function(item){
        switch(item.type){
          case "sensortype":
                class_filter_list.push("{ ?class rdfs:subClassOf* <"+ item.value + "> } ");
                break;
          case "sensorname":
                class_filter_list.push("{ ?procedure rdfs:label \""+ item.value + "\" } ");
                break;

        }
      });
    class_condition = ". " + class_filter_list.join(" UNION ") + "";
  }
  var conn = mydog.getConnection();

  var query = mydog.prefixes +
    "SELECT ?procedure ?name ?offering " + "" +
    "{ ?class rdfs:subClassOf+ mit:sensor  ."+
    " ?procedure rdf:type  ?class ; rdfs:label ?name ; demo:offering ?offering "+ class_condition+"}";

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
       return res.json(404,{msg: "Error retrieving data."});
      }else {
        var bindings = data.results.bindings;
        if(bindings.length == 0){
          return res.json(200,[]);
        }
        var result = new Array(bindings.length);
        var transformed = 0;
        bindings.forEach(function (item, index) {
          result[index] = {"name": item.name.value, "procedure": item.procedure.value, "offering": item.offering.value};
          transformed+=1;
          if (transformed >= bindings.length){
            return res.json(200, result);
          }
        });
      }
    });
};
