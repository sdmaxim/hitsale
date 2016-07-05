'use strict';

angular.
  module('middleMenu').
  component('middleMenu', {
    templateUrl: 'middle/middle-menu/template.html',
    controller: ['Db', function (Db) {
        var self = this;

        self.db = Db.get({menuId: "middle-menu"}, function(menu) {
          self.menuItems = self.db.list;
        });
      }
    ]
  });