'use strict';

/**
 * @ngdoc filter
 * @name sigmaNgApp.filter:fieldApiName
 * @function
 * @description
 * # fieldApiName
 * Filter in the sigmaNgApp.
 */
angular.module('sigmaNgApp')
  .filter('fieldApiName', function () {
    return function (fieldName, source) {
		var attrs = fieldName.split(' ');
		if(attrs.length === 1) {
			return fieldName;
		}

		else if(attrs[1] === constants.COMPLEX_FIELD_AS) {

			if(source && attrs[1] === constants.SELF_FIELD) {
				return source.name;
			}
			return attrs[2];
		}
    };
  });
