'use strict';

angular.
  module('slideShow')
  .component('slideShow', {
    templateUrl: 'slideshow/slideshow.html',
    controller: ['$routeParams', 'GetData', function ($routeParams, GetData) {
        var self = this;
        self.ind = {
          thumbLength : 7,
          length : 0,
          start : 0,
          end : 0
        }

        self.getFirstImg = function () {
          return self.files[0].fileId;
        }

        self.setInd = function () {
          self.ind.length = self.data.length;
          self.ind.end = self.data.length;
          if (self.ind.end > self.ind.thumbLength) self.ind.end = self.ind.thumbLength;
        }

        self.db = GetData.get({filename: $routeParams.pageId}, function(images) {
          self.data = images.data;
          self.setInd();

        	self.thumbs = images.data.slice(self.ind.start, self.ind.end);

        	self.path = images.path + images.filename;
          self.setImage(self.getFirstImg);
        });

        self.setImage = function setImage(imageUrl) {
          self.mainImageUrl = imageUrl;
        };

        self.nextImage = function () {
          self.ind.start++;
          self.ind.end++;

          self.temp = self.thumbs.shift();
          self.files.push(self.temp);
          return self.temp;
        }

        self.prevImage = function () {
          self.temp = self.files.pop();
          self.files.unshift(self.temp);
        }

        self.closePopUp = function(){
          self.showPopUpMsg = false;
        }

        self.showPopUpMsg = false;

        self.openPopUp = function( fileId ) {
          var x = fileId * 1;
          /*while(x > 0) {
            self.nextImage();
            console.log(fileId + " " + x);
            x--;
          }*/
          self.setImage(fileId);
          self.showPopUpMsg = true;
        }

        self.nextBigImage = function () {
          self.nextImage();
          self.setImage(self.files[0].fileId);
        }

      }
    ]
  });