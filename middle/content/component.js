'use strict';

angular.
  module('content').
  component('content', {
    templateUrl: function ($routeParams) {
      //console.log($routeParams.pageId + "+++");
      if ($routeParams.pageId) 
        return 'data/stati/detskii_birthday.html'
      else 
        return 'middle/menu/template.html'
    },
    controller: function ($routeParams) {
      console.log($routeParams.pageId + "***");
      //this.pageType = 'text';
			this.menuItems = [{
          name: "Главная"
        }, {
          name: "О нас"
        }, {
          name: "Контакты"
        }]
    }
  });