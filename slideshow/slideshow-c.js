'use strict';

angular.
  module('slideShow')
  .component('slideShow', {
    templateUrl: 'slideshow/slideshow.html',
    controller: ['$attrs', 'GetData', function ($attrs, GetData) {
        var self = this;
        self.data = []; //Список картинок и свойств
        var fullPath = ""; //Полный путь к файлу без ID
        var startFilmWidth = 1500; //начальная длина для начального рендеринга
        self.filmWidth = startFilmWidth; //Длина пленки
        self.length = 0; //Количество кадров в пленке
        self.start = 0; //Первый видимый кадр
        self.end = 0; //последний видимый кадр
        self.bigInd = 0; //Индек больших картинок
        self.showenFramesL = 0; //Длина видимых кадров
        var counter = 0; //Счетчик кадров
        var showWindowW = 892; //Ширина окна показа ленты
        var space = 5; //Расстояние между кадрами
        self.cursor = 0; //Направление движения
        self.delta = 0; //Текущая величина сдвига ленты
        self.shift = 0; //Общий сдвиг ленты
        self.bigMargineLeft = 0; //Отступ от левого края для больших картинок
        self.bigMargineTop = 0; //Отступ от левого края для больших картинок
        self.thumbStyle = {};
        /*          style=" margin-left: {{$ctrl.bigMargineLeft}}px; 
                  margin-top: {{$ctrl.bigMargineTop}}px">
                  */
        self.bigStyle = {};

        var setThumbStyle = function() {
          self.thumbStyle = {
            "left" : self.shift + "px",
            "width" : self.filmWidth + "px"
          },
          self.bigStyle = {
            "margin-left" : self.bigMargineLeft + "px",
            "margin-top" : self.bigMargineTop + "px"
          }
        };
        setThumbStyle();

        GetData.get({filename: $attrs.jsonName}, function(images) {
          self.data = images.data;
          self.length = self.data.length;
          self.end = self.length-1;
          fullPath = images.path + images.filename;

          //Добавляем ширины кадров к их обектам, вычисляем длину пленки и последний видимый кадр
          self.data.forEach(function(item, counter, arr) {
            var img = new Image();
            img.onload = function() {
              //Добавляем свойство ширина к каждому кадру
              self.data[counter].width = this.width;
              if (self.filmWidth - startFilmWidth <= showWindowW) {
                self.end = counter;
              }
              self.filmWidth += this.width + space;

              if (counter == self.length-1) {
                self.filmWidth -= startFilmWidth;
                if (self.end == 0) self.end = self.length-1;
              }
            }
            img.src = self.getSmallImg(counter);
            var imgBig = new Image();
            imgBig.onload = function() {
              self.data[counter].widthBig = this.width;
              self.data[counter].heightBig = this.height;
            }
            imgBig.src = self.getFullImgPath(counter, "big");
          });
        });

        var getbigMargine = function () {
          self.bigMargineLeft = (window.innerWidth-self.data[self.bigInd].widthBig) / 2;
          self.bigMargineTop = (window.innerHeight-self.data[self.bigInd].heightBig) / 2 - 15;
        }
        
        self.nextImage = function () {
          self.bigInd++;
          if (self.bigInd > self.length-1) self.bigInd = 0;
          getbigMargine();

          //Выйти если превышена правая граница пленки
          if ((self.end == self.length-1) && (self.cursor == 0)) return;

          if (self.showenFramesL == showWindowW) self.cursor = 1;
          if (self.cursor <= 0) {
            self.showenFramesL = 0;
            counter = self.start-1;
            self.cursor = 1;
            while ((self.showenFramesL < showWindowW) && (counter < self.length-1)) {
              counter++;
              self.showenFramesL += self.data[counter].width + space;
            }
            self.end = counter;
            self.delta = self.showenFramesL - showWindowW;
          } else {
            self.end++;
            if (self.end > self.length-1) {
              self.end = self.length-1;
              self.cursor = 0;
              return;
            }
            self.delta = self.data[self.end].width + space;
            self.showenFramesL += self.delta;

            self.start--;
            while ((self.showenFramesL >= showWindowW) && (self.start < self.length-1)) {
              self.start++;
              self.showenFramesL -= (self.data[self.start].width + space);
            }
            self.showenFramesL += self.data[self.start].width + space;
          }
          self.shift -= self.delta;
          setThumbStyle();
        };

        self.prevImage = function () {
          self.bigInd--;
          if (self.bigInd < 0) self.bigInd = self.length-1;
          getbigMargine();
          //Выйти если превышена левая граница пленки
          if ((self.start == 0) && (self.cursor == 0)) return;

          if (self.showenFramesL == showWindowW) self.cursor = -1;
          if (self.cursor >= 0) {
            self.showenFramesL = 0;
            counter = self.end+1;
            self.cursor = -1;
            while ((self.showenFramesL < showWindowW) && (counter > 0)) {
              counter--;
              self.showenFramesL += self.data[counter].width + space;
            }
            self.delta = self.showenFramesL - showWindowW;
          } else {
            self.start--;
            if (self.start < 0) {
              self.start = 0;
              self.cursor = 0;
              return;
            }
            self.delta = self.data[self.start].width + space;
            self.showenFramesL += self.delta;

            self.end++;
            while ((self.showenFramesL >= showWindowW) && (self.end > 0)) {
              self.end--;
              self.showenFramesL -= (self.data[self.end].width + space);
            }
            self.showenFramesL += self.data[self.end].width + space;
          }
          self.shift += self.delta;
          setThumbStyle();
        };

        self.getShowFlag = function (imgInd) {
          var showFlag = false;
          if ((imgInd >= self.start) && (imgInd <= self.end) && (self.start <= self.end))
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
          return self.getFullImgPath(self.bigInd, 'big');
        }

        self.getTitle = function () {
          return self.data[self.bigInd].title;
        }

        self.closePopUp = function(){
          self.showPopUpImg = false;
        }

        self.showPopUpImg = false;

        self.openPopUp = function( imgId ) {
          self.bigInd = imgId;
          getbigMargine();
          setThumbStyle();
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