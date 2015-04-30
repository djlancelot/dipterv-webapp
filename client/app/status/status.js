'use strict';

angular.module('diptervApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/status', {
        templateUrl: 'app/status/status.html',
        controller: 'StatusCtrl'
      });
  });
