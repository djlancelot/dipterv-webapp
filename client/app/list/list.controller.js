'use strict';

angular.module('diptervApp')
  .controller('ListCtrl', ['$scope', '$http', function ($scope, $http) {
      $scope.searchParams = [];
      $scope.searchElements = function(query){
        return $http.get('/api/autocomplete?q=' + query);
      };
      $scope.search = function(){
      $http.post('/api/search', {anydata: $scope.searchParams}).
        success(function(data) {
          $scope.data = data;
        }).
        error(function() {
          $scope.error = 'Error retrieving sensor list.';
        });
    };
    $scope.search('pamparam');
  }]).filter('escape', function() {
    return window.encodeURIComponent;
  });
