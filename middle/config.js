'use strict';

angular.
  module('middle').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');
      $routeProvider.
        when('/', {
          template: '<middle-menu></middle-menu>'
        }).
        when('/:pageId', {
          template: '<content></content>'
        }).
        otherwise('/');
    }
  ]);

/*  
<div class="page-body" align="center">
  <div class="main">
    <top></top>
    <middle></middle>
    <footer></footer>
  </div>
</div>
*/