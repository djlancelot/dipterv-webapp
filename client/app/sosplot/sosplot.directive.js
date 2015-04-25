'use strict';

angular.module('diptervApp')
  .directive('sosplot', function ($http) {

    return {
      template: '<div ng-include="contentUrl"></div>',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        scope.onClick = function (points, evt) {
          console.log(points, evt);
        };
        scope.errorMsg = null;
        scope.contentUrl = "app/sosplot/sosplot-"+ scope.observation.observationType + ".html";
        scope.labels = [0,1];
        scope.series = ['No data'];
        scope.data = [[0,1]];
        function initplot(data){
          scope.labels = data.x;
          scope.series = [data.uom];
          scope.data = [data.y];
        }
        var reload = function(){
          console.log("Start changed: " + scope.starttime.toJSON());
          console.log("End changed: " + scope.endtime.toJSON());
          $http.post("/api/observe", {observation: scope.observation, zoom: 0, start:0, starttime: scope.starttime, endtime: scope.endtime})
            .success(function(data){
              initplot(data);
              scope.errorMsg = null;
            }).error(function(error){
              scope.errorMsg = error;
              console.log(error);
            });
        }
        scope.$watch("starttime",reload);
        scope.$watch("endtime",reload);


      },
      scope: {
        observation: "=",
        starttime: "=",
        endtime: "="
      }
    };
  });
