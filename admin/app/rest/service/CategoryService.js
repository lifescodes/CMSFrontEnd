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
      tree : getListTree,
      list: getListCategory,
      get: getCategory,
      search: searchCategory,
      save: saveCategory,
      update: updateCategory,
      delete: deleteCategory
    };

    return service;

    function getListTree(num, limit) {
      if (num === undefined) {
        return BlogRest.all('category-tree').getList();
      } else {
        return BlogRest.all('category-tree').customGETLIST('', {
          page_limit: limit,
          page: num
        });
      }
    }

    function getListCategory(num, limit) {
      if (num === undefined) {
        return BlogRest.all('category').getList();
      } else {
        return BlogRest.all('category').customGETLIST('', {
          page_limit: limit,
          page: num
        });
      }
    }

    function getCategory(id) {
      return BlogRest.one('category', id).get();
    }

    function saveCategory(data) {
      return BlogRest.all('category').post(data);
    }

    function updateCategory(id, catedit) {
      var ps = BlogRest.one('category', id).get();
      ps.then(
        function(data) {
          var catdata = BlogRest.copy(data);
          catdata.id = id;
          catdata.name = catedit.name;
          catdata.descriptions = catedit.descriptions;
          catdata.counter = catedit.counter;
          catdata.put();
          console.log(catdata);
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );

      return ps;
    }

    function deleteCategory(id) {
      var cat = BlogRest.one('category', id).get();
      cat.then(
        function(category) {
          category.remove();
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );

      return cat;
    }

    function searchCategory() {

    }

  }
})();
