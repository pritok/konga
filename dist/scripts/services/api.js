'use strict';

/**
 * @ngdoc service
 * @name kongaUI.Api
 * @description
 * This factory connects the source to a factory, depending on the type of entity that's being looked for. 
 */
angular.module('ui.konga')
  .factory('api', function (standardApi, catalogProduct) {

    // Public API here
    return {
      getLocalEndpoint : function (source) {
        var endpoint = null;
        switch(source) {
        case 'catalog-product':
          endpoint = catalogProduct;
          break;
        default:
            endpoint = standardApi;

        }
        
        return endpoint;
      }
    };
  });

// Document the operations
/**
 * @ngdoc method
 * @name get
 * @methodOf kongaUI.Api
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
 * @methodOf kongaUI.Api
 * @description
 * Search for entities filtering with the input query
 * @param {Object} query Query to filter with (sent via `GET` parameters, so they must be serializable, and serialized).
 * @param {Number} offset Defines where to place the starting cursor.
 * @param {Number} limit Defines how many results to get.
 * @param {Function} [success=undefined] Function to call if the operation successes.
 * @param {Function} [error=undefined] Function to call if the operation fails.
 * @returns {Array} Array containing all results. Each result is a `$resource` that contains an entity which matched the search criteria.
 */