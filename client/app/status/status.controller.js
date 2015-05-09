'use strict';

angular.module('diptervApp')
  .controller('StatusCtrl', function ($scope, $http,  usSpinnerService) {
    usSpinnerService.spin('mainspinner');

    $scope.setOrdering = function (order) {
      $scope.ordering = order;
    };
    $http.get('/api/states').success(function(data){
      usSpinnerService.stop('mainspinner');
      $scope.states = data.states;
      $scope.header = data.header;
      $scope.ordering =  data.header[0].value;
    }).error(function(){
      usSpinnerService.stop('mainspinner');

    });
  });
