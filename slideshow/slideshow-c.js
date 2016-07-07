'use strict';

angular.
  module('slideShow')
  .component('slideShow', {
    templateUrl: 'slideshow/slideshow.html',
    controller: ['$routeParams', 'GetData', function ($routeParams, GetData) {
        var self = this;
        console.log($routeParams);
        self.db = GetData.get({filename: $routeParams.filename}, function(images) {
        	var fullpath = images.path + images.filename + images.data[0].fileId + '-small.jpg';
          self.setImage(fullpath);
        });

        self.setImage = function setImage(imageUrl) {
          self.mainImageUrl = imageUrl;
        };
      }
    ]
  });