'use strict';

angular.module('diptervApp')
  .controller('ShowCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
        var procedure = $routeParams.procedure;
    $scope.fromSet = function (newDate, oldDate) {
      console.log(newDate);
    }
      var toDate = moment();
      var fromDate = moment().subtract(6,'hours');
    $scope.dataTo = toDate.toDate();
    $scope.dataFrom = fromDate.toDate();
    console.log(fromDate);
      $http.get("/api/capabilities?p="+ encodeURIComponent(procedure)).success(function(data){
       $scope.obs = data;
        $scope.title = data[0].name;

    });
  }]);
