'use strict';

angular.module('diptervApp')
  .directive('sosplot', function ($http) {

    return {
      template: '<div ng-include="contentUrl"></div>',
      restrict: 'EA',
      link: function (scope) {
        scope.onClick = function (points, evt) {
          console.log(points, evt);
        };
        scope.errorMsg = null;
        var type;
        if (typeof scope.observation === 'undefined' || typeof scope.observation.observationType === 'undefined' ){
          type = 'quantity';
        }else{
          type = scope.observation.observationType;
        }

        scope.contentUrl = 'app/sosplot/sosplot-'+ type + '.html';
        scope.labels = [0,1];
        scope.series = ['No data'];
        scope.data = [[0,1]];
        function initplot(data){
          scope.labels = data.x;
          scope.series = [data.uom];
          scope.data = [data.y];
        }
        var reload = function(){
          var starttime;
          var endtime;
          if(typeof scope.starttime === 'undefined'){
            starttime = new Date();
          }else{
            starttime = scope.starttime;
          }
          if(typeof scope.endtime === 'undefined'){
            endtime = new Date();
          }else{
            endtime = scope.endtime;
          }
          console.log('Start changed: ' + starttime.toJSON());
          console.log('End changed: ' + endtime.toJSON());
          $http.post('/api/observe', {observation: scope.observation, zoom: 0, start:0, starttime: starttime, endtime: endtime})
            .success(function(data){
              initplot(data);
              scope.errorMsg = null;
            }).error(function(error){
              scope.errorMsg = error;
              console.log(error);
            });
        };
        scope.$watch('starttime',reload);
        scope.$watch('endtime',reload);


      },
      scope: {
        observation: '=',
        starttime: '=',
        endtime: '='
      }
    };
  });
