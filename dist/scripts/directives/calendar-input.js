'use strict';

/**
 * @ngdoc directive
 * @name uikongaApp.directive:calendarInput
 * @description
 * # calendarInput
 */
angular.module('ui.konga')
  .directive('calendarInput', function () {
    return {
      templateUrl: '/konga/views/calendar-input.html',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        
      }
    };
  });