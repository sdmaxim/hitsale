angular.
  module('core.db').
  factory('Db', ['$resource',
    function($resource) {
      return $resource('core/:menuId.json', {}, {
      	query: {
          method: 'GET',
          params: {menuId: 'menus'},
          isArray: true
        }
      });
    }
  ]);