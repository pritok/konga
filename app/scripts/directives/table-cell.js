'use strict';

/**
 * @ngdoc directive
 * @name konga.directive:tableCell
 * @description
 * # tableCell
 */
angular.module('konga')
  .directive('tableCell', ['util', '$filter', 'configurationManager', 'mapper',
    function (util, $filter, configurationManager, mapper) {
      return {
        templateUrl: '/konga/views/table-cell.html',
        restrict: 'E',
        replace: true,
        scope: {
        	entity: '=',
        	field: '='
        },
        link: function postLink(scope, element) {
          scope.content = '';
          scope.type = 'text';
          scope.styles = [];
          scope.preffix = '';
          scope.suffix = '';
          scope.custom = null;
          scope.title = "";

          var useList = true;

          //var fieldWatcher;
          var entityWatcher;

          function setupValue() {
            var fieldEntity = scope.entity;

            // Lookup for complex fields
            var mapped = null;
            if(scope.field.derived) {
              if(scope.field.derivedSource) {
                fieldEntity = $filter('mapField')(scope.entity, scope.field.derivedSource);
                if(scope.field.isSelf) {
                  mapped = fieldEntity;
                }
              }
            }

            if(!mapped) {
              mapped = $filter('mapField')(fieldEntity, scope.field);
            }
          
            // Render depending on the data type
            switch(scope.field.fieldType.results) {
            case util.constants.FIELD_DATE:
              scope.content = mapped !== 0 ? $filter('date')(mapped, 'dd/MM/yyyy') : '';
              break;
            case util.constants.FIELD_DATETIME:
                scope.content = mapped !== 0 ? $filter('date')(mapped, 'dd/MM/yyyy HH:mm:ss') : '';
              break;
            case util.constants.FIELD_BOOLEAN:
              var content = $filter('activeInactive')(mapped, scope.field);
              scope.content = $filter('translate')(content);
              // scope.contentUrl = views.translated;
              break;
            case util.constants.FIELD_IMAGE:
              scope.type = 'image';
              scope.content = mapped;
              scope.image = {
                width: 30,
                height: 30,
              };

              // Read configuration
              var conf = scope.field.fieldType.configuration[0];
              var width = $filter('filter')(conf, { key: 'IMAGE_WIDTH' }, true)[0];
              var height = $filter('filter')(conf, { key: 'IMAGE_HEIGHT' }, true)[0];

              if(width) {
                scope.image.width = width.value;
              }

              if(height) {
                scope.image.height = height.value;
              }


              break;
            case util.constants.FIELD_PRICE:
              var configuration = scope.field.fieldType.configuration[0];
              var currency = $filter('filter')(configuration, { key: 'CURRENCY' }, true)[0];
              scope.suffix = currency.value;
              scope.styles.push('text-right');
              scope.content = $filter('number')(mapped, 2);
              break;
            case util.constants.FIELD_NUMBER:
              // Read decimals from config
              scope.styles.push('text-right');
              scope.content = mapped;
              break;  
            case util.constants.FIELD_CSS:
              scope.type = 'styling';
              scope.styles.push('text-center');
              scope.content = mapped;
              useList = false;

              // Get title
              // TODO Allow custom
              var list = scope.field.type.list;
              var listMatch = $filter('filter')(list, { key: (scope.content+"") }, true);
              if(listMatch.length) {
                var item = listMatch[0];
                var content = item.value;
                scope.title = $filter('translate')(content);
              }
              break;
            case util.constants.FIELD_PLAIN_FILTERED:
              scope.type = 'plain-filtered';
              scope.content = mapped;

              // Get the filter 
              // TODO Or die :)
              var configuration = scope.field.fieldType.configuration[0];
              var filter = $filter('filter')(configuration, { key: util.constants.TABLE_CELL_FILTER }, true)[0];
              scope.filter = filter.value;

              break;
            case util.constants.FIELD_CUSTOM:
              scope.type = 'custom';
              scope.content = mapped;
              var customConf = configurationManager.get(util.constants.CUSTOM_FIELD_TYPE, scope.field, util.constants.SCOPE_RESULTS);
              if(!customConf) {
                // TODO Throw exception
              }

              // Try to get mapped view
              scope.custom = mapper[customConf];
              if(!scope.custom) {
                scope.custom = customConf;
              }

              break;
            case util.constants.FIELD_PLAIN:
            default:
              if(scope.field.type.type === util.constants.FIELD_COMPLEX) {
                scope.content = $filter('tableRendererComplex')(mapped, scope.field);
              }
              else {
                try {
                  scope.content = $filter('translate')(mapped);
                } catch(e) {
                  scope.content = mapped;
                }
              }
            }

            if(scope.field.type.list && useList) {
              var list = scope.field.type.list;
              
              var listMatch = $filter('filter')(list, { key: (scope.content+"") }, true);
              if(listMatch.length) {
                var item = listMatch[0];
                var content = item.value;
                scope.content = $filter('translate')(content);
              }
            }

            if(scope.content === null || scope.content === undefined) {
              scope.content = '';
            }
          }

          entityWatcher = scope.$watch('entity', function() {
            setupValue();
            scope.updateContent();
            entityWatcher();
            // fieldWatcher();
          }, true);

          var watchers = null;
          scope.$on('suspend', function() {
            watchers = scope.$$watchers;
            scope.$$watchers = [];
          });

          scope.$on('resume', function() {
            scope.$$watchers = watchers;
          });


          var elt = angular.element(element);

          scope.updateContent = function() {
            element.children('.table-cell-content').text(scope.preffix + ' ' + scope.content + ' ' + scope.suffix);
          };
        }
      };
    }]);
