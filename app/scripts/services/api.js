'use strict';

/* TODO @deprecate */

/**
 * @ngdoc service
 * @name konga.api
 * @description
 * This factory connects the source to a factory, depending on the type of entity that's being looked for. 
 */
angular.module('konga')
  .factory('api', ['konga', 'standardApi', function (konga, standardApi) {

    // Public API here
    return {
      getLocalEndpoint : function (source) {
        var endpoint = konga.api(source);
        
        if(!endpoint) {
          endpoint = standardApi;
        }
        
        return endpoint;
      }
    };
  }]);

// Document the operations
/**
 * @ngdoc method
 * @name get
 * @methodOf konga.api
 * @description
 * Returns an entity identified with the unique id provided
 * @param {*} id The unique id for the entity
 * @param {Function} [success=undefined] Function to call if the operation successes.
 * @param {Function} [error=undefined] Function to call if the operation fails.
 * @returns {Object} The `$resource` with that entity
 */

 /**
 * @ngdoc method
 * @name search
 * @methodOf konga.api
 * @description
 * Search for entities filtering with the input query
 * @param {Object} query Query to filter with (sent via `GET` parameters, so they must be serializable, and serialized).
 * @param {Number} offset Defines where to place the starting cursor.
 * @param {Number} limit Defines how many results to get.
 * @param {Function} [success=undefined] Function to call if the operation successes.
 * @param {Function} [error=undefined] Function to call if the operation fails.
 * @returns {Array} Array containing all results. Each result is a `$resource` that contains an entity which matched the search criteria.
 */