'use strict';

angular.module('diptervApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [
      {
        'title': 'Sensor browser',
        'link': '/list'
      },
      {
        'title': 'About',
        'link': '/'
      }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
