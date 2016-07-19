'use strict';

angular.
  module('slideShow')
  .component('slideShow', {
    templateUrl: 'slideshow/slideshow.html',
    controller: ['$routeParams', 'GetData', function ($routeParams, GetData) {
        var self = this;
        self.data = [];
        var fullPath = "";
        var startFilmWidth = 1000; //начальная длина для начального рендеринга
        self.filmWidth = startFilmWidth; //Длина пленки
        self.length = 0; //Количество кадров в пленке
        var start = 0; //Первый видимый кадр
        var end = 0; //последний видимый кадр
        var bigInd = 0; //Индек больших картинок
        var widthShowenFrames = 0; //Длина видимых кадров
        var framesCount = 0; //Счетчик кадров
        var slideShowWindow = 640;
        var framesBetweenWidth = 2;
        var cursor = 0;
        var delta = 0;
        self.shift = 0;
        var last = 0;
        self.leftBigMargine = 0;

        GetData.get({filename: $routeParams.pageId}, function(images) {
          self.data = images.data;
          self.length = self.data.length;
          end = self.length-1;
          fullPath = images.path + images.filename;

          //Добавляем ширины кадров к их обектам, вычисляем длину пленки и последний видимый кадр
          self.data.forEach(function(item, framesCount, arr) {
            var img = new Image();
            img.onload = function() {
              self.data[framesCount].width = this.width;
              if (self.filmWidth - startFilmWidth <= slideShowWindow) {
                end = framesCount;
              }
              self.filmWidth += this.width + framesBetweenWidth;

              if (framesCount == self.length-1) {
                self.filmWidth -= startFilmWidth;
                if (end == 0) end = self.length-1;
              }
            }
            img.src = self.getSmallImg(framesCount);
            var imgBig = new Image();
            imgBig.onload = function() {
              self.data[framesCount].widthBig = this.width;
            }
            imgBig.src = self.getFullImgPath(framesCount, "big");
          });
        });

        var nextImageValid = function () {
          if ((end == self.length-1) && (cursor == 0)) 
            return true
          else
            return false;
        }

        var getLeftBigMargine = function () {
          self.leftBigMargine = (window.innerWidth-self.data[bigInd].widthBig) / 2;
        }
        
        self.nextImage = function () {
          //Выйти если превышена правая граница пленки+
          if (nextImageValid()) return;

          //Подсчет длины видимых кадров
          widthShowenFrames = 0;
          var framesCount = end+1;
          while (((widthShowenFrames < slideShowWindow) || (cursor < 0)) && (framesCount > 0)) {
            framesCount--;
            widthShowenFrames += self.data[framesCount].width + framesBetweenWidth;
          }

          if ((cursor < 0) || ((cursor == 0) && (start == 0))) {
            delta = widthShowenFrames - slideShowWindow - framesBetweenWidth;
          } else {
            delta = self.data[end].width + framesBetweenWidth;
          }
          self.shift -= delta;
          cursor = 1;

          console.log(start + " " + end + " " + " delta " + delta);

          bigInd++;
          start = framesCount;
          end++;
          if (end == self.length) {
            end--;
            cursor = 0;
          }
          getLeftBigMargine();
        };

        self.prevImage = function () {
          //Выйти если превышена правая граница пленки
          if ((start == 0) && (cursor == 0)) return;

          //Подсчет длины видимых кадров
          widthShowenFrames = 0;
          var framesCount = start-1;
          while (((widthShowenFrames < slideShowWindow) || (cursor > 0) || (nextImageValid())) && (framesCount < self.length-1)) {
            framesCount++;
            widthShowenFrames += self.data[framesCount].width + framesBetweenWidth;
          }

          if (cursor >= 0) {
            delta = widthShowenFrames - slideShowWindow - framesBetweenWidth;
          } else {
            delta = self.data[start].width + framesBetweenWidth;
          }
          self.shift += delta;
          cursor = -1;

          console.log(start + " " + end + " " + " delta " + delta);

          bigInd--;
          start--;
          end = framesCount;
          if (start == -1) {
            start = 0;
            cursor = 0;
          }
          getLeftBigMargine();
        };

        self.getShowFlag = function (imgInd) {
          var showFlag = false;
          if ((imgInd >= start) && (imgInd <= end) && (start <= end))
            showFlag = true;
          return showFlag;
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
          return fullPath + self.getFileId(imgId) + type;;
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