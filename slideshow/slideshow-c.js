'use strict';

angular.
  module('slideShow')
  .component('slideShow', {
    templateUrl: 'slideshow/slideshow.html',
    controller: ['$routeParams', 'GetData', function ($routeParams, GetData) {
        var self = this;
        self.data = [];
        self.thumbs = [];
        var fullPath = "";
        self.thumbLength = 10;
        self.length = 0;
        var start = 0;
        var end = 0;
        self.bigInd = 0;

        GetData.get({filename: $routeParams.pageId}, function(images) {
          self.data = images.data;
          self.length = self.data.length;
          end = self.data.length-1;
          if (end > self.thumbLength-1) {
            end = self.thumbLength-1;
          } else {
            self.thumbLength = end+1;
          }
          fullPath = images.path + images.filename;
          self.thumbs = images.data.slice(start, end+1);
        });

        self.nextImage = function () {
          start++;
          end++;

          validInd();
          self.thumbs.shift();
          self.thumbs.push(self.data[end]);
           var x = "";
          self.thumbs.forEach(function(item, i) {
            x+=item.fileId + ", ";
          });
          console.log(x);
        };

        self.prevImage = function () {
          start--;
          end--;

          validInd();
          self.thumbs.pop();
          self.thumbs.unshift(self.data[start]);
        };

        var validInd = function () {
          if (start > self.length-1) {
            start = 0;
          }
          if (end > self.length-1) {
            end = 0;
          }
          if (start < 0) {
            start = self.length-1;
          }
          if (end < 0) {
            end = self.length-1;
          }
        }

        var validFileId = function (fileId) {
          if (!fileId) fileId = 0;
          fileId += start;
          if (fileId > self.length-1)
          fileId -= self.length - 1;
          return fileId;
        }

        self.getFileId = function (fileId) {
          fileId = validFileId(fileId);
          return self.data[fileId].fileId;
        }

        self.getTitle = function () {
          var fileId = validFileId(self.bigInd);
          return self.data[fileId].title;
        }

        self.getFullImgPath = function (fileId, type) {
          if (!fullPath) return "";
          switch (type) {
            case "big" : type = "-big.jpg"; break;
            default : type = "-small.jpg"; break;
          }
          return fullPath + self.getFileId(fileId) + type;
        }

        self.getSmallImg = function (fileId) {
          return self.getFullImgPath(fileId, 'small');
        }

        self.getBigImg = function () {
          return self.getFullImgPath(self.bigInd, 'big');
        }

        self.closePopUp = function(){
          self.showPopUpImg = false;
        }

        self.showPopUpImg = false;

        self.openPopUp = function( fileId ) {
          self.bigInd = fileId;
          self.showPopUpImg = true;
        }
      }
    ]
  });