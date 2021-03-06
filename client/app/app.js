'use strict';

angular.module('diptervApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'ngTagsInput',
  'chart.js',
  'ui.bootstrap.datetimepicker',
  'angularSpinner'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });
