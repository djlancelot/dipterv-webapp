'use strict';

angular.module('diptervApp')
  .controller('ListCtrl', ['$scope', '$http', 'usSpinnerService', function ($scope, $http, usSpinnerService) {
      $scope.searchParams = [];
      $scope.searchElements = function(query){
        return $http.get('/api/autocomplete?q=' + query);
      };
      $scope.search = function(){
        usSpinnerService.spin('mainspinner');

        $http.post('/api/search', {anydata: $scope.searchParams}).
        success(function(data) {
          $scope.data = data;
          usSpinnerService.stop('mainspinner');

          }).
        error(function() {
          $scope.error = 'Error retrieving sensor list.';
            usSpinnerService.stop('mainspinner');

          });
    };
    $scope.search('pamparam');
  }]).filter('escape', function() {
    return window.encodeURIComponent;
  });
