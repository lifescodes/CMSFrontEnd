(function() {
  'use strict';

  angular
  .module('app.rest')
  .factory('PostService', PostService);

  PostService.$inject = ['BlogRest', 'exception', 'logger'];

  function PostService(BlogRest, exception, logger) {
    /*jshint validthis: true */
    var service = {
      list: list,
      filter: filter,
      get: get,
      save: save,
      update: update,
      remove: remove,
      search: search
    };
    return service;

    /* begin function */
    function list(num, limit) {
      if (num === undefined) {
        return BlogRest.all('postrelated').getList();
      } else {
        return BlogRest.all('postrelated').customGETLIST('', {
          page_limit: limit,
          page: num
        });
      }
    }

    function filter(object){
      return BlogRest.all('post').customGETLIST('filter',object);
    }

    function get(id) {
      return BlogRest.one('postrelated', id).get();
    }


    function save(data) {
      return BlogRest.all('post').post(data);
    }

    function update(id, edit) {
      var ps = BlogRest.one('post', id).get();
      ps.then(
        function(data) {
          var postdata = BlogRest.copy(data);
          postdata.title = edit.title;
          postdata.slug = edit.slug;
          postdata.content = edit.content;
          postdata.status = edit.status;
          postdata.modified = edit.modified;
          postdata.put();
          console.log('PostService.update ',postdata);
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );

      return ps;
    }

    function remove(id) {
      var ps = BlogRest.one('post', id).get();
      ps.then(
        function(post) {
          post.remove();
          console.log('PostService.remove',post);
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
