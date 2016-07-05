'use strict';

angular.
  module('topMenu').
  component('topMenu', {
    templateUrl: 'top-menu/template.html',
    controller: ['Db', function (Db) {
        var self = this;

        self.db = Db.get({menuId: "top-menu"}, function(menu) {
          self.menuItems = self.db.list;
        });
      }
    ]
});