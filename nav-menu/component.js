'use strict';

angular.
  module('navMenu')
  .component('navMenu', {
    templateUrl: ['$element', '$attrs', function($element, $attrs) {
      return 'nav-menu/' + $attrs.menuType + '.html';
    }],
    controller: ['$element', '$attrs', 'MenuDb', function ($element, $attrs, MenuDb) {
        var self = this;
        self.db = MenuDb.get({menuId: $attrs.menuType}, function() {
          self.menuItems = self.db.list;
          self.category = self.db.category;
        });
      }
    ]
  });