'use strict';

angular.
  module('slideShow')
  .component('slideShow', {
    templateUrl: 'slideshow/slideshow.html',
    controller: ['$routeParams', 'GetData', function ($routeParams, GetData) {
        var self = this;
        self.db = GetData.get({filename: $routeParams.pageId}, function(images) {
        	self.files = images.data;
        	self.path = images.path + images.filename;
          self.setImage(self.files[0].fileId);
        });

        self.setImage = function setImage(imageUrl) {
          self.mainImageUrl = imageUrl;
        };

        self.nextImage = function () {
          self.temp = self.files.shift();
          self.files.push(self.temp);
        }

        self.prevImage = function () {
          self.temp = self.files.pop();
          self.files.unshift(self.temp);
        }

      }
    ]
  });