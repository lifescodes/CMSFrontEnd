(function() {
  'use strict';

  angular
    .module('app.rest')
    .factory('CategoryService', CategoryService);

  CategoryService.$inject = ['BlogRest', 'exception', 'logger'];

  function CategoryService(BlogRest, exception, logger) {
    /*jshint validthis: true */
    var vm = this;
    vm.list = [];
    var service = {
      tree : tree,
      list: list,
      get: get,
      search: search,
      save: save,
      update: update,
      remove: remove
    };

    return service;

    function tree(num, limit) {
      if (num === undefined) {
        return BlogRest.all('category-tree').getList();
      } else {
        return BlogRest.all('category-tree').customGETLIST('', {
          page_limit: limit,
          page: num
        });
      }
    }

    function list(num, limit) {
      if (num === undefined) {
        return BlogRest.all('category').getList();
      } else {
        return BlogRest.all('category').customGETLIST('', {
          page_limit: limit,
          page: num
        });
      }
    }

    function get(id) {
      return BlogRest.one('category', id).get();
    }

    function save(data) {
      return BlogRest.all('category').post(data);
    }

    function update(id, edit) {
      var ps = BlogRest.one('category', id).get();
      ps.then(
        function(data) {
          var cat = BlogRest.copy(data);
          cat.id = id;
          cat.name = edit.name;
          cat.descriptions = edit.descriptions;
          cat.counter = edit.counter;
          cat.put();
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );

      return ps;
    }

    function remove(id) {
      var cat = BlogRest.one('category', id).get();
      cat.then(
        function(response) {
          response.remove();
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );

      return cat;
    }

    function search() {

    }

  }
})();
