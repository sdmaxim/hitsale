angular.
  module('navMenu').
  factory('MenuDb', ['$resource',
    function($resource) {
      return $resource('nav-menu/:menuId.json', {}, {
      	query: {
          method: 'GET',
          params: {menuId: 'menus'},
          isArray: true
        }
      });
    }
  ]);