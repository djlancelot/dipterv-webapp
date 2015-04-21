'use strict';

angular.module('diptervApp')
  .controller('ShowCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
        var procedure = $routeParams.procedure;
      $http.get("/api/capabilities?p="+ encodeURIComponent(procedure)).success(function(data){
       $scope.obs = data;
    });
  }]);
