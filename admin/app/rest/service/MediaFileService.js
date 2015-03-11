(function() {
  'use strict';

  angular
    .module('app.rest')
    .factory('MediaFileService', MediaFileService);

  MediaFileService.$inject = ['MediaRest', 'exception', 'logger'];

  function MediaFileService(MediaRest, exception, logger) {
    /*jshint validthis: true */
    var vm = this;
    vm.list = [];
    var service = {
      list: getListMedia,
      listFilter: getListFilter,
      get: getMedia,
      search: searchMedia,
      save: saveMedia,
      update: updateMedia,
      delete: deleteMedia
    };

    return service;

    function getListMedia(num, limit) {
      if (num === undefined) {
        return MediaRest.all('file').getList();
      } else {
        return MediaRest.all('file').customGETLIST('', {
          page_limit: limit,
          page: num
        });
      }
    }

    function getListFilter(object){
      return MediaRest.all('file').customGETLIST('filter',object);
    }

    function getMedia(id) {
      return MediaRest.one('file', id).get();
    }

    function saveMedia(data) {
      return MediaRest.all('file').post(data);
    }

    function updateMedia(id, mediaedit) {
      var ps = MediaRest.one('file', id).get();
      ps.then(
        function(data) {
          var mediadata = MediaRest.copy(data);
          mediadata.id = id;
          mediadata.name = mediaedit.name;
          mediadata.descriptions = mediaedit.descriptions;
          mediadata.put();
          console.log(mediadata);
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );

      return ps;
    }

    function deleteMedia(id) {
      var tg = MediaRest.one('file', id).get();
      tg.then(
        function(media) {
          media.remove();
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );

      return tg;
    }

    function searchMedia() {

    }

  }
})();
