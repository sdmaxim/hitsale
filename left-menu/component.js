'use strict';

angular.
  module('leftMenu').
  component('leftMenu', {
    templateUrl: 'left-menu/template.html',
    controller: ['Db', function (Db) {
        var self = this;

        self.db = Db.get({menuId: "left-menu"}, function(menu) {
          self.menuItems = self.db.list;
        });
      }
    ]
  });