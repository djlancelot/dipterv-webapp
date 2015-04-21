'use strict';

describe('Directive: sosplot', function () {

  // load the directive's module and view
  beforeEach(module('diptervApp'));
  beforeEach(module('app/sosplot/sosplot-quantity.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<sosplot></sosplot>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the sosplot directive');
  }));
});
