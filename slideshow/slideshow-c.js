'use strict';

angular.
  module('slideShow')
  .component('slideShow', {
    templateUrl: 'slideshow/slideshow.html',
    controller: ['$routeParams', 'GetData', function ($routeParams, GetData) {
        var self = this;
        self.fullPath = "";
        self.ind = {
          thumbLength : 7,
          length : 0,
          start : 0,
          end : 0,
          bigInd : 0,
          nextImage : function () {
            this.bigInd++;
            this.start++;
            this.end++;
            if (this.start > this.length-1) {
              this.start = 0;
            }
            if (this.end > this.length-1) {
              this.end = 0;
            }
            if (this.bigInd > this.length-1) {
              this.bigInd = 0;
            }

            self.thumbs.shift();
            self.thumbs.push(self.data[this.end]);

            console.log(this.start + " " + this.end);
          },
          prevImage : function () {
            this.start--;
            this.end--;
            this.bigInd--;
            if (this.start < 0) {
              this.start = this.length-1;
            }
            if (this.end < 0) {
              this.end = this.length-1;
            }
            if (this.bigInd < 0) {
              this.bigInd = this.length-1;
            }

            self.thumbs.pop();
            self.thumbs.unshift(self.data[this.start]);
            console.log(this.start + " " + this.end);
          }
        }

        self.getFileId = function (fileId) {
          if (!fileId) fileId = 0;
          fileId += self.ind.start;
          if (fileId > self.ind.length-1)
          fileId -= self.ind.length - 1;
          return fileId;
        }

        self.getFullPathSmall = function (fileId) {
          fileId = self.getFileId(fileId);
          return self.fullPath + self.data[fileId].fileId + "-small.jpg";
        }

        self.getFullPathBig = function (fileId) {
          fileId = self.getFileId(fileId);
          return self.fullPath + self.data[fileId].fileId + "-big.jpg";
        }

        self.setIndPath = function (path, filename) {
          self.ind.length = self.data.length;
          self.ind.end = self.data.length-1;
          if (self.ind.end > self.ind.thumbLength-1) self.ind.end = self.ind.thumbLength-1;
          self.fullPath = path + filename;
        }

        self.db = GetData.get({filename: $routeParams.pageId}, function(images) {
          self.data = images.data;
          self.setIndPath(images.path, images.filename);
        	self.thumbs = images.data.slice(self.ind.start, self.ind.end);
        });

        self.closePopUp = function(){
          self.showPopUpMsg = false;
        }

        self.showPopUpMsg = false;

        self.openPopUp = function( fileId ) {
          self.ind.bigInd = fileId;
          self.showPopUpMsg = true;
        }

        self.nextBigImage = function () {
          self.ind.nextImage();
        }

      }
    ]
  });