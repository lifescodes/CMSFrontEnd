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
      list: list,
      get: get,
      filter: filter,
      save: save,
      update: update,
      remove: remove,
      search: search
    };

    return service;

    function list(num, limit) {
      if (num === undefined) {
        return BlogRest.all('tag').getList();
      } else {
        return BlogRest.all('tag').customGETLIST('', {
          page_limit: limit,
          page: num
        });
      }
    }

    function filter(object){
      return BlogRest.all('tag').customGETLIST('filter',object);
    }

    function get(id) {
      return BlogRest.one('tag', id).get();
    }

    function save(data) {
      return BlogRest.all('tag').post(data);
    }

    function update(id, tagedit) {
      var ps = BlogRest.one('tag', id).get();
      ps.then(
        function(data) {
          var tagdata = BlogRest.copy(data);
          tagdata.id = id;
          tagdata.name = tagedit.name;
          tagdata.descriptions = tagedit.descriptions;
          tagdata.counter = tagedit.counter;
          tagdata.put();
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );

      return ps;
    }

    function remove(id) {
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

    function search() {

    }

  }
})();
