'use strict';

angular.module('diptervApp')
  .directive('sosmap', function () {
    function controllerFunc ($scope, $http) {

      $scope.loadDataToMap = function(observation, map){
        $http.post("/api/location", {observation: observation, zoom: 0, start:0}).success(function(data){
          initmap(data, map);
        });
      }
    }
    function loadScript() {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' +
        '&signed_in=true&callback=initialize';
      document.body.appendChild(script);
    }
    function linkFunc(scope,element,atts){
      window.initialize = function(){
        scope.loadDataToMap(scope.observation, element.find("#map")[0]);
      }
      loadScript();
    }
    function initmap(loc, mapElement){
      var map;
      var myLatlng = new google.maps.LatLng(loc.lat,loc.lng);
      var mapOptions = {
        zoom: 12,
        center: myLatlng
      };
      map = new google.maps.Map(mapElement,
          mapOptions);

      var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: "Sensor position"
      });
    }
    return {
      templateUrl: 'app/sosmap/sosmap.html',
      restrict: 'EA',
      controller: controllerFunc,
      link: linkFunc,
      scope: {
        observation: "="
      }
    };
  });
