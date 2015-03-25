(function() {
  'use strict';

  angular
  .module('app.post')
  .factory('MediaCountHelper', MediaCountHelper);

  MediaCountHelper.$inject = ['MediaFileService','logger'];

  function MediaCountHelper(MediaFileService, logger){
    /*jshint validthis: true */
    var vm = this;
    vm.count = {
      all:0,
      image:0,
      audio:0,
      video:0,
      other:0
    };
    var service = {
      all: all,
      image: image,
      audio: audio,
      video: video,
      other: other,
      count: count
    };

    return service;


    function all(limit){
      var mfs = MediaFileService.list(1,limit);
      var out;
      mfs.then(
        function(response){
          vm.count.all =  response.meta.count;
        }
      );

      return vm.count.all;
    }

    function image(limit){
      var filter = {file_type:'image', page_limit: limit};
      var mfs = MediaFileService.filter(filter);
      mfs.then(
        function(response){
          vm.count.image =  response.meta.count;
        }
      );

      return vm.count.image;
    }

    function audio(limit){
      var filter = {file_type:'audio',page_limit: limit};
      var mfs = MediaFileService.filter(filter);
      mfs.then(
        function(response){
          vm.count.audio =  response.meta.count;
        }
      );

      return vm.count.audio;
    }

    function video(limit){
      var filter = {file_type:'video',page_limit: limit};
      var mfs = MediaFileService.filter(filter);
      mfs.then(
        function(response){
          vm.count.video =  response.meta.count;
        }
      );

      return vm.count.video;
    }

    function other(limit){
      var filter = {file_type:'other',page_limit: limit};
      var mfs = MediaFileService.filter(filter);
      mfs.then(
        function(response){
          vm.count.other =  response.meta.count;
        }
      );

      return vm.count.other;
    }


    function count(limit){
      this.all(limit);
      this.image(limit);
      this.audio(limit);
      this.video(limit);
      this.other(limit);

      return vm.count;
    }

  }

})();
