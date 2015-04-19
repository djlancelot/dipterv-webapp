'use strict';

angular.module('diptervApp')
  .controller('ListCtrl', ['$scope', '$http', function ($scope, $http) {
      $scope.searchParams = [];
      $scope.searchElements = function(query){
        return $http.get('/api/autocomplete?q=' + query);
      };
      $scope.search = function(){
      $http.post('/api/search', {data_or: $scope.searchParams}).
        success(function(data, status, headers, config) {
          $scope.data = data;
        }).
        error(function(data, status, headers, config) {
          $scope.error = "Error retrieving sensor list.";
        });
    }
    $scope.search("pamparam");
  }]).filter('escape', function() {
    return window.encodeURIComponent;
  });
