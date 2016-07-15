'use strict';

angular.
  module('slideShow')
  .component('slideShow', {
    templateUrl: 'slideshow/slideshow.html',
    controller: ['$routeParams', 'GetData', function ($routeParams, GetData) {
        var self = this;
        self.data = [];
        var fullPath = "";
        var thumbLength = 0;
        self.length = 0;
        var start = 0;
        var end = 0;
        var bigInd = 0;
        var imagesStringLength = 0;
        var imgCount = 0;

        GetData.get({filename: $routeParams.pageId}, function(images) {
          self.data = images.data;
          self.length = self.data.length;
          end = self.data.length-1;
          fullPath = images.path + images.filename;

          self.data.forEach(function(item, i, arr) {
            var img = new Image();
            
            img.onload = function() {
              imgCount++;
              self.data[i].width = this.width;
              self.data[i].height = this.height;
              if (imagesStringLength < 640) {
                imagesStringLength += this.width;
                thumbLength += 1;
              }
              if (imgCount == self.length) {
                end = self.data.length-1;
                if (end > thumbLength-1) {
                  end = thumbLength-1;
                } else {
                  thumbLength = end+1;
                }
              }
            }
            img.src = self.getFullImgPath(i);
          });

        });

        self.nextImage = function () {
          var tempSize = self.data[start].width;
          var i = end;
          /*while ((tempSize > 0) && (i)) {
              tempSize -= 
          }*/
          start++;
          end++;
          bigInd++;
          validInd();
        };

        self.prevImage = function () {
          var tempSize = self.data[end].width;
          start--;
          end--;
          bigInd--;
          validInd();
        };

        self.getShowFlag = function (imgInd) {
          var showFlag = false;
          if ((imgInd >= start) && (imgInd <= end) && (start <= end))
            showFlag = true;
          return showFlag;
        }

        var validInd = function () {
          if (start < 0) {
            start = 0;
            end = thumbLength-1;
          }
          if (end > self.length-1) {
            end = self.length-1;
            start = end-thumbLength+1;
          }
          if (bigInd > self.length-1) bigInd = self.length-1;
          if (bigInd < 0) bigInd = 0;
        }

        self.getFileId = function (imgId) {
          return self.data[imgId].fileId;
        }

        self.getFullImgPath = function (imgId, type) {
          if (!fullPath) return "";
          switch (type) {
            case "big" : type = "-big.jpg"; break;
            default : type = "-small.jpg"; break;
          }
          var imgPath = fullPath + self.getFileId(imgId) + type;
          return imgPath;
        }

        self.getSmallImg = function (imgId) {
          return self.getFullImgPath(imgId, 'small');
        }

        self.getBigImg = function () {
          return self.getFullImgPath(bigInd, 'big');
        }

        self.getTitle = function () {
          return self.data[bigInd].title;
        }

        self.closePopUp = function(){
          self.showPopUpImg = false;
        }

        self.showPopUpImg = false;

        self.openPopUp = function( imgId ) {
          bigInd = imgId;
          self.showPopUpImg = true;
        }
      }
    ]
  });

angular.module('slideShow').
  directive('styleParent', function(){ 
   return {
     restrict: 'A',
     link: function(scope, elem, attr) {
         elem.on('load', function() {
            var w = $(this).width(),
                h = $(this).height();

            var div = elem.parent();
            console.log();
            //check width and height and apply styling to parent here.
         });
     }
   };
});