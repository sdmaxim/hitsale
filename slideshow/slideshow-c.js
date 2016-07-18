'use strict';

angular.
  module('slideShow')
  .component('slideShow', {
    templateUrl: 'slideshow/slideshow.html',
    controller: ['$routeParams', 'GetData', function ($routeParams, GetData) {
        var self = this;
        self.data = [];
        var fullPath = "";
        var startFilmWidth = 1000; //старотовая длина пленки кадров
        self.filmWidth = startFilmWidth; //Сумма ширин всех кадров + расстояние между ними
        var thumbLength = 0;
        self.length = 0;
        var start = 0;
        var end = 0;
        var bigInd = 0;
        var widthShowenFrames = 0;
        var framesCount = 0;
        var slideShowWindow = 640;
        var framesBetweenWidth = 2;
        var cursor = 0;
        self.shift = -framesBetweenWidth;

        GetData.get({filename: $routeParams.pageId}, function(images) {
          self.data = images.data;
          self.length = self.data.length;
          end = self.data.length-1;
          fullPath = images.path + images.filename;

          self.data.forEach(function(item, i, arr) {
            var img = new Image();
            
            img.onload = function() {
              framesCount++;
              self.data[i].width = this.width;
              self.data[i].height = this.height;
              self.filmWidth += this.width + framesBetweenWidth;
              //console.log(i+" "+self.filmWidth+" "+this.width);
              if (widthShowenFrames < slideShowWindow) {
                widthShowenFrames += this.width + framesBetweenWidth;
                thumbLength += 1;
              }           
              
              if (framesCount == self.length) {
                widthShowenFrames -= framesBetweenWidth;
                self.filmWidth -= framesBetweenWidth + startFilmWidth;

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
          if ((cursor < 0) || (start == 0)) {
            self.shift -= (widthShowenFrames - slideShowWindow - framesBetweenWidth);
            if (cursor < 0) cursor = 2; else cursor = 1;
          } else {
            if (cursor > 0) {
              self.shift -= (self.data[end].width + framesBetweenWidth);
              widthShowenFrames += self.data[end].width - self.data[start].width;
              cursor = 1;
            }
            if (end == self.length-1) cursor = 0;
          }
          console.log(start + " " + end + " " + self.shift + " " + widthShowenFrames + " " + slideShowWindow + " " + self.data[end].width);
          bigInd++;
          start+=cursor;
          end+=cursor;
          validInd();
        };

        self.prevImage = function () {
          if (cursor > 0) {
            self.shift += (widthShowenFrames - slideShowWindow - framesBetweenWidth);
            if (cursor > 0) cursor = -2; else cursor = -1;
          } else {
            if (cursor < 0) {
              self.shift += self.data[end].width + framesBetweenWidth;
              widthShowenFrames += self.data[start].width - self.data[end].width;
              cursor = -1;
            }
            if (start == 0) cursor = 0;
          }
          console.log(start + " " + end + " " + self.shift + " " + widthShowenFrames + " " + slideShowWindow + " " + self.data[end].width);
          bigInd--;
          start+=cursor;
          end+=cursor;
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