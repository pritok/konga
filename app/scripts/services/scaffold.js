'use strict';

/**
 * @ngdoc service
 * @name konga.scaffold
 * @description
 * # scaffold
 * Service in the konga.
 */
angular.module('konga')
  .service('scaffold', ['$filter', 'common', 'util', 
    function scaffold($filter, common, util) {

        function generate(fields, entity, search) {
            // Setup the entity
            for(var i = 0; i < fields.length; i++) {
                // Current field
                var field = fields[i];

                // Not related fields are appended with the default value (FIXME)
                //if(search) {

                    // Get the multiplicity
                    var multiplicity = !search ? field.multiplicity : field.searchConf.multiplicity;

                    // Get the type
                    var type = field.type.type;

                    // Get the default value
                    var defaultValue = field.defaults;

                    var castValue = null;

                    // If defaultValue = 'null' => null
                    // If multiplicity = MANY => value = new Array;
                    // If type != text => cast defaultValue

                    // If the field is an id, we initialize as null
                    if(defaultValue == 'null' || field.isId) {
                        castValue = null;
                    }
                    else if(multiplicity == util.constants.MULTIPLICITY_MANY && !(search && field.fieldType.search === util.constants.FIELD_COMPLEX)) {
                        castValue = [];
                    }
                    else if(type !== util.constants.FIELD_TEXT) {
                        switch(type) {
                        case util.constants.FIELD_BOOLEAN:
                            if(search) {
                                if(defaultValue === 'true') castValue = true;
                                else if(defaultValue === 'false') castValue = false;
                                else castValue = null;
                            }
                            else {
                                castValue = defaultValue === 'true';
                            }
                            break;
                        case util.constants.FIELD_COMPLEX:
                            // Initialized as null, valorized afterwards
                            castValue = null;

                            // Control if field rendering is also complex
                            // TODO Make this recursive (and for updation too)
                            if(search && field.fieldType.search === util.constants.FIELD_COMPLEX) {
                                var innerFields = field.searchable.fields;
                                var apiNames = field.apiName;
                                if(innerFields.length) {
                                    castValue = {};
                                    if(apiNames && apiNames.length == innerFields.length) {
                                        innerFields = apiNames;
                                    }
                                    for(var f = 0; f < innerFields.length; f++) {
                                        var innerFieldName = innerFields[f];

                                        castValue[$filter('fieldApiName')(innerFieldName)] = null;


                                        
                                    }
                                }
                            }
                            break;
                        case util.constants.FIELD_DATE:
                            if(search) {
                                castValue = {
                                    startDate: 0,
                                    endDate: 0,
                                    comparator: util.constants.DATE_COMPARATOR_EQUALS
                                };
                            }
                            else {
                                //var strDate = defaultValue;
                                if(defaultValue == util.constants.DATE_DEFAULT_NOW) {
                                    castValue = new Date().getTime();
                                }
                                else {
                                    // TODO Cast date :)
                                    castValue = null;
                                }
                            }
                            break;
                        case util.constants.FIELD_NUMBER:
                            castValue = defaultValue ? parseInt(defaultValue) : defaultValue;
                            break;
                        case util.constants.FIELD_STRING:
                        	if(typeof defaultValue !== 'undefined') {
                        		castValue = defaultValue;
                        	}
                        	break;
                        }
                    }
                    else {
                        castValue = defaultValue;
                    }

                    entity[field.name] = castValue;
               // }

                
                  // For the related fields we just want the one that is key, named with the real field name, and initialized as null
                  // Thus the user could fulfill the values like if it were an update
                 
                // else if(field.isKey) {
                //     // Configure ApiPath
                //     entity[field.name] = null;
                // }
            }
        }

        this.newEntity = function(metadata, resource) {

        	// Create the new entity
        	var entity = null;
        	
        	if (resource === undefined) 
        		entity = {};
        	else
        		entity = new resource(); 
        	
        	// Get all fields
        	var fields = util.getEntityFields(metadata);

        	generate(fields, entity);

        	return entity;
        };

        this.newQuery = function(metadata) {

            // Create the query object
            var query = {};

            // Get fields from the metadata (only the one for searching)
            var entityFields = util.getEntityFields(metadata);
            var fields = $filter('searchParams')(entityFields, metadata);

            generate(fields, query, true);

            // Set up the centre operat
            // FIXME Move this elsewhere :D
            // And FIX THIS !!!!!!!!!!!!!!!!!
            if(query.idCtrOperat !== undefined) {
                var ctrOperat = common.read('ctr-operat');
                var idCtrOperat = ctrOperat.id;
                query.idCtrOperat = idCtrOperat;
            }

            return query;
        };
      }]);
