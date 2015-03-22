'use strict';

angular.module('diptervApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/list', {
        templateUrl: 'app/list/list.html',
        controller: 'ListCtrl'
      });
  });
