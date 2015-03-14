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
        return BlogRest.all('post/list').getList();
      } else {
        return BlogRest.all('post/list').customGETLIST('', {
          page_limit: limit,
          page: num
        });
      }
    }

    function filter(object){
      return BlogRest.all('post').customGETLIST('filter',object);
    }

    function get(id) {
      return BlogRest.one('post', id).get();
    }


    function save(data) {
      return BlogRest.all('post').post(data);
    }

    function update(id, postedit) {
      var ps = BlogRest.one('post', id).get();
      ps.then(
        function(data) {
          var postdata = BlogRest.copy(data);
          postdata.title = postedit.title;
          postdata.slug = postedit.slug;
          postdata.content = postedit.content;
          postdata.status = postedit.status;
          postdata.modified = postedit.modified;
          postdata.save();
          console.log(postdata);
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
