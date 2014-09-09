'use strict';

describe('Directive: filterManager', function () {

  // load the directive's module
  beforeEach(module('sigmaNgApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<filter-manager></filter-manager>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the filterManager directive');
  }));
});
