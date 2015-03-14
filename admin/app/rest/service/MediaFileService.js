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
      list: list,
      filter: filter,
      get: get,
      search: search,
      save: save,
      update: update,
      remove: remove
    };

    return service;

    function list(num, limit) {
      if (num === undefined) {
        return MediaRest.all('file').getList();
      } else {
        return MediaRest.all('file').customGETLIST('', {
          page_limit: limit,
          page: num
        });
      }
    }

    function filter(object){
      return MediaRest.all('file').customGETLIST('filter',object);
    }

    function get(id) {
      return MediaRest.one('file', id).get();
    }

    function save(data) {
      return MediaRest.all('file').post(data);
    }

    function update(id, mediaedit) {
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

    function remove(id) {
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

    function search() {

    }

  }
})();
