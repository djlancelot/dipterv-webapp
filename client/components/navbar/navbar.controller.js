'use strict';

angular.module('diptervApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Summary',
      'link': '/'
    },
      {
        'title': 'List',
        'link': '/list'
      }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
