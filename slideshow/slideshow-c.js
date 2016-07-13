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
        var thumbLength = 10;
        var length = 0;
        var start = 0;
        var end = 0;
        self.bigInd = 0;

        GetData.get({filename: $routeParams.pageId}, function(images) {
          self.data = images.data;
          length = self.data.length;
          end = self.data.length-1;
          if (end > thumbLength-1) end = thumbLength-1;
          fullPath = images.path + images.filename;
          self.thumbs = images.data.slice(start, end);
        });

        self.nextImage = function () {
          start++;
          end++;

          validInd();
          self.thumbs.shift();
          self.thumbs.push(self.data[end]);
        };

        self.prevImage = function () {
          start--;
          end--;

          validInd();
          self.thumbs.pop();
          self.thumbs.unshift(self.data[start]);
        };

        var validInd = function () {
          if (start > length-1) {
            start = 0;
          }
          if (end > length-1) {
            end = 0;
          }
          if (start < 0) {
            start = length-1;
          }
          if (end < 0) {
            end = length-1;
          }
        }

        var getFileId = function (fileId) {
          if (!fileId) fileId = 0;
          fileId += start;
          if (fileId > length-1)
          fileId -= length - 1;
          return fileId;
        }

        self.getFullImgPath = function (fileId, type) {
          if (!fullPath) return "";
          switch (type) {
            case "big" : type = "-big.jpg"; break;
            default : type = "-small.jpg"; break;
          }
          fileId = getFileId(fileId);
          return fullPath + self.data[fileId].fileId + type;
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