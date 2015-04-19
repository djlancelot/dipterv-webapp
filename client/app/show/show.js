'use strict';

angular.module('diptervApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/show/:procedure*', {
        templateUrl: 'app/show/show.html',
        controller: 'ShowCtrl'
      }).otherwise(
      {redirectTo: '/list'}
    );
  });
