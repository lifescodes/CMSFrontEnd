(function() {
  'use strict';

  angular
  .module('app.rest')
  .factory('CategoryService', CategoryService);

  CategoryService.$inject = ['BlogRest','exception','logger'];

  function CategoryService(BlogRest, exception, logger){
    /*jshint validthis: true */
    var vm = this;
    vm.list = [];
    var service ={
      list: getListCategory,
      get: getCategory,
      search: searchCategory,
      save: saveCategory,
      update: updateCategory,
      delete: deleteCategory
    };

    return service;

    function getListCategory(){
      return BlogRest.all('category').getList();
    }

    function getCategory(id){
      return BlogRest.one('category',id).get();
    }

    function saveCategory(data){
      return BlogRest.all('category').post(data);
    }

    function updateCategory(id, catedit){
      var ps = BlogRest.one('post',id).get();
      ps.then(
        function(data){
          var catdata = BlogRest.copy(data);
          
          catdata.put();
          console.log(postdata);
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );

      return ps;
    }

    function deleteCategory(){

    }

    function searchCategory(){

    }

  }
})();
