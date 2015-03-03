'use strict';

/**
 * @ngdoc object
 * @name kongaUITools.Constants
 * @description
 * Stores common constants used all across the application
 * @property {String} API_HOST Defines where is the api located
 * @property {String} ENTITY_ID_PREFFIX Defines the preffix for ENTITY operations
 * @property {String} SEARCH_SUFFIX Defines the suffix for search purposes
 * @property {String} STRING_SEPARATOR Defines the separator for Strings
 * @property {String} NEW_ENTITY_ID Defines the eds id when creating a new one
 * @property {String} SOURCE_METADATA Defines the entity name of the metadata
 * @property {String} SCOPE_SEARCH Defines the search scope name
 * @property {String} SCOPE_UPDATE Defines the update scope name
 * @property {String} FIELD_BOOLEAN Defines the type name of a boolean field
 * @property {String} FIELD_CHECKBOX Defines the type name of a checkbox field
 * @property {String} FIELD_DATE Defines the type name of a date field
 * @property {String} FIELD_TEXT Defines the type name of a text field
 * @property {String} FIELD_COMPLEX Defines the type name of a complex field
 * @property {String} DATE_DEFAULT_NOW Defines the default value for date objects, to set-up as current date
 * @property {String} MULTIPLICITY_ONE Defines the String to define one-to-one multiplicity
 * @property {String} MULTIPLICITY_MANY Defines the String to define many-to-many multiplicity
 *
 */
var constants = {

	 API_HOST 							: 'http://localhost:8080/sigma-ihm/api',      //local
	//API_HOST 							: 'http://20.34.36.150:8080/sigma-ihm/api',      //server (dev)
	// API_HOST 						: '/sigma-ihm-0.0.10/api',   //serve

	ALERT_TYPE_ERROR 					: 'danger',
	ALERT_TYPE_SUCCESS 					: 'success',
	ALERT_TYPE_DEFAULT 					: 'default',
	ALERT_TYPE_WARNING 					: 'warning',

	ENTITY_ID_PREFFIX 					: 'eds_',

	SEARCH_SUFFIX 						: '_search',

	STRING_SEPARATOR					: '_',

	NEW_ENTITY_ID 						: 'new',

	REFRESH_SEARCH_KEY 					: 'refreshSearchKey_',

	SCOPE_SEARCH 						: 'search',
	SCOPE_RESULTS 						: 'results',
	SCOPE_UPDATE 						: 'update',

	FIELD_STRING 						: 'STRING',
	FIELD_NUMBER 						: 'NUMBER',
	FIELD_PLAIN 						: 'PLAIN',
	FIELD_PASSWORD 						: 'PASSWORD',
	FIELD_BOOLEAN 						: 'BOOLEAN',
	FIELD_CHECKBOX 						: 'CHECKBOX',
	FIELD_COMBOBOX 						: 'COMBOBOX',
	FIELD_DATE 							: 'DATE',
	FIELD_DATETIME 						: 'DATETIME',
	FIELD_DATESEARCH 					: 'DATE-SEARCH',
	FIELD_TEXT 							: 'TEXT',
	FIELD_TEXTAREA 						: 'TEXTAREA',
	FIELD_COMPLEX 						: 'COMPLEX',
	FIELD_LIST 							: 'LIST',
	FIELD_PICK_LIST 					: 'PICK_LIST',
	FIELD_SELECT 						: 'SELECT',
	FIELD_FILTERED_SELECT 				: 'FILTERED_SELECT',
	FIELD_TICS 							: 'TICS',
	FIELD_COLOR 						: 'COLOR',
	FIELD_CSS 							: 'CSS',
	FIELD_FILE 							: 'FILE',
	FIELD_IMAGE 						: 'IMAGE',
	FIELD_PRICE 						: 'PRICE',
	// FIELD_LIST_SEARCH					: 'list_search',
	// FIELD_LIST_LINK						: 'list_link',

	DATE_DEFAULT_NOW 					: 'now',

	MULTIPLICITY_ONE 					: 'ONE',
	MULTIPLICITY_MANY 					: 'MANY',

	TRIGGER_MOMENT_IMMEDIATE 			: 'IMMEDIATE',
	TRIGGER_MOMENT_COMMIT 				: 'COMMIT',
	TRIGGER_TYPE_CONFIRM 				: 'CONFIRM',
	TRIGGER_TYPE_ALERT 					: 'ALERT',
	TRIGGER_PARAM_LABEL 				: 'label',

	TRIGGER_MATCH_VALUE 				: 'VALUE',
	TRIGGER_MATCH_LENGTH 				: 'LENGTH',

	TRIGGER_MATCH_TYPE_EXACT			: 'EXACT_MATCH',
	TRIGGER_MATCH_TYPE_RANGE	  		: 'RANGE',

	CASCADE_FORM 						: 'CASCADE',
	TABBED_FORM 						: 'TABBED',
	CUSTOM_TABBED_FORM 					: 'CUSTOM_TABBED',
	CUSTOM_FORM 						: 'CUSTOM',

	CATEGORIZED_CASCADE_FORM 			: 'CATEGORIZED_CASCADE',

	LANGUAGE_MESSAGE_PREFFIX 			: 'message.languages.',

	DATE_COMPARATOR_LOWER_THAN 			: 'LOWER_THAN',
	DATE_COMPARATOR_LOWER_EQUALS 		: 'LOWER_EQUALS',
	DATE_COMPARATOR_EQUALS 				: 'EQUALS',
	DATE_COMPARATOR_GREATER_EQUALS 		: 'GREATER_EQUALS',
	DATE_COMPARATOR_GREATER_THAN 		: 'GREATER_THAN',
	DATE_COMPARATOR_BETWEEN 			: 'BETWEEN',

	NUMBER_COMPARATOR_LOWER_THAN 		: 'LOWER_THAN',
	NUMBER_COMPARATOR_LOWER_EQUALS 		: 'LOWER_EQUALS',
	NUMBER_COMPARATOR_EQUALS 			: 'EQUALS',
	NUMBER_COMPARATOR_GREATER_EQUALS 	: 'GREATER_EQUALS',
	NUMBER_COMPARATOR_GREATER_THAN 		: 'GREATER_THAN',
	NUMBER_COMPARATOR_BETWEEN 			: 'BETWEEN',

	VALIDATOR_EXACT_MATCH 				: 'EXACT_MATCH',
	VALIDATOR_RANGE 					: 'RANGE',

	
	MAXLEN_FILTER_NAME              	: 30,

	ACTION_TYPE_MODAL 					: 'modal',
	ACTION_TYPE_NOTIFY 					: 'notify',
	ACTION_TYPE_CONFIRM 				: 'confirm',
	ACTION_TYPE_TAB 					: 'tab',
	ACTION_TYPE_FUNCTION 				: 'function',
	
	ACTION_RESTRICTION_POLICY_ALL 		: 'all'	,

	USER_ID								: 'userId',
	
	COMBO_NATURE_TIERS					: 'natTiers',	

	CONFIGURATION_IGNORE_PARENT_FIELD 	: 'IGNORE_PARENT_FIELD',
	CONFIGURATION_USE_VIEW 				: 'USE_VIEW',

	TAB_TYPE_SEARCH 					: 'glyphicon glyphicon-search',
	TAB_TYPE_UPDATE 					: 'glyphicon glyphicon-pencil',
	TAB_TYPE_HOME 						: 'glyphicon glyphicon-home',
	TAB_TYPE_TASKS 						: 'glyphicon glyphicon-tasks',
	TAB_TYPE_GRID 						: 'glyphicon glyphicon-th',
	TAB_TYPE_GRID_LARGE 				: 'glyphicon glyphicon-th-large',
	TAB_TYPE_STORE 						: 'glyphicon glyphicon-shopping-cart',

	FORM_STYLE_HORIZONTAL 				: 'HORIZONTAL',
	USE_SHORT_LABEL 					: 'USE_SHORT_LABEL',
	
	FILE_TYPE_PDF						: 'application/pdf',
	FILE_TYPE_PNG						: 'image/png',
	FILE_TYPE_JPG						: 'image/jpeg',
	FILE_TYPE_GIF						: 'image/gif',
	FILE_EXT_PNG						: '.png',
	FILE_EXT_JPG						: '.jpg',
	FILE_EXT_GIF						: '.gif',

	CASCADE_UPDATE 						: 'CASCADE_UPDATE',
	PROPAGATE_UPDATE 					: 'PROPAGATE_UPDATE',
	DISABLE_COMPLEX_FIELD 				: 'DISABLE_FIELD',

	SELF_FIELD 							: '$self',
	COMPLEX_FIELD_AS					: 'as',
	
	UPDATE_CUSTOM_VIEW 					: 'UPDATE_CUSTOM_VIEW',
	SEARCH_CUSTOM_VIEW 					: 'SEARCH_CUSTOM_VIEW',

	WEEKDAYS 							: ['day.sunday', 'day.monday', 'day.tuesday', 'day.wednesday', 'day.thursday', 'day.friday', 'day.saturday'],
	WEEKEND_DAYS 						: ['day.saturday', 'day.sunday'],

	MONTHS 								: ['month.january', 'month.february', 'month.march', 'month.april', 'month.may', 'month.june', 'month.july', 'month.august', 'month.september', 'month.october', 'month.november', 'month.december'],

	SEARCH_USE_CATEGORY 				: 'USE_SEARCH_CATEGORY',
	RESULTS_USE_CATEGORY 				: 'USE_RESULTS_CATEGORY',
	HIDE_CATEGORY_HEADER 				: 'HIDE_CATEGORY_HEADER',

	QUERY_PARAM_REGEXP 					: /^{\w+}$/,
	QUERY_COMPLEX_PARAM_REGEXP 			: /^{(\w+\.\w+)*}$/,

	SHOW_PAGINATION 					: 'SHOW_PAGINATION'
};