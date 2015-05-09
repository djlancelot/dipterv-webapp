'use strict';

describe('Directive: sosmap', function () {

  // load the directive's module and view
  beforeEach(module('diptervApp'));
  beforeEach(module('app/sosmap/sosmap.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<sosmap></sosmap>');
    element = $compile(element)(scope);
    scope.$apply();
    //expect(element.text()).toBe('this is the sosmap directive');
  }));
});
