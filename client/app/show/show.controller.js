'use strict';

angular.module('diptervApp')
  .controller('ShowCtrl', ['$scope', '$http', function ($scope, $http) {
      $scope.onClick = function (points, evt) {
        console.log(points, evt);
      };
      $scope.labels = [0,1,2,3];
      $scope.series = ['Series A'];
      $scope.data = [[0,1,2,3]];
      function initplot(data){
        $scope.labels = data.x;
        $scope.series = [data.uom];
        $scope.data = [data.y];
      }
      $http.get("/api/observe").success(function(data){
        initplot(data);
      });
  }]);
