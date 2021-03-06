'use strict';

/**
 * @ngdoc controller
 * @name konga.controller:EntityUpdateController
 * @description
 * # EntityUpdateController

 * Responsible for handling updating - and creating - operations with entities, for Konga {@link Standards.Forms `standards`}. Same as happens with search, this controller it's normally initialised once user requests an {@link Standards.Operations#methods_openEntityUpdate `openEntityUpdate()`} - for updating an existing entity, or {@link Standards.Operations#methods_openEntityCreate `openEntityCreate()`} to create a new one.
 *
 * <img src="/static/konga-entity-update-basic-flow.png" width="40%" class="center">
 *
 * The `EntityUpdateController`'s responsibility is just for operation management, whilst the graphical - rendering, validating... - responsibility lays on the {@link konga.directive:updateForm `updateForm`} directive. 
 *
 *
 * # Updation/Creation flow
 *
 * Once the `EntityUpdateController` engages, it passes through several flows depending on the configuration, and on the user interaction with the available actions. Here you have an excerpt of the flows `EntityUpdateController` moves through:
 *
 * <img src="/static/konga-update-flow.png" width="50%" class="center">
 *
 * ## Rendering
 *
 * On **rendering** phase, the `EntityUpdateController` reads the `metadata` and determines whether the user can perform the operation rquested. After that, using the input the controller asks the {@link konga.api `api`} to return the existing entity (for updating) or the {@link konga.scaffold `scaffold`} service to craft a new one. This, along with entity deletion - which in `creation` mode it will never be enabled - is the only feature who makes updation and creation differ. 
 *
 * Once the permissions are dealt with, the entity got, and the mode resolved, the `EntityUpdateController` leaves the rendering responsibility to the {@link konga.directive:updateForm `updateForm`}, who continues the process.
 *
 * ## Input
 *
 * Every time a field's value changes, a process is launched. This process will handle validation, data mapping - to store the field's value within the entity, and any propagation or linking defined on the {@link Metadata.Field field's metadata}. On the {@link konga.directive:rawInput `rawInput`} documentation there's the full guide on how changes are tracked and the validation and mapping processes work.
 *
 * ## Submit
 *
 * On submit, the {@link Customisation.Action_Driven#properties_save `save`} action is launched. This action basically sends the entity to your API, letting you know the result via a `toastr`. If the operation went right, the view will close, coming back to where you were before.
 *
 * @param {$scope} $scope
 * `EntityUpdateController`'s `$scope`. It contains all basic attributes and features for searching, and it provides information to the underlying directives. 

 * @param {Object} api 
 <span class="label type-hint type-hint-object">{@link konga.api `api`}</span>
 Service for performing the API calls for retrieving the results. By default any entity consumes the {@link konga.standardApi `standardApi`}. However, controllers rely on the {@link konga.api `api`} service, as it allows you to easily define a different API handler for each entity. See the {@link konga.api `api`} documentation for more details.

 * @param {$routeParams} $routeParams 
 The `EntityUpdateController` uses the `$routeParams` to retrieve information about the entities. As you have seen on the {@link Standards.Apps Apps} definition, there are two default `$routes` engaged into any Konga app. That `$routes` contain information about the `:entityName` (the entity metadata's name), used to retrieve the metadata using the {@link Standards.Tools `util`} stystem. 

 * @param {Object} common 
 <span class="label type-hint type-hint-object">{@link konga.common `common`}</span>
 The storage is used internally to handle data-saving operations, mainly for tab management - you go out of this tab, come back, and everything is as you left it.

 * @param {$rootScope} $rootScope 
 Injected to access global {@link Standards.Operations `operations`}.

 * @param {$filter} $filter
 Used for filtering data - e.g. {@link konga.filter:mapField `field mapping`} and other Angular native filtering.

 * @param {Object} fieldMapper
 <span class="label type-hint type-hint-object">{@link konga.fieldMapper `fieldMapper`}</span>
 Used to map input's value into the entity.

 * @param {Object} scaffold
 <span class="label type-hint type-hint-object">{@link konga.scaffold `scaffold`}</span>
 Used for {@link konga.scaffold `scaffolding`} new queries. 

 * @param {$timeout} $timeout
 Some inner methods and operations are executed delayed.

 * @param {Object} permissionManager
 <span class="label type-hint type-hint-object">{@link konga.permissionManager `permissionManager`}</span>
 Used to determine user permissions on the operations susceptible to be executed on the `search` and `results` functionalities.

 * @param {Object} util
 <span class="label type-hint type-hint-object">{@link Standards.Tools `util`}</span>
 Used to handle metadata easier via the {@link Standards.Tools `util`} provided tools. 

 */
