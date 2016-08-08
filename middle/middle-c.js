'use strict';

angular.
  module('middle').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');
      $routeProvider.
        when('/', {
          template: '<nav-menu menu-type="main-menu"></nav-menu>'
        }).
        when('/hologram', {
          template: '<nav-menu menu-type="hologram-menu"></nav-menu>'
        }).        
        when('/gamadim', {
          template: '<nav-menu menu-type="gamadim-menu"></nav-menu>'
        }).    
        when('/:pageType/:pageId.html', {
          template: '<content></content>'
        }).
        otherwise('/');
    }
  ]);