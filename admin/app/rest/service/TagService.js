(function() {
  'use strict';

  angular
    .module('app.rest')
    .factory('TagService', TagService);

  TagService.$inject = ['BlogRest', 'exception', 'logger'];

  function TagService(BlogRest, exception, logger) {
    /*jshint validthis: true */
    var vm = this;
    vm.list = [];
    var service = {
      list: getListTag,
      get: getTag,
      search: searchTag,
      save: saveTag,
      update: updateTag,
      delete: deleteTag
    };

    return service;

    function getListTag(num, limit) {
      if (num === undefined) {
        return BlogRest.all('tag').getList();
      } else {
        return BlogRest.all('tag').customGETLIST('', {
          page_limit: limit,
          page: num
        });
      }
    }

    function getTag(id) {
      return BlogRest.one('tag', id).get();
    }

    function saveTag(data) {
      return BlogRest.all('tag').post(data);
    }

    function updateTag(id, tagedit) {
      var ps = BlogRest.one('tag', id).get();
      ps.then(
        function(data) {
          var tagdata = BlogRest.copy(data);
          tagdata.id = id;
          tagdata.name = tagedit.name;
          tagdata.descriptions = tagedit.descriptions;
          // tagdata.counter = tagedit.counter;
          // tagdata.modified = tagedit.modified;
          tagdata.put();
          console.log(tagdata);
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );

      return ps;
    }

    function deleteTag(id) {
      var tg = BlogRest.one('tag', id).get();
      tg.then(
        function(tag) {
          tag.remove();
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );

      return tg;
    }

    function searchTag() {

    }

  }
})();