'use strict';

angular.module('diptervApp')
  .controller('StatusCtrl', function ($scope, $http) {
    $http.get("/api/states").success(function(data){
      $scope.states = data;
    });
  });
