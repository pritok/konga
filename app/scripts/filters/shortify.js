'use strict';

/**
 * @ngdoc filter
 * @name konga.filter:shortify
 * @function
 * @description
 * # shortify
 * It receive a String (i.e. input) and length, and it returns another one containing extract characters from the old one arranging the index from 0 to length.
 * @param {string} input Defines  the name of field
 * @param {Number} length Defines the number of extract characters 
 */
angular.module('konga')
  .filter('shortify', function () {
    return function (input, length) {
      var ret;
      try {
      	ret = input.substring(0, length);
      } catch(e) {
      	ret = input;
      	// TODO Throw exception
      }
      return ret;
    };
  });
