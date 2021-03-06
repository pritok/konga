'use strict';

/**
 * @ngdoc filter
 * @name konga.filter:selectData
 * @function
 * @description
 * #selectData
 * It receives metadata, an array of entities and configuration (i.e. boolean), and it returns an array of objects containing data  from these parameters (i.e. entities) for selecting purpose.
 * @param {Object} metadata Defines the metadata of the entity
 * @param {Object} entities Defines the an array of entities to manage
 * @param {Object} configuration Defines an object containing added and selected field. 
 */
angular.module('konga')
  .filter('selectData', ['util', function (util) {
    return function (metadata, entities, configuration) {
		var result = [];

		for(var i = 0; i < entities.length; i++) {
			var added = configuration && configuration.added !== undefined ? configuration.added : false;
			var selected = configuration && configuration.selected !== undefined ? configuration.selected : false;

			var obj = {
				id : util.getEntityId(metadata, entities[i]),
				key : util.getEntityCode(metadata, entities[i]),
				value : util.getEntityLabel(metadata, entities[i]),
				added: added,
				selected: selected
			};
			result.push(obj);
		}

      return result;
    };
  }]);
