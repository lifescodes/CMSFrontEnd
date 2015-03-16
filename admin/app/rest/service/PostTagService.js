(function() {
  'use strict';

  angular
  .module('app.rest')
  .factory('PostTagService', PostTagService);

  PostTagService.$inject = ['BlogRest', 'exception', 'logger'];

  function PostTagService(BlogRest, exception, logger) {
    /*jshint validthis: true */
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

    /* begin function */
    function list(num, limit) {
      if (num === undefined) {
        return BlogRest.all('posttag').getList();
      } else {
        return BlogRest.all('posttag').customGETLIST('', {
          page_limit: limit,
          page: num
        });
      }
    }

    function filter(object){
      return BlogRest.all('posttag').customGETLIST('filter',object);
    }

    function get(id) {
      return BlogRest.one('posttag', id).get();
    }

    function save(data) {
      return BlogRest.all('posttag').post(data);
    }

    function update(id, edit) {
      var ps = BlogRest.one('posttag', id).get();
      ps.then(
        function(data) {
          var tagdata = BlogRest.copy(data);
          tagdata.post = edit.post;
          tagdata.tag = edit.tag;
          tagdata.put();
          console.log(tagdata);
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );

      return ps;
    }

    function remove(id) {
      var ps = BlogRest.one('posttag', id).get();
      ps.then(
        function(posttag) {
          posttag.remove();
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );

      return ps;
    }

    function search() {

    }

  }
})();
