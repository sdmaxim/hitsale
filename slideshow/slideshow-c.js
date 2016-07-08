'use strict';

angular.
  module('slideShow')
  .component('slideShow', {
    templateUrl: 'slideshow/slideshow.html',
    controller: ['$routeParams', 'GetData', function ($routeParams, GetData) {
        var self = this;
        self.db = GetData.get({filename: $routeParams.pageId}, function(images) {
        	var fullpath = images.data[0].fileId;
        	self.files = images.data;
        	self.path = images.path + images.filename;
          self.setImage(fullpath);
        });

        self.setImage = function setImage(imageUrl) {
          self.mainImageUrl = imageUrl;
        };
      }
    ]
  });