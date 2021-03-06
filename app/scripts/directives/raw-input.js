'use strict';

/**
 * @ngdoc directive
 * @name konga.directive:rawInput
 * @scope
 * @restrict E
 * @description
 *
 * This is a directive for rendering a field into a form, using the {@link Metadata.Field field's metadata} defined. The `rawInput` does not have an appeareance itself, instead is `raw`, allowing multiple views - i.e. the specific field types - to use its features, yet keeping a particular appeareance defined within the view itself.
 *
 * <img src="/static/raw-input-init.png" width="50%" class="center">
 *
 * # Init/Update
 *
 * `update` is the process the `rawInput` uses to `map` the entity's field value into the `rawInput` {@link konga.directive:rawInput#properties_value `value`} object. To achieve this the `rawInput` leverages the {@link konga.filter:mapField `mapField`} filter.
 *
 * # Rendering
 * 
 * Once the values are loaded and the configuration interpreted, the `rawInput` proceeds to render your field. Depending on the `fieldType` assigned, the `rawInput` will adopt different appeareances.
 *
 * <img src="/static/raw-input-rendering.png" width="60%" class="center">
 *
 * ## Complex `fieldTypes`
 *
 * When a `fieldType` is marked as {@link Metadata.FieldTypes#properties_COMPLEX `COMPLEX`}, insted of rendering the field itself, a subset of fields is taken from the inner entity, depending on the configuration given to the complex field. When the `rawInput` detects it's dealing with a `COMPLEX` input, it renders a view consisting on more nested `rawInputs`. Then each field is treatedly independently, but using as field - and entity - the inner value corresponding to the parent field.
 * 
 *
 * ## Custom `fieldTypes`
 *
 * Sometimes Konga's standard inputs would not be enough for your needs. When this comes along, you'd find handy to create your own custom `fieldTypes` and configure your entity's fields to render using them. See the docs on {@link Customisation.Custom%20views#properties_fields custom fields}.
 *
 *
 * # Value `$watcher`
 * 
 * `rawInput` has a built-in feature to detect changes on your fields, and apply field mapping immediately. Yes, this is a native feature of Angular - bi-directional binding on inputs - but it's normally applied to plain inputs. `rawInput`'s  value `$watcher` initialise different `$watchers` depending on {@link Metadata.Field field's metadata}, so you always get notified when the real value needed for the entity is assigned to the `rawInput`. This allows you to render complex inputs who require an inner process to select the items - such as {@link Metadata.FieldTypes#properties_SELECT `select`} or {@link Metadata.FieldTypes#properties_PICK_LIST `pick list`} inputs. The value `$watcher` also handles casting, to give you the format and data type needed for the field.
 *
 * <img src="/static/raw-input-watcher.png" width="60%" class="center">
 *
 * # Data validation
 *
 * `rawInput` also reads the metadata for data validation. When an input changes, it's value is mapped against several validation processes - e.g. required, patterns, lengths, ... - to verify it's data maintains integrity with the requirements. If that's so, field's marked as valid, and hence the form will be submitted - once all fields become valid. On the other hand, if any parameter does not match the needs, the `$validity` object is leveraged to append data irregularities, which are shown to the user via tooltips.
 *
 * # Manual operation
 *
 * Sometimes you are handling data different than the standards, and native features won't satisfy the characteristics you need. To let you interact manually with the `rawInput`, from your custom code outside, you have several events that you can `$broadcast`, that will be listened by the `rawInput`, and apply manually the operations you want:
 *
 * * **'cascade_update'** (w/ `listenerName`) - Triggers a cascade downwards. This is launched on complex fields when a {@link Metadata.ConfigurationParam#properties_CASCADE_UPDATE `cascade`} is defined. It applies queries on inner objects defined on the `cascade` expression.
 * * **'complex_update'** (w/ `listenerName`) - It's `$broadcasted` (and listened) when a complex `fieldType` changes. Its listener handles the {@link Metadata.ConfigurationParam#properties_PROPAGATE_UPDATE `propagation`}.
 * * **'field-updated'** - Listened by linked fields, once the source field of its linking changes its value. Its listener executes the linking action on the target field.
 * * **'force-validation'** - Force the execution of a validation.
 * * **'locale-change'** - When language changes, the `rawInput` adapts its labels to the new language. While translation is autommatically engaged with the new language, Konga's {@link konga.filter:translateComplex `complex translation`} needs this event to adapt.
 * * **'manually_change'** (w/ `listenerName`) - If you changed the value of your field and yet the `$watchers` weren't executed, you can manually force a change `$watcher` process. This is never needed on Standard types, but may happen on {@link Customisation.Custom%20views#properties_Fields `custom`}.
 * * **'reset-form'** - On search mode, when user requests a `reset` the {@link konga.directive:searchPane `searchPane`} broadcasts an 'reset-form' event. This event is listened on underneath `rawInputs` and their values are reset to defaults.
 * * **'reset'** (w/ `listenerName`) - This does the same as the `reset-form`, but it's targeted to a targeted field.
 * * **'reset_cascade'** (w/ `listenerName`) - Resets the cascade procedures applied to the affected fields.
 * * **'setup-cascade'** - Allows you to enable/disable cascades, to avoid infinite loops on certain operations (such as batch updating). On init, cascades are disabled to avoid this issue.
 * * **'setup-propagation'** - Allows you to enable/disable propagations, to avoid infinite loops on certain operations (such as batch updating). On init, propagations are disabled to avoid this issue.
 * * **'setup-watchers'** - Allows you to enable/disable value watchers, to avoid erroneous `$digest` loops.
 * * **'update'** (w/ `listenerName`) - Launch an update process on the field. This is useful if something changed the value of the entity itself, but outside the bounds of the `rawInput`. In this case, you need to notify the `rawInput` to adopt the new value within the rendered field.
 *
 * ## <i class="fa fa-tag"></i> **`listenerName`**
 *
 * Most of the events you saw above are used along a `listenerName`. This means the event name changes, suffixing it with a value obtained for reading **`field.owner`-`field.name`** from the metadata - e.g. for calling an `update` under a `vehicle` -> `color` field, you should broadcast the event `update_vehicle_color`. With this method the event is completely mono-directional, and no extra process is launch upon its submittal.
 *
 * # <i class="fa fa-th-large"></i> Component catalog
 *
 * Here you have the full native `fieldType` catalog. You could build forms codelessly using any of these types. Click on anyone to see its particular details.
 *
 <div class="row">
   <div class="col-xs-12">
   	Plain inputs
   </div>
   <div class="col-xs-4 col-md-3">
   	Abc
   </div>
   <div class="col-xs-4 col-md-3">
   	123
   </div>
   <div class="col-xs-4 col-md-3">
   	Feb 29
   </div>
   <div class="col-xs-12">
   	Reference inputs
   </div>
   <div class="col-xs-12">
   	Complex inputs
   </div>
   <div class="col-xs-12">
   	Custom inputs
   </div>
 </div>
 * 
 * @param {Object} property Field to modify with the input
 * @param {*} vertical TODO Document
 * @param {Boolean} disabled Defines whether the field is disabled
 * @param {Function} setValues Function called to set up the values (for complex inputs)
 * @param {Object} operations Available operations for the directive
 * @param {Boolean} ngRequired Defines whether the field is required
 * @param {Object} entity Defines the real entity to manage
 * @param {Object=} rootEntity Defines the root entity (for complex fields)
 * @param {Object} metadata Defines the metadata of the entity
 * @param {Object=} rootMetadata Defines the root metadata (for complex fields)
 * @param {Function} updateEntity Function to call when the field is updated to update the entity
 * @param {Function} changeEntity Function to call when the field is updated to control changes
 * @param {string} mode Defines the mode of the field (i.e. Search, Update). See {@link kongaTools.Constants constants}
 * @param {Boolean} creating Defines whether the field is in creation mode or in update
 * @param {Object} parentField Defines the parent field (for complex fields)
 * @param {Object=} style If set, it overrides the default styling options for the field
 */
angular.module('konga')
  .directive('rawInput', ['$filter', '$modal', '$timeout', 'common', 'api', '$rootScope', 'configurationManager', 'standardApi', 'permissionManager', 'util', 'mapper', 
  	function($filter, $modal, $timeout, common, api, $rootScope, configurationManager, standardApi, permissionManager, util, mapper) {
	    return {
	      restrict: 'E',
	      replace: true,
	      scope: {
	    	property: '=',
	    	vertical: '=',
	    	disabled: '=',
	    	setValues: '&',
	    	operations: '=',
	    	ngRequired: '=',
	    	entity: '=',
	    	rootEntity: '=?',
	    	metadata: '=',
	    	rootMetadata: '=?',
	    	updateEntity: '=onUpdate',
	    	changeEntity: '=onChange',
	    	mode: '@',
	    	creating: '=',
	    	parentField: '=',
			style: '=?',
			index: '=?'

	      },
	      link: function(scope, element, attrs) {
	      	var resolveWatcher = null, valueWatcher = null;
	      	var init = undefined, initCheck = false, initactive = true, initinactive = false;
	      	
	      	// Global validation
	      	scope.globalValidation = true;

	      	// Flags for the cascade and propagation
	      	scope.cascadeEnabled = true;
	      	scope.propagateEnabled = true;
	      	scope.watchersEnabled = true;

	      	if(!scope.rootMetadata) {
	      		scope.rootMetadata = scope.metadata;
	      	}

	      	if(!scope.rootEntity) {
	      		scope.rootEntity = scope.entity;
	      	}

	      	var fieldConfig = scope.config = {
	      		hidden: false,
	      		init: true,
	      		showHint: true
	      	};

	      	var fieldValue = scope.value = {
	      		text: '',
	      		list: [],
	      		entity: scope.property.multiplicity === util.constants.MULTIPLICITY_MANY ? [] : {},
	      		date: {
	      			startDate: '',
	      			endDate: '',
	      			comparator: util.constants.DATE_COMPARATOR_EQUALS
	      		},
	      		range: {
	      			from: '',
	      			to: '',
	      			comparator: util.constants.NUMBER_COMPARATOR_BETWEEN
	      		},
	      		fields: [],
	      		files: []
	      	};

	      	// Setup the label
	      	scope.fieldLabel = scope.property.label;
	      	var configurationSource = [];

	      	var sourceField = scope.parentField ? scope.parentField : scope.property;

	        switch(scope.mode) {
	        case util.constants.SCOPE_SEARCH:
	          configurationSource = sourceField.searchable.configuration;
	          break;
	        case util.constants.SCOPE_UPDATE:
	          configurationSource = sourceField.showInUpdate.configuration;
	          break;
	        }

	        // Short label
	        var shortLabelConf = $filter('filter')(configurationSource, { key: util.constants.USE_SHORT_LABEL });

	      	if(shortLabelConf && shortLabelConf.length && shortLabelConf[0].value === 'true') {
	      		scope.fieldLabel = scope.property.shortLabel;
	      	}

	      	// Show hint
	      	var hintKey = scope.mode === util.constants.SCOPE_SEARCH ? util.constants.SHOW_HINT_SEARCH : util.constants.SHOW_HINT_UPDATE;
	      	var hintConf = configurationManager.get(hintKey, scope.property);
	      	if(hintConf !== undefined) {
	      		fieldConfig.showHint = hintConf;
	      	}

	      	// Read only
	      	scope.readonly = false;
  			var readonlyConf = $filter('filter')(configurationSource, { key: util.constants.READ_ONLY, value: 'true' }, true);

  			if(readonlyConf && readonlyConf.length) {
  				scope.readonly = true;
  			}

  			// Custom template
  			scope.config.customTemplate = null;
  			var customTemplate = configurationManager.get(util.constants.CUSTOM_FIELD_TEMPLATE, scope.property, scope.mode);
  			if(customTemplate) scope.config.customTemplate = customTemplate;

	      	// Trying to fix object duplicates
	      	function getList() {
	      		return fieldValue.list;
	      	}

	      	scope.label = '';

	      	var related = scope.parentField != null;
	      	var entityLabel = null;
	      	var entityLabelPlaceholder = null;
	      	// If the field is not related, the entity type is the entity being updated
	      	// TODO Translate on change!
	      	if(!related) {
	      		entityLabel = $filter('translate')(scope.metadata.label);
	      		entityLabelPlaceholder = scope.metadata.label;
	      	}
	      	else {
	      		var relatedMetadata = util.getMetadata(scope.property.owner);
	      		entityLabel = $filter('translate')(relatedMetadata.label);
	      		entityLabelPlaceholder = relatedMetadata.label;
	      	}

	      	// Extra parameters for the internationalization
	      	scope.extra = {
	      		label: entityLabel,
	      		labelPlaceholder: entityLabelPlaceholder
	      	};

			scope.update = function(init) {
				var value = '';
				if(this.entity && this.entity.$resolved !== false) {
					var value;
					if(this.mode === util.constants.SCOPE_UPDATE) {
					    value = $filter('mapField')(scope.entity, scope.property);
					} else {
						value = scope.entity[scope.property.name];
					}
					//try to get values based on the parent object
					if (value == null ) {
						var parent = scope.parentField;
						if (parent) {
							var apiNames = parent.apiName;
							// TODO Control other modes
							// var fields = scope.mode === util.constants.SCOPE_SEARCH ? parent.searchable.fields : parent.showInUpdate.fields;
							// var index = fields.indexOf(scope.property.name);
							// if(scope) {
								value = scope.entity[scope.property.apiName];
							// }
						}
					}

					// If the field is complex, get the source list for the related entity
					var complexProperty = null;
					var complexEntity = scope.entity;

					// TODO Move somewhere else to put this
					if(scope.property.isSelf) {
						complexEntity = scope.rootEntity;
					}

					if(scope.property.type.type === util.constants.FIELD_COMPLEX) {
						complexProperty = scope.property;
					}
					else if(scope.parentField && scope.parentField.type.type === util.constants.FIELD_COMPLEX) {
						complexProperty = scope.parentField;
					}

					if(complexProperty) {

						var related = complexProperty.type.complexType;

						// Get the real metadata
						var realMetadata = common.getMetadata(related);

						// Store the entity
						this.value.metadata = realMetadata;

						// If updating do some extra stuff
						if(scope.mode === util.constants.SCOPE_UPDATE) {
							var realEntity;
							if(!scope.parentField || scope.parentField.multiplicity === util.constants.MULTIPLICITY_ONE) {
								realEntity = $filter('mapField')(complexEntity, scope.property);
							}
							else {
								realEntity = [];
								for(var i = 0; i < complexEntity.length; i++) {
									realEntity.push($filter('mapField')(complexEntity[i], scope.property));
								}
							}

							// Try and set a label
							try {
								scope.setLabel(realMetadata, realEntity);
							}catch(e) {
								// XXX muahahahahahhahahaha
							}

							
							//FIXME The metadata contain the value of the field extended and maybe this is not the best place
							if (scope.property.isExtended){
								scope.value.extended = scope.property.labelExtended;
								scope.value.isExtended = scope.property.isExtended; 
							}
							
							scope.value.entity = realEntity;

							var entityCode = util.getEntityCode(realMetadata, realEntity);

							// TODO Control multiplicity
							if(entityCode !== null) {
								scope.value.text = entityCode;
							}
							else {
								scope.value.text = '';
							}
							
							$timeout(function(){
								// Lookup for cascade filters
								if(scope.property.derived) {
									var source = scope.parentField;
									var	configuration = source.showInUpdate.configuration;
									var listenerName = scope.parentField.owner + '_' + scope.parentField.name;
									var cascadeConfiguration = $filter('filter')(configuration, { key: util.constants.CASCADE_UPDATE });
									if(cascadeConfiguration.length) {
										scope.$emit('reset_cascade_' + listenerName, { reset: false, source: scope.property, configuration: cascadeConfiguration, query: scope.value.text });
									}
								}
							}, 50);

						}

						// If there are some nested fields used, go on
						var nestFields = null;
						if(scope.mode === util.constants.SCOPE_SEARCH && scope.property.searchable.fields && scope.property.searchable.fields.length) {
							nestFields = scope.property.searchable.fields;
						} // for search :)
						else if(scope.mode === util.constants.SCOPE_UPDATE && scope.property.showInUpdate.fields.length) { // And for update!
							nestFields = scope.property.showInUpdate.fields;
						}

						// Is there some field to nest?
						if(nestFields && init) {
							var allFields = util.getEntityFields(realMetadata);
							var selectedFields = $filter('selectedFields')(allFields, nestFields, scope.property);
							for (var i = 0; i < selectedFields.length; i++){
								// Setup the path source
								// selectedFields[i].derivedPath.splice(0, 0, scope.property);

								scope.value.fields.push(selectedFields[i]);
							}								
						}
						if(scope.mode === util.constants.SCOPE_SEARCH) {
							scope.value.text = value;
						}
					}

					switch(scope.property.type.type) {
					case util.constants.FIELD_COMPLEX:
						// Nothing to do here
						break;
					case util.constants.FIELD_BOOLEAN:
						if(scope.mode === util.constants.SCOPE_SEARCH) {
							scope.value.text = value;
							if(scope.value.text === '' || scope.value.text === null) {
								scope.value.active = true;
								scope.value.inactive = true;
							}								
							else {
								scope.value.active = !!scope.value.text;
								scope.value.inactive = !scope.value.text;
							}
						}
						else {
							scope.value.text = !!value;
						}
						break;
					case util.constants.FIELD_DATE:
						if (scope.mode === util.constants.SCOPE_UPDATE) {
							scope.value.text = value;
							if (scope.property.fieldType.update == util.constants.FIELD_DATE) {
								scope.value.text = $filter('date')(value, 'yyyy-MM-dd');
							} 
							
						} else if (scope.mode === util.constants.SCOPE_SEARCH) {
							scope.value.date = value;
						}
						break;
					default:
						if(scope.property.type.type === util.constants.FIELD_NUMBER && value!="" && value!=null){
							scope.value.text = Number(value);
						}else{
							scope.value.text = value;
						}

						if (value == undefined && scope.property.defaults != undefined && scope.creating) {
							// set default property value if any
							scope.value.text = scope.property.defaults;
						}
					}

					if(scope.property.type.list) {
						scope.value.list = angular.copy(scope.property.type.list);

						var multi = null;
						var fieldType = null;
						if(scope.mode === util.constants.SCOPE_SEARCH) {
							multi = fieldToMatch.searchConf.multiplicity;
							fieldType = fieldToMatch.fieldType.search;
						}
						else {
							multi = fieldToMatch.multiplicity;
							fieldType = fieldToMatch.fieldType.update;
						}

						// if multiplicity is one, append a null value to de-select
						if(fieldType === util.constants.FIELD_COMBOBOX && multi === util.constants.MULTIPLICITY_ONE) {
							scope.value.list.splice(0, 0, { key: null, value: 'combobox.placeholder'});
						}
					}
				}
				else if(this.entity && this.entity.$resolved === false) {
					resolveWatcher = scope.$watch('entity.$resolved', function() {
						if(scope.entity.$resolved !== false) {
							resolveWatcher();
							scope.update(true);
						}
					});

				}

				if(init && (this.entity && this.entity.$resolved !== false || scope.creating)) {
					// Start watchers
					// Listen to value updates
					scope.$watch('value.text', function(newValue, oldValue) {
						if(scope.watchersEnabled && newValue !== oldValue) {
							scope.fieldValidation();
							$timeout(valueWatcher, 50);
						}
					});
					
					if (scope.value.entity && scope.value.entity instanceof Array) {
						scope.$watchCollection('value.entity', function(newValue, oldValue) {
							if(!angular.equals(newValue, oldValue)) {
								scope.fieldValidation();
								$timeout(valueWatcher, 50);
							}
						}, true);
					}
					else if(scope.property.type.type === util.constants.FIELD_COMPLEX) {
						scope.$watch('value.entity', function(newValue, oldValue) {
							if(!angular.equals(newValue, oldValue)) {
								scope.fieldValidation();
								$timeout(valueWatcher, 50);
							}
						}, true);
					}

					// Special treatment for checkboxes on search
					if(scope.mode === util.constants.SCOPE_SEARCH && scope.property.type.type == util.constants.FIELD_BOOLEAN) {
						scope.$watch('value.active', valueWatcher);
						scope.$watch('value.inactive', valueWatcher);
					}

					// Special treatment for dates on search
					if(scope.mode === util.constants.SCOPE_SEARCH && scope.property.type.type == util.constants.FIELD_DATE) {
						scope.$watch('value.date.startDate', valueWatcher);
						scope.$watch('value.date.endDate', valueWatcher);
						scope.$watch('value.date.comparator', valueWatcher);
					}

					// Special treatment for numbers on range mode
					// on search
					if(scope.mode === util.constants.SCOPE_SEARCH && scope.property.type.type == util.constants.FIELD_NUMBER && scope.property.searchConf.policy === util.constants.VALIDATOR_RANGE) {
						scope.$watch('value.range.from', valueWatcher);
						scope.$watch('value.range.to', valueWatcher);
						scope.$watch('value.range.comparator', valueWatcher);
					}

					// Special treatment for files
					if(scope.property.type.type == util.constants.FIELD_FILE) {
						scope.$watchCollection('value.files', valueWatcher);
					}

					// Notify linked fields
					$timeout(function() {
						$rootScope.$broadcast('field-updated', { field: scope.property, value: scope.value, init: true });
					}, 50);
				}
			};

			scope.reset = function() {
				// Reset boolean values
				if(scope.property.fieldType.search === util.constants.FIELD_BOOLEAN) {
					if(scope.value.text === '' || scope.value.text === null) {
						scope.value.active = true;
						scope.value.inactive = true;
					}
					else {
						scope.value.active = !!scope.value.text;
						scope.value.inactive = !scope.value.text;
					}
				}

				else if(scope.property.fieldType.search === util.constants.FIELD_DATE) {
					// TODO Configuration
					scope.value.date.comparator = util.constants.DATE_COMPARATOR_EQUALS;
					scope.value.date.startDate = 0;
					scope.value.date.endDate = 0;
				}
				else if(scope.property.searchConf.policy === util.constants.VALIDATOR_RANGE) {
					// TODO Configuration
					scope.value.range.comparator = util.constants.NUMBER_COMPARATOR_BETWEEN;
					scope.value.range.from = '';
					scope.value.range.to = '';
				}

				// Reset only non-complex fields
				else if(scope.property.fieldType[scope.mode] !== util.constants.FIELD_COMPLEX) {
					scope.value.text = scope.property.defaults == null ? '' : scope.property.defaults;
					if(scope.property.multiplicity === util.constants.MULTIPLICITY_MANY) {
						var length = scope.value.entity.length;
						scope.value.entity.splice(0, length);
					}
					else {
						scope.value.entity = {};
					}
				}

				scope.label = "";
			};

			/*
	  		 * Determines whether to disable a field based on their properties
	  		 */
	  		scope.disableField = function(mode, field) {

	  			// Get the editable flag
	  			var editable = field.editable;

				// Get the is id flag
	  			var isId = field.isId;

	  			/* 
	  			 * If we are in search mode and the field is shown, 
	  			 * it will NEVER be disabled
	  			 */
	  			if(mode === util.constants.SCOPE_SEARCH) {
	  				return false;
	  			}

	  			// Lookup for complex configuration
	  			if(scope.property.derived) {
	  				var configuration = scope.parentField.showInUpdate.configuration;
	  				var matchingConfiguration = $filter('filter')(configuration, { key: util.constants.DISABLE_COMPLEX_FIELD, value: scope.property.apiPath }, true);
	  				if(matchingConfiguration.length) {
	  					return true;
	  				}
	  			}

	  			/*
	  			 * In update mode, the disabled fields are:
	  			 * - Non-editable fields
	  			 * - Entity ids (on update mode only)
	  			 */
	  			var isEditable = editable.value !== null;
	  			var isAllowed = null;
	  			if(isEditable) {
	  				isAllowed = permissionManager.isAllowed(editable.value);
	  			}
	  			var bEditable = !isEditable || !isAllowed || (isId && !scope.creating);
	  			return bEditable;
	  		};
	  		
	  		/*
	  		 * Condition to display Remove button of a field
	  		 */
	  		scope.showRemove = function(field) {
	  			return scope.value.text !== null && scope.value.text !== '' && (scope.mode === util.constants.SCOPE_SEARCH || !scope.disableField(scope.mode, scope.property));
	  		};
	  		
	  		/*
	  		 * Determines whether to disable a multi/single select based on their properties
	  		 */
	  		scope.disableSelect = function(field) {
	  			if (typeof(field.singleSelectCustom) === 'object' && field.singleSelectCustom.disableSelect) {
	  				return true;
	  			} else {
	  				return scope.disableField(scope.mode, scope.property);
	  			}
	  		};

	  		// TODO Remove this field when fixing bug #7422
	  		scope.disableSelectInput = function(mode, field) {
	  			var editable = field.editable;

	  			// TODO Move this elsewhere
	  			// 'SELECT' field types are disabled on update mode (avoid user writing stuff)
	  			if(mode === util.constants.SCOPE_UPDATE && field.fieldType.update === util.constants.FIELD_SELECT) {
	  				if (field.disabledSelect) {
	  					return true;
	  				}
	  				if (editable.value === 'true') {
	  					return false;
	  				}
	  				return true;
	  			}
	  			return false;
	  		};
	  		
	  		/*
	  		 * Remove value of a field
	  		 */
	  		scope.removeField = function(field) {
				scope.value.text = null;
				scope.value.list = [];
				scope.value.entity = null;
				scope.value.date.startDate = '';
				scope.value.date.endDate = '';
				scope.value.date.comparator = util.constants.DATE_COMPARATOR_EQUALS;
	  			scope.label = '';
	  			if (typeof(field.singleSelectCustom) === 'object') {
	  				 field.singleSelectCustom.deleteField = false;
	  				 field.singleSelectCustom.updateOtherFields = true;
	  			}
	  		};

	  		scope.validation = {
	  			pattern: function() {

	  				// On search mode we don't need validation
	  				if(scope.mode === util.constants.SCOPE_SEARCH) {
	  					return ".*";
	  				}
                    
	  				// TODO work only for REGEXP annotation
	  				if (scope.property.validation.validators && scope.property.validation.validators.length > 0
	  						&& scope.property.validation.validators[0].type == "REGEXP") {	  						
	  					var regexp = scope.property.validation.validators[0].value;
	  					return regexp;
	  				}

	  				//default return
	  				var regexp = ".*";
	  				return regexp;
	  			},
	  			
	  			forbiddenCharacters: function() {
	  				return ["/","\\"];
	  			},
	  			required: function() {
	  				// On search mode we don't need validation
	  				if(scope.mode === util.constants.SCOPE_SEARCH) {
	  					return false;
	  				}

	  				return scope.property.validation.required;
	  			},

	  			minlength: function() {
	  				// On search mode we don't need validation
	  				if(scope.mode === util.constants.SCOPE_SEARCH) {
	  					return 0;
	  				}

	  				var minLength = scope.property.validation.minLength;

	  				return minLength !== null ? minLength : 0;
	  			},

	  			maxlength: function() {
	  				// On search mode we don't need validation
	  				if(scope.mode === util.constants.SCOPE_SEARCH) {
	  					return 524288;
	  				}

	  				var maxLength = scope.property.validation.maxLength;

	  				return !maxLength ? maxLength : 524288;
	  			},

	  			minvalue: function() {
	  				var minLength = scope.property.validation.minLength;

	  				return minLength !== null ? minLength : Number.MIN_SAFE_INTEGER;
	  			},

	  			maxvalue: function() {
	  				var maxLength = scope.property.validation.maxLength;

	  				return maxLength !== null ? maxLength : Number.MAX_SAFE_INTEGER;
	  			},

	  			valid_required: function() {
	  				// No things required on type search
	  				if(scope.mode === util.constants.SCOPE_SEARCH) return true;

	  				switch(scope.property.type.type) {
	  				case util.constants.FIELD_STRING:
	  					return scope.validation.required() ? scope.value.text && scope.value.text.length > 0 : true;
	  				case util.constants.FIELD_COMPLEX:
	  					var relatedMetadata = util.getMetadata(scope.property.type.complexType);
	  					var idField = util.getEntityId(relatedMetadata, null, true);

	  					// TODO Control multiplicity many
	  					return scope.validation.required() ? scope.value.entity && scope.value.entity[idField] !== undefined : true;
	  					break;
	  				case util.constants.FIELD_FILE:
	  					return scope.validation.required() ? scope.value.files.length > 0 : true;
	  					break;
	  				}
	  				return scope.value.text !== null && scope.value.text !== undefined;
	  			},

	  			valid_pattern: function() {
	  				if(!scope.value.text || scope.property.type.type !== util.constants.FIELD_STRING) {
	  					return true;
	  				}

	  				// TODO Put here to avoid integer validation. To fix on bug #7424
	  				if(!scope.value.text.match) {
	  					return true;
	  				}

	  				var parts = scope.value.text.split("\n");
	  				for(var i = 0; i<parts.length; i++){
	  					 var matches = parts[i].match(scope.validation.pattern());
		  				 if(!matches || !matches.length || matches[0] != parts[i]){
		  					 return false;
		  				 }
	  				}
	  				
	  				return true;
	  			},
	  			
	  			valid_minlength: function() {
	  				// On search mode we don't need validation
	  				if(scope.mode === util.constants.SCOPE_SEARCH) {
	  					return true;
	  				}

	  				var minLength = scope.minLength = scope.property.validation.minLength;
					if (scope.property.type.type === util.constants.FIELD_COMPLEX) {
						return minLength ? scope.value.entity.length >= minLength : true;
					}
	  				return minLength ? scope.value.text.length > minLength : true;
	  			},

	  			valid_maxlength: function() {
	  				// On search mode we don't need validation
	  				if(scope.mode === util.constants.SCOPE_SEARCH) {
	  					return true;
	  				}

	  				var maxLength = scope.property.validation.maxLength;

	  				return maxLength ? scope.value.text.length < maxLength : true;
	  			}
	  		};

	  		
  			scope.templating = {
	  			inputSize: 'col-md-8',
	  			fieldSize: 'col-md-6',
	  			labelStyle: 'col-md-12',
	  			labelWeight: 'font-normal',
	  			labelDecoration: '',
	  			validationStyle: 'col-md-12',
	  			adjusted : false
	  		};
	  		
	  		// TODO Change this!
	  		scope.classFormInput = ([util.constants.FIELD_PICK_LIST, util.constants.FIELD_TABLE].indexOf(scope.property.fieldType[scope.mode]) === -1) ? "form-input-content" : "";
	  		scope.displayMode = ([util.constants.FIELD_PICK_LIST, util.constants.FIELD_TABLE].indexOf(scope.property.fieldType[scope.mode]) === -1) ? "" : "pickListDispBlock padding-cero";

	  		// Adjust templating size
	  		if(scope.mode === util.constants.SCOPE_UPDATE) {
	  			// Selects are rendered as medium
		  		switch(scope.property.fieldType.update) {
		  		case util.constants.FIELD_SELECT:
		  			if(!(!scope.parentField && scope.property.isKey)) {
		  				scope.templating.inputSize = 'col-md-12';
		  				scope.templating.fieldSize = 'col-md-8';
		  				scope.templating.adjusted = true;
		  			}
		  			break;
		  		case util.constants.FIELD_DATE:
		  		case util.constants.FIELD_NUMBER:
		  		case util.constants.FIELD_COMBOBOX:
		  		case util.constants.FIELD_PRICE:
		  			scope.templating.inputSize = 'col-md-6';
		  			scope.templating.fieldSize = 'col-md-4';
		  			scope.templating.adjusted = true;
		  			break;
		  		case util.constants.FIELD_COMPLEX:
		  			scope.templating.inputSize = '';
		  			scope.templating.fieldSize = 'col-md-12 no-padding';
					scope.templating.labelWeight = 'font-bold';
					scope.templating.adjusted = true;
		  			break;
		  		case util.constants.FIELD_PICK_LIST:
		  		case util.constants.FIELD_IMAGE:
		  		case util.constants.FIELD_TABLE:
		  			scope.templating.inputSize = 'col-md-12';
		  			scope.templating.fieldSize = 'col-md-12 no-padding';
					scope.templating.labelWeight = 'font-bold';
					scope.templating.labelDecoration = 'font-underline';
					scope.templating.adjusted = true;
		  			break;
		  		case util.constants.FIELD_FILE:
		  			scope.templating.inputSize = 'col-md-12';
		  			scope.templating.fieldSize = 'col-md-8 no-padding';
					scope.templating.labelWeight = 'font-bold';
					scope.templating.labelDecoration = 'font-underline';
					scope.templating.adjusted = true;
		  			break;
		  		}

		  		if(!scope.templating.adjusted && scope.property.validation.maxLength) {
	  				if(scope.property.validation.maxLength < 14) {
	  					scope.templating.inputSize = 'col-md-6';
		  				scope.templating.fieldSize = 'col-md-4';
		  			}
		  			else if(scope.property.validation.maxLength > 100) {
		  				scope.templating.inputSize = 'col-md-12';
		  				scope.templating.fieldSize = 'col-md-8';
		  			}
		  		}
	  		}

	  		// TODO Improve search configuration
	  		else if(scope.mode === util.constants.SCOPE_SEARCH) {
	  			scope.templating.inputSize = 'col-md-12';
	  			scope.templating.fieldSize = 'col-md-12';
	  			if(scope.property.fieldType.search === util.constants.FIELD_COMPLEX) {
					scope.templating.fieldSize = 'col-md-12 no-padding';
					scope.templating.labelWeight = 'font-bold';
				}
				else if(scope.property.fieldType.search === util.constants.FIELD_DATE ||
					(scope.property.fieldType.search === util.constants.FIELD_NUMBER && scope.property.searchConf.policy === util.constants.VALIDATOR_RANGE)) {
					scope.templating.labelWeight = 'font-bold';
				}
	  		}

	  		if(scope.property.fieldType[scope.mode] !== util.constants.FIELD_COMPLEX) {
	  			// Setup the label style
		      	// By default we append no class, as it's a 'standard' form
		      	switch(scope.rootMetadata[scope.mode + 'Style']) {
		      	case util.constants.FORM_STYLE_HORIZONTAL:
		      		scope.templating.inputSize = 'col-md-12';
		      		scope.templating.labelStyle = 'col-md-4 control-label';
		      		scope.templating.validationStyle = 'col-md-offset-4 col-md-8';
		      		break;
		      	}
	  		}

	  		// Is there any custom style?
	  		if(scope.style) {
	  			// Overwrite styling
	  			for(var item in scope.style) {
	  				scope.templating[item] = scope.style[item];
	  			}
	  		}

			valueWatcher = function() {
				fieldConfig.init = false;

				initactive = scope.value.active;
				initinactive = scope.value.inactive;

				// Control nulls
				if(scope.value.text === 'null') {
					scope.value.text = null;
				}

				// Set the real value in the entity
				// See if we need NOT to copy the value
				// If the field is a file, NEVER copy
				var forceNotCopy = false;
				if([util.constants.FIELD_FILE, util.constants.FIELD_TABLE].indexOf(scope.property.type.type) !== -1) {
					forceNotCopy = true;
				}
				var configuration = $filter('filter')(scope.metadata.configuration, { key: 'DONT_CREATE_COPY', value: scope.property.name }, true);
				var sendValue = null;
				if(forceNotCopy || configuration.length) {
					sendValue = scope.value;
				}
				else {
					sendValue = angular.copy(scope.value);
				}

				var result = scope.updateEntity(scope.property, sendValue, scope.entity, scope.parentField, scope.rootEntity);

				// Lookup for cascade filters
				if(scope.property.derived) {
					var configuration = [];
					var path = scope.property.derivedPath;
					var source = scope.parentField;

					switch(scope.mode) {
					case util.constants.SCOPE_SEARCH:
						configuration = source.searchable.configuration;
						break;
					case util.constants.SCOPE_UPDATE:
						configuration = source.showInUpdate.configuration;
						break;
					}

					var listenerName = scope.parentField.owner + '_' + scope.parentField.name;

					var cascadeConfiguration = $filter('filter')(configuration, { key: util.constants.CASCADE_UPDATE });
					if(cascadeConfiguration.length) {
						// Reset all fields from upper levels
						scope.$emit('reset_cascade_' + listenerName, { source: scope.property, configuration: cascadeConfiguration, query: scope.value.text });
					}

					var propagateConfiguration = $filter('filter')(configuration, { key: util.constants.PROPAGATE_UPDATE });
					if(propagateConfiguration.length) {
						// Notify changes to the parent field
						scope.$emit('complex_update_' + listenerName, { source: scope.property, configuration: propagateConfiguration });
					}
				}

				if(sendValue.isExtended == true) {
					scope.value.extended = sendValue.extended;
				}
				scope.value.isExtended = (sendValue.isExtended == true);
				
				// Notify the changes (verify if there's someone listening too)
				if(result && scope.changeEntity) {
					// Submit the changes to the parent controller
					var sendResult = angular.copy(result);
					scope.changeEntity(scope.property, sendResult, scope.entity);
				}

				// Search for linked fields
				$rootScope.$broadcast('field-updated', { field: scope.property, value: scope.value });
			};

			// Listen for property changes
			// On update mode we listen with the path. On search mode with the field name 
			var listenerName = scope.property.owner + '_' + scope.property.name;

			// Manual changes on the value
			scope.$on('manually_change_' + listenerName, function(events, args) {
				// TODO Any verification?

				valueWatcher();
			});
			
			scope.$on('update_' + listenerName, function(events, args) {
				if(args && args.self && !scope.property.isSelf) {
					return;
				}

				if(scope.property.fieldType[scope.mode] === util.constants.FIELD_COMPLEX) {
					var innerFields = scope.value.fields;

					var innerEntity = scope.entity[scope.property.name];

					// Disable cascade filters
					scope.$broadcast('setup-cascade', { enabled: false });
					scope.$broadcast('setup-propagation', { enabled: false });
					scope.$broadcast('setup-watchers', { enabled: false });

					for(var i = 0; i < innerFields.length; i++) {
						var innerField = innerFields[i];

						var innerListenerName = 'update_' + innerField.owner + '_' + innerField.name;
						scope.$broadcast(innerListenerName, { newEntity: innerEntity });
					}

					// Re-enable cascade filters
					scope.$broadcast('setup-cascade', { enabled: true, delay: 500 });
					scope.$broadcast('setup-propagation', { enabled: true, delay: 500 });
					scope.$broadcast('setup-watchers', { enabled: true, delay: 500 });
				}
				else {
					if(scope.parentField && args.newEntity) {
						scope.entity = args.newEntity;
					}

					scope.update();
				}
			});

			if(scope.property.fieldType[scope.mode] === util.constants.FIELD_COMPLEX && !scope.property.isSelf) {
				scope.$on('complex_update_' + listenerName, function(events, args) {
					if(!scope.propagateEnabled) {
						return;
					}

					// Get the source
					var source = args.source;

					// Get the configuration
					var configuration = args.configuration;

					// Get the query for the cascade fields
					var query = args.query;

					// Read all configurations	
					for(var i = 0; i < configuration.length; i++) {
						var currentConf = configuration[i].value;
						// Is any cascade applicable?
						var apiPath = source.isSelf ? util.constants.SELF_FIELD : source.apiPath;

						var index = currentConf.indexOf(apiPath + '->');
						if(index !== -1) {
							var parsedConf = currentConf.split('->');
							var engaged = false;
							for(var f = 0; f < parsedConf.length; f++) {
								if(parsedConf[f] === apiPath) {
									engaged = true;
									// Disable cascade filters
									scope.$broadcast('setup-cascade', { enabled: false });
									scope.$broadcast('setup-watchers', { enabled: false });
									continue;
								}

								if(engaged) {
									var conf = parsedConf[f];
									var self = false;
									// Get the field to cascade
									if(conf === util.constants.SELF_FIELD) {
										conf = scope.property.name;
										self = true;
									}
									var cascadeField = $filter('filter')(scope.value.fields, { apiPath: conf }, true)[0];
									
									// Setup the value
									var eventName = 'update_' + cascadeField.owner + '_' + cascadeField.name;
									scope.$broadcast(eventName, { source: source, self: self, newEntity: scope.entity[scope.property.name] });
								}
							}

							if(engaged) {
								// Re-enable cascade filters
								scope.$broadcast('setup-cascade', { enabled: true, delay: 500 });
								scope.$broadcast('setup-watchers', { enabled: true, delay: 500 });
							}
						}
					}
				});
			}

			scope.$on('cascade_update_' + listenerName, function(events, args) {

				if(args.self && !scope.property.isSelf) {
					return;
				}

				// Get the source
				var source = args.source;

				// Get the query
				var query = args.query;

				scope.reset();

				// Configure the query
				if(!scope.property.type.query) {
					scope.property.type.query = {};
				}
				else if(scope.property.type.query instanceof Array) {
					var newQuery = {};
					for(var param in scope.property.type.query) {
						newQuery[param] = scope.property.type.query[param];
					}

					scope.property.type.query = newQuery;
				}


				scope.property.type.query[source.apiName] = query;
			});

			scope.$on('setup-cascade', function(event, args) {
				if(!args.delay) {
					setupCascade(args.enabled);
				} 
				else {
					$timeout(function() {
						setupCascade(args.enabled);
					}, args.delay);
				}
			});

			scope.$on('setup-propagation', function(event, args) {
				if(!args.delay) {
					setupPropagation(args.enabled);
				} 
				else {
					$timeout(function() {
						setupPropagation(args.enabled);
					}, args.delay);
				}
			});

			scope.$on('setup-watchers', function(event, args) {
				if(!args.delay) {
					setupWatchers(args.enabled);
				} 
				else {
					$timeout(function() {
						setupWatchers(args.enabled);
					}, args.delay);
				}
			});

			function setupCascade(enabled) {
				scope.cascadeEnabled = enabled;
			}

			function setupPropagation(enabled) {
				scope.propagateEnabled = enabled;
			}

			function setupWatchers(enabled) {
				scope.watchersEnabled = enabled;
			}

			scope.$on('reset_cascade_' + listenerName, function(events, args) {
				if(!scope.cascadeEnabled) {
					return;
				}

				// Get the source
				var source = args.source;

				// Get the configuration
				var configuration = args.configuration;

				// Get the query for the cascade fields
				var query = args.query;

				// Read all configurations	
				for(var i = 0; i < configuration.length; i++) {
					var currentConf = configuration[i].value;
					// Is any cascade applicable?
					var index = currentConf.indexOf(source.apiPath + '->');
					if(index !== -1) {
						var parsedConf = currentConf.split('->');
						var engaged = false;
						for(var f = 0; f < parsedConf.length; f++) {
							if(parsedConf[f] === source.apiPath) {
								engaged = true;
								scope.$broadcast('setup-propagation', { enabled: false });
								scope.$broadcast('setup-watchers', { enabled: false });
								continue;
							}

							if(engaged) {
								var conf = parsedConf[f];
								var self = false;
								// Get the field to cascade
								if(conf === util.constants.SELF_FIELD) {
									conf = scope.property.name;
									self = true;
								}
								var cascadeField = $filter('filter')(scope.value.fields, { apiPath: conf }, true)[0];
								
								// Delete current value
								var eventName = 'cascade_update_' + cascadeField.owner + '_' + cascadeField.name;
								scope.$broadcast(eventName, { source: source, query: query, self: self, reset: args.reset });
							}
						}

						if(engaged) {
							// Re-enable cascade filters
							scope.$broadcast('setup-propagation', { enabled: true, delay: 500 });
							scope.$broadcast('setup-watchers', { enabled: true, delay: 500 });
						}
					}
				}
			});

			// Listen for local reset requests
			scope.$on('reset_' + listenerName, function(event, args) {
				scope.reset();
			});
	  		
			// Listen for reset requests
			scope.$on('reset-form', function(event, args) {
				scope.reset();
			});

			// Listen to locale changes
			scope.$on('locale-change', function(data) {

		  		// Change the locale in the tabs
		  		scope.extra.label = $filter('translate')(scope.extra.labelPlaceholder);
		  	});

		  	scope.$on('field-updated', function(evt, data) {
		  		// Am I linked?
		  		// IF yes, verify if i'm linked with the field being updated
		  		if(!scope.property.linked || scope.property.linked.to.indexOf(data.field.name) === -1) {
		  			return;
		  		}

		  		var action = scope.property.linked.via;
		  		scope.dispatchFieldAction(action, { source: data.field, value: data.value, init: !!data.init });
		  	});

			/*
			 * If the input is in 'search' mode, all list inputs will be multi-selectable.
			 * On 'update' mode, the list inputs only receive one value.
			 */
			var multiField = null;
			var fieldToMatch = null;
			if(scope.parentField) {
				fieldToMatch = scope.parentField;
			}
			else {
				fieldToMatch = scope.property;
			}

			if(scope.mode === util.constants.SCOPE_SEARCH) {
				multiField = fieldToMatch.searchConf.multiplicity;
			}
			else {
				multiField = fieldToMatch.multiplicity;
			}

			var multi = multiField === util.constants.MULTIPLICITY_MANY;
			scope.multiple = multi;
			
			var selectTemplate 		= multi ? '/konga/views/multi-select.html' : '/konga/views/single-select.html';
			var selectController 	= multi ? 'MultiSelectController' : 'SingleSelectController';
			
			if (typeof(scope.property.singleSelectCustom) === 'object' && scope.property.singleSelectCustom.selectTemplate !== '' && scope.property.singleSelectCustom.selectController !== '') {
				selectTemplate = scope.property.singleSelectCustom.selectTemplate;
				selectController = scope.property.singleSelectCustom.selectController;
			}

			scope.modal = {
				temp: {}
			};

			scope.openMultiSelect = function () {
				var myScope = scope;
			    var modalInstance = $modal.open({
			      templateUrl: selectTemplate,
			      controller: selectController,
			      size: 'lg',
			      resolve: {
			        items: function() {
			        	return common.read('raw-input>' + myScope.property.name + ' ' +myScope.property.owner);
			        },
			        model: function() {
			        	return angular.copy(myScope.value);
			        },
			        field: function() {
			        	return angular.copy(myScope.property);
			        },
			        parentField: function() {
			        	return angular.copy(myScope.parentField);
			        },
			        entity: function() {
			        	return angular.copy(myScope.entity);
			        },
			        metadata: function() {
			        	return angular.copy(myScope.metadata);
			        }
			      }
			    });
	
			    modalInstance.result.then(function (newValue) {
			    	myScope.value.text = newValue.text ? newValue.text.join(',') : '';
			    		myScope.value.ids = newValue.ids;
			    		myScope.value.entity = newValue.entity;
			    		
			    		// Get the label
			    		myScope.setLabel(newValue.metadata, myScope.value.entity);
			    		
			    		//Set update field
			    		if (typeof(myScope.property.singleSelectCustom) === 'object') {
			    			if (newValue.ids.length == 0){
			    	  			scope.value = {
			    	  		      		text: null,
			    	  		      		list: [],
			    	  		      		entity: null,
			    	  		      		date: {
			    	  		      			startDate: '',
			    	  		      			endDate: '',
			    	  		      			comparator: util.constants.DATE_COMPARATOR_EQUALS
			    	  		      		}
			    	  			};
			    	  			scope.label = '';
			    	  			myScope.property.singleSelectCustom.deleteField = false;
			    	  		}
			    			myScope.property.singleSelectCustom.updateOtherFields = true;
			    			
			    		}
			    	 			    	
			    }, function () {
			      console.log('Operation canceled');
			    });
			  };

			  scope.dispatchFieldAction = function(name, params) {
			  	// Get the defaults override
		  		var overrideDefaults = scope.property.overrideDefaults;
		  		var matchingActions = null;
		  		if(overrideDefaults.length) {
		  			matchingActions = $filter('filter')(overrideDefaults, { overrides: name });
		  		}
		  		var actions = scope.property.actions;
		  		if ((!matchingActions || (matchingActions && !matchingActions.length)) && actions.length) {
		  			matchingActions = $filter('filter')(actions, { name: name });
		  		}

		  		// Custom actions
	  			var actionParams =  {
	  					id: util.getEntityId(scope.metadata, scope.entity), 
	  					entityType: scope.metadata.name, 
	  					self: scope, 
	  					item: scope.entity, 
	  					field: scope.property, 
	  					data: params
	  			};
		  		if(matchingActions && matchingActions.length) {
		  			$rootScope.operations.dispatchActionBatch(matchingActions, actionParams);
		  		}
		  		else {
			  		// Default actions
				  	switch(name){
				  	case 'add':
				  	case 'open-select':
				  			scope.openMultiSelect();
				  		break;
				  	// case 'open-link':
				  	// 	// TODO
				  		// break;
				  	default:
				  		$rootScope.operations.dispatchAction({ name: name }, actionParams);
				  	}
				}
			  };


			  scope.setLabel = function(metadata, entity) {
			  	if(false) {

			  	}
			  	else {
			  		var name = metadata.name.charAt(0).toLowerCase() + metadata.name.substr(1);
			  		scope.isExtended = $filter('extended')(scope.metadata.fields,name);
			  		scope.label = util.getEntityLabel(metadata, entity);
			  	}
			  };

			  scope.getOptionsList = function() {
				switch (scope.property.name) {
					case util.constants.COMBO_NATURE_TIERS :
						return [{code:'Fournisseur',label:'Fournisseur'}, {code:'Client',label:'Client'}];
				}
			  };

			var watchers = null;
			scope.$on('suspend', function() {
			  watchers = scope.$$watchers;
			  scope.$$watchers = [];
			});
			
			

			scope.$on('resume', function() {
			  scope.$$watchers = watchers;
			});
			
			scope.$on('force-validation', function() {
				scope.fieldValidation();
			});

			scope.hideGlobalValidation = function() {
				scope.globalValidation = false;
			};

	      	/*
	      	 * End old controller
	      	 */


			var fieldType = scope.property.fieldType[scope.mode];

			/*
			 *  Map some variables
			 */

			// Booleans on search mode are shown as checkboxes
			if(scope.mode === util.constants.SCOPE_SEARCH && fieldType == util.constants.FIELD_BOOLEAN) {
				fieldType = util.constants.FIELD_CHECKBOX; // Change radio to checkbox on search

				var queryValue = scope.entity[scope.property.name];

				scope.value.text = queryValue;
				// scope.value.active = queryValue !== undefined ? queryValue : true;
				// scope.value.inactive = queryValue !== undefined ? !queryValue : false;
			}

			// Dates on search mode are displayed as two dates and a comparator (i.e. date-search)
			if(scope.mode === util.constants.SCOPE_SEARCH && fieldType === util.constants.FIELD_DATE) {
				fieldType = util.constants.FIELD_DATESEARCH;
			}

			// Text fields with 'maxLength' above 255 are rendered as text areas
			if(fieldType == util.constants.FIELD_PLAIN && scope.property.validation.maxLength > 255) {
				fieldType = util.constants.FIELD_TEXTAREA;
			}

			// Non complex fields with inner fields selected are rendered as complex
			if(scope.value.fields.length) {
				fieldType = util.constants.FIELD_COMPLEX;
			}

			// Depending on the type of the field display one or other
			var inputSuffix = '';
			if(scope.mode === util.constants.SCOPE_SEARCH) {
				// Is it exact match?
				var validatorType = scope.property.searchConf.policy
				if(validatorType === util.constants.VALIDATOR_RANGE) {
					inputSuffix = '-' + validatorType.toLowerCase();
				}
			}

			var fieldTemplate = null;
			if(fieldType === util.constants.FIELD_TYPE_CUSTOM) {
				var configuration = null;
				switch(scope.mode) {
				case util.constants.SCOPE_SEARCH:
					configuration = scope.property.searchable.configuration;
					break;
				case util.constants.SCOPE_UPDATE:
					configuration = scope.property.showInUpdate.configuration;
					break;
				}

				var confParams = $filter('filter')(configuration, { key: util.constants.CUSTOM_FIELD_TYPE });
				if(!confParams || !confParams.length) {
					// TODO Throw exception
				}

				var conf = confParams[0].value;

				// Try to map
				fieldTemplate = mapper[conf];
				// If no mapping try direct
				if(!fieldType) {
					fieldTemplate = conf;
					if(!fieldTemplate) {
						// TODO Throw exception
					}
				}
			}
			else 
				fieldTemplate = '/konga/views/raw-' + fieldType.toLowerCase() + inputSuffix + '-input.html'

			scope.contentUrl = fieldTemplate;

			scope.datePicker = { opened: false };
			scope.toggleDatePicker = function(){
				scope.datePicker.opened = (scope.datePicker.opened)? false:true;
			};

			scope.fieldValidation = function() {
				//Date verification
				
				if(scope.mode === util.constants.SCOPE_UPDATE && (scope.property.type.type === util.constants.FIELD_DATE || scope.property.type.type === util.constants.FIELD_DATETIME)) {
					if(scope.property.validation.validators && scope.property.validation.validators.length > 0){
												
						var hasError = false;
						var classErrorName;
						for(var i = 0; i < scope.property.validation.validators.length; i++) {
							var typeValidator = scope.property.validation.validators[i].type; 
							
							switch (typeValidator) {
							case 'DATE_GE':
							case 'DATE_GT':
							case 'DATE_LE':
							case 'DATE_LT':
								var dateToCompare = scope.entity[scope.property.validation.validators[i].value];
								if (typeof(dateToCompare) == "string") {
									dateToCompare = new Date(dateToCompare).getTime();
								}
								var value = scope.value.text;
								classErrorName = "invalid-date";

								if (dateToCompare == undefined || dateToCompare == 0) {
									break;
								}
								if (value != undefined) {
									var dateRef = value;									
									if (scope.property.type.type === util.constants.FIELD_DATE && value.length > 0) {
										var dateRef = new Date(value).getTime();
									} 
									
									if (typeValidator == "DATE_GE" && dateRef - dateToCompare < 0) {
										
										hasError = true;
									}
									if (typeValidator == "DATE_GT" && dateRef - dateToCompare <= 0) {
										hasError = true;
									}
									if (typeValidator == "DATE_LE" && dateRef - dateToCompare > 0) {
										hasError = true;
									}
									if (typeValidator == "DATE_LT" && dateRef - dateToCompare >= 0) {
										hasError = true;
									}
								}							
								break;
							}
						}
						var realInput = element.find('input');
						
						if (hasError) {
							realInput.addClass(classErrorName);
							scope.$emit('form-invalid', {
								field: scope.property.name,
								owner: scope.property.owner,
								validation: typeValidator,
								valid: false
							});
						}
						else {
							// remove error on the invalid dates if any
							realInput.removeClass(classErrorName);
							scope.$emit('form-invalid', {
								field: scope.property.name,
								owner: scope.property.owner,
								validation: typeValidator,
								valid: true
							});
							//scope.$emit('form-reset-invalid-date');
							
						}
					}
				}
				
				// TODO Improve this validation mode
				if(scope.mode === util.constants.SCOPE_UPDATE && scope.property.type.type === util.constants.FIELD_STRING) {
					var validation = scope.property.validation;

					var value = scope.value.text;

					// Length verification
					var length = value ? value.length : 0;

					var realInput = element.find('input');

					if(validation.maxLength && length > validation.maxLength) {
						realInput.addClass('invalid-max-length');
						scope.$emit('form-invalid', {
							field: scope.property.name,
							owner: scope.property.owner,
							validation: 'max-length',
							valid: false
						});
					}
					else {
						realInput.removeClass('invalid-max-length');
						scope.$emit('form-invalid', {
							field: scope.property.name,
							owner: scope.property.owner,
							validation: 'max-length',
							valid: true
						});
					}
					
					if(validation.minLength && length < validation.minLength) {
						realInput.addClass('invalid-min-length');
						scope.$emit('form-invalid', {
							field: scope.property.name,
							owner: scope.property.owner,
							validation: 'min-length',
							valid: false
						});
					}
					else {
						realInput.removeClass('invalid-min-length');
						scope.$emit('form-invalid', {
							field: scope.property.name,
							owner: scope.property.owner,
							validation: 'min-length',
							valid: true
						});
					}
				}
				if(scope.property.fieldType.update == util.constants.FIELD_PICK_LIST) {
					var validation = scope.property.validation;

					var length = scope.entity.situations ? scope.entity.situations.length : 0;
					
					var realInput = element.find('input');
					
					if(validation.minLength && length < validation.minLength) {
//						realInput.addClass('invalid-min-length');
						scope.$emit('form-invalid', {
							field: scope.property.name,
							owner: scope.property.owner,
							validation: 'min-length',
							valid: false
						});
					}
					else {
//						realInput.removeClass('invalid-min-length');
						scope.$emit('form-invalid', {
							field: scope.property.name,
							owner: scope.property.owner,
							validation: 'min-length',
							valid: true
						});
					}
				}
			};
	          
			scope.aucun = null;

			scope.update(true);

			// Setup a unique id for the form element
			scope.fieldId = 'raw-input-' + scope.property.name + '-' + scope.property.owner;
		},
	    templateUrl: '/konga/views/raw-input.html'
	};
}]);
