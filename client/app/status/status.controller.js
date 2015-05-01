'use strict';

angular.module('diptervApp')
  .controller('StatusCtrl', function ($scope, $http) {
    $scope.setOrdering = function (order) {
      $scope.ordering = order;
    };
    $http.get("/api/states").success(function(data){
      $scope.states = data.states;
      $scope.header = data.header;
      $scope.ordering =  data.header[0].value;
    });
  });