angular.module('konga')
.controller('EntityUpdateController', ['$scope', 'api', '$routeParams', 'common', '$rootScope', '$filter', 'fieldMapper', 'scaffold', '$timeout', 'permissionManager', 'util', 
  	function ($scope, api, $routeParams, common, $rootScope, $filter, fieldMapper, scaffold, $timeout, permissionManager, util) {

		//TODO Proper refactor
		function updateChanges() {
			// See if there are changes
			var hasChanges = false;
			if ($scope.changes.length > 0) {
				// Emit the changes notification
				hasChanges = true;
			}

			$scope.$emit('changes', { pageId: pageData.pageId, hasChanges: hasChanges });
		}


	  	// Get the local params
		var entityType = $routeParams.entityType;
		var entityId	= $routeParams.entityId;

		$scope.alreadyValidated = false;

		// Get the search element
		// TODO Conditionalify (¿?¿?¿?¿?)
		var metadata = $scope.entityMetadata = common.getMetadata(entityType);

		var localEndpoint = api.getLocalEndpoint(metadata.name);

		// Initialize the entity
		$scope.entity = {};
		$scope.params = {};

		// Setup the form style
      	// By default we append no class, as it's a 'standard' form
      	$scope.formStyle = '';

      	switch($scope.metadata.updateStyle) {
      	case util.constants.FORM_STYLE_HORIZONTAL:
      		$scope.formStyle = 'form-horizontal';
      		break;
      	}
		
	    // See if the entity is eresable
	    $scope.deletable = $scope.entityMetadata.deleteable != null && (entityId !== util.constants.NEW_ENTITY_ID);
	    $scope.disabledDelete = false;
	    
		var allFields = util.getEntityFields($scope.entityMetadata);
		$scope.fields = $filter('filter')(allFields, { editable: true });

		// Get product codes
		//var productCodes = $scope.productCodes = common.read('product-codes');

		// Get configuration for showing buttons
		$scope.showActions = true;
		var configuration = $scope.entityMetadata.configuration;
		var buttonConfiguration = $filter('filter')(configuration, { key: util.constants.UPDATE_HIDE_BUTTONS }, true)[0];
		if(buttonConfiguration && buttonConfiguration.value === 'true') {
			$scope.showActions = false;
		}

		var pageData = $scope.pageData = $rootScope.pageData;
		
		var validationData = null;

		$scope.invalid = false;
		$scope.customDisableValider = false;

		if(pageData.init) {
			$scope.entity = pageData.entity;
			$scope.changes = pageData.changes;
			validationData = pageData.validationData;
			if($rootScope.pageData.creating){
				$scope.creating = $rootScope.pageData.creating;
			}
			
			updateChanges();
		} 
		else {

			validationData = pageData.validationData = {};

			// Verify if we are creating or updating
			if (entityId != util.constants.NEW_ENTITY_ID) {

			  // Request a loader
			  $rootScope.operations.requestLoading('update_' + entityId);

			  // Get the path for the call
			  var path = metadata.apiPath;

			  // Try and get from storage
			  var entity = common.read(entityId);
			  if(entity) {
			  	$scope.entity = pageData.entity = entity;
			  	entityId = util.getEntityId(metadata, entity);
			  }
			  else {
				  // Get the current entity
				  $scope.entity = pageData.entity = localEndpoint.get({path: path, id: entityId}, function(data) {
				    pageData.original = angular.copy($scope.entity);
				    $rootScope.operations.freeLoading('update_' + entityId);
				  });
			  }

			} else {
			  $scope.creating = true;
			  $rootScope.pageData.creating = $scope.creating;

			  var newEntity = scaffold.newEntity($scope.entityMetadata, localEndpoint);
			  
			  $scope.entity = pageData.entity = newEntity;
			  pageData.original = angular.copy($scope.entity);

			  // Delete the new entity from common
			  // FIXME Find a place to do this
			  // common.deleteKey('new-entity'); 
			}

			$scope.changes = pageData.changes = [];
			pageData.init = true;
		}

		function waitEntityResolve(escaped, path, extraPath) {
	        var resolveWatcher = $scope.$watch('entity.' + path + extraPath + '.$resolved', function() {
	            if(escaped.$resolved) {
	              
	              /*
	               * Let's propagate!!
	               */

	              // Get all fields
	              var fields = util.getEntityFields($scope.entityMetadata);

	              // Move along the fields
	              for(var i = 0; i < fields.length; i++) {
	                // Get the field
	                var field = fields[i];

	                // Get the path
	                var fieldPath = field.fieldPath;

	                /*
	                 * With the path of the updated field, we could know if a field is related
	                 * by comparing index of.
	                 * e.g. path = 'parentAgence' & fieldPath = 'parentAgence.parentSociete.codeEds' => RELATED
	                 */
	                var fieldRelated = fieldPath.indexOf(path) === 0;

	                // Is it related?
	                if (fieldRelated) {
	                  var message = {
	                    value: $filter('mapField')($scope.entity, fieldPath)
	                  };
	                  $scope.$broadcast('update_' + fieldPath, message);
	                }
	              }

	              resolveWatcher();
	            }
	        });
		}

		
		function hasPermission(permission) {
			var isAllowed = false;
			// Verify permissions
  			if(permissionManager.isAllowed(permission)) {
  				  isAllowed = true;
  			}
  			
  			if(!isAllowed) {
  				$rootScope.operations.dispatchAction({ name: 'action-forbidden'}, {});
  			}
  			return isAllowed;
		}
		
		
		/*
		* TODO Document
		*/
		$scope.operations = {
			

			dispatchEntityAction: function(name) {

				// Disable the validate button
				$scope.alreadyValidated = true;

				// Re-enable the validate button (delayed)
				$timeout(function() {
					$scope.alreadyValidated = false;
				}, 3000);

				// Get the defaults override
		  		var overrideDefaults = $scope.entityMetadata.overrideDefaults;
		  		var matchingActions = null;
		  		if(overrideDefaults.length) {
		  			matchingActions = $filter('filter')(overrideDefaults, { overrides: name });
		  		}
				
		  		var actionParams =  {
	  					id: entityId, 
	  					entityType: entityType, 
	  					self: $scope, 
	  					item: $scope.entity,
	  					data: $scope.params
	  			};
		  		
				switch(name){
			  	case 'save':
			  		var permission = $scope.entityMetadata.editable;
					// Verify permissions
					if (hasPermission(permission)) {
			  		
				  	    // Custom action
				  		if(matchingActions && matchingActions.length) {
				  			$rootScope.operations.dispatchActionBatch(matchingActions, actionParams);
				  		} else {
				  		// Default action
				  			$scope.operations.saveEntity();
				  		}
				  		
				  		//Set refreshSearch = true, when we comeback to search screen, it will run the search again
						var refreshSearchKey = util.constants.REFRESH_SEARCH_KEY + entityType;
						common.store(refreshSearchKey,true);
				  		
					} 
			  		
			  		break;
			  	case 'delete':
			  		//TODO
			  		break;
				}
			},	
				
			/*
			 * TODO Document
			 */
			saveEntity: function(handlerOK, handlerKO) {
				var actionParams =  {
  					id: entityId, 
  					entityType: entityType, 
  					self: $scope, 
  					item: $scope.entity,
  					params: $scope.params
				};

                //// Verify commit triggers
			    //verifyTriggers(util.constants.TRIGGER_MOMENT_COMMIT, $scope.entityMetadata, $scope.entity);

				var entity = $scope.entity;

				function handlerDefaultOK(data) {
					actionParams.data = data;
					$rootScope.operations.dispatchAction({name: 'save-ok'}, actionParams);
				}
				function handlerDefaultKO(error) {
					actionParams.error = error;
					$rootScope.operations.dispatchAction({name: 'save-ko'}, actionParams);
				}

				$rootScope.operations.requestLoading('save-entity');

				if (!handlerOK) {
					handlerOK = handlerDefaultOK;
				}
				if (!handlerKO) {
					handlerKO = handlerDefaultKO;
				}

				$scope.params.path = metadata.apiPath;

				var realHandlerOK = function(data) {
					$rootScope.operations.freeLoading('save-entity');
					handlerOK(data);
				};

				var realHandlerKO = function(error) {
					$rootScope.operations.freeLoading('save-entity');
					handlerKO(error);
				};
				
				 // Verify if the entity is new
				if(entityId === util.constants.NEW_ENTITY_ID) {
				    entity.$create($scope.params, realHandlerOK, realHandlerKO);
				  } else {
					entity.$save($scope.params, realHandlerOK, realHandlerKO);
				  }

			},

			cancelUpdate: function() {
				
			  // Remove all page parameters
			  pageData.init = false;

			  // Close the page
			  $rootScope.operations.closeTabById(pageData.pageId);
			},

			deleteEntity: function() {		
				
				var actionParams =  {
	  					id: entityId, 
	  					entityType: entityType, 
	  					self: $scope, 
	  					item: $scope.entity,
	  					params: $scope.params
			    };
				
				function okDeleteEntity() {
					var path = $scope.entityMetadata.apiPath;
					localEndpoint.delete({ path: path, id: util.getEntityId($scope.entityMetadata, entity)}, 
							function success() {
								$rootScope.operations.addAlert(util.constants.ALERT_TYPE_SUCCESS, 'message.action-confirmation.delete.success'); 
								// Remove all page parameters
								pageData.init = false;
								$scope.$emit('changes', { pageId: pageData.pageId, hasChanges: false });
								// Close the page
								$rootScope.operations.closeTabById(pageData.pageId);
							}, 
							function error(error) {							
								
								actionParams.error = error;
								$rootScope.operations.dispatchAction({name: 'delete-ko'}, actionParams);
								
							});
				}			
				
				function koDeleteEntity() {					
				}
		      
				// Verify permissions
				var permission = $scope.entityMetadata.deleteable;
	  			if(permissionManager.isAllowed(permission)) {
					var entity = $scope.entity;
	
	 			    // Verify if the entity is not new
				    if (entityId !== util.constants.NEW_ENTITY_ID) {
					  $rootScope.operations.confirm('message.delete-entity.title', 'message.delete-entity.message', okDeleteEntity, koDeleteEntity);
				    }	
				    
				    //Set refreshSearch = true, when we comeback to search screen, it will run the search again
					  var refreshSearchKey = util.constants.REFRESH_SEARCH_KEY + entityType;
					  common.store(refreshSearchKey,true);
	  			} else {
		  			 var forbidden = {
		  			 	name: 'action-forbidden'
		  			 };
		  			$rootScope.operations.dispatchAction(forbidden);
	  			}	  
			},

			updateChanges: function() {
				updateChanges();
			}
		};

		$scope.$on('entity-deletable', function(conf, data) {
			$scope.deletable = data.deletable;
			$scope.disabledDelete = data.disabledDelete;		
		});
		
		$scope.$on('entity-updatable-custom', function(conf, data) {
			$scope.customDisableValider = data.disabledUpdate;				
		});
		
		$scope.$on('discard', function(conf, data) {
			if (data.pageId === pageData.pageId) {
			  // Are we updating?
			  if (entityType !== 'new') {
			    // we charge from REST because we have it cached
			    $scope.entity = pageData.entity = localEndpoint.get({ id: entityId, path: metadata.apiPath });
			  }
			}
		});

		$scope.$on('tab-has-changes', function(conf, data) {
			
			(data.hasChange) ? $scope.changes.push(data.field) : $scope.changes.pop(data.field);
			updateChanges();
		});
		function controlValidation() {
			$scope.invalid = false;
			for(var field in validationData) {
				if(validationData[field].length) {
					$scope.invalid = true;
					break;
				}
			}
		}

		controlValidation();

		$scope.$on('form-invalid', function(conf, invalid) {
			var fieldName = invalid.owner + '-' + invalid.field;
			var validation = invalid.validation;
			var valid = invalid.valid;

			if(valid) {
				if(validationData[fieldName]) {
					var index = validationData[fieldName].indexOf(validation);
					if(index !== -1) {
						validationData[fieldName].splice(index, 1);
					}
					if(!validationData[fieldName].length) {
						delete validationData[fieldName];
					}
				}
			}
			else {
				if(!validationData[fieldName]) {
					validationData[fieldName] = [];
				}

				var index = validationData[fieldName].indexOf(validation);

				if(index === -1) {
					validationData[fieldName].push(validation);
				}
			}

			controlValidation();
		});
		
		$scope.$on('form-reset-invalid-date', function() {
			// check all dates validation to ensure no errors are present in form
			for (var name in validationData) {
			    if (validationData.hasOwnProperty(name)) {
			    	var clone = validationData[name].slice(0);
			    	for (var i = 0 ; clone != undefined && i < clone.length; i++) {
				        // do stuff
						switch (clone[i]) {
						case "DATE_GE":
						case "DATE_GT":
						case "DATE_LE":
						case "DATE_LT":	
							validationData[name].splice(i, 1);
							if (validationData[name].length == 0) {
								delete validationData[name];
							}
							break;
						}
			    	}
			    }
			}
			controlValidation();
		});
  }]);
