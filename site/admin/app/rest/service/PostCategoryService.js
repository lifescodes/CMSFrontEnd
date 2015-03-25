(function() {
  'use strict';

  angular
    .module('app.rest')
    .factory('PostCategoryService', PostCategoryService);

  PostCategoryService.$inject = ['BlogRest', 'exception', 'logger'];

  function PostCategoryService(BlogRest, exception, logger) {
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
        return BlogRest.all('postcategory').getList();
      } else {
        return BlogRest.all('postcategory').customGETLIST('', {
          page_limit: limit,
          page: num
        });
      }
    }

    function filter(object){
      return BlogRest.all('postcategory').customGETLIST('filter',object);
    }

    function get(id) {
      return BlogRest.one('postcategory', id).get();
    }

    function save(data) {
      return BlogRest.all('postcategory').post(data);
    }

    function update(id, edit) {
      var pc = BlogRest.one('postcategory', id).get();
      pc.then(
        function(data) {
          var postcat = BlogRest.copy(data);
          postcat.title = edit.title;
          postcat.slug = edit.slug;
          postcat.content = edit.content;
          postcat.status = edit.status;
          postcat.modified = edit.modified;
          postcat.put();
          console.log('PostCategoryService.update',postcat);
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );

      return pc;
    }

    function remove(id) {
      var pc = BlogRest.one('postcategory', id).get();
      pc.then(
        function(response) {
          response.remove();
          console.log('PostCategoryService.remove',response);
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );

      return pc;
    }

    function search() {

    }

  }
})();
