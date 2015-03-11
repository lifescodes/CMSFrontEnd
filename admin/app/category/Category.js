(function() {
  'use strict';

  angular
  .module('app.category')
  .controller('Category', Category);

  Category.$inject = ['CategoryService', 'logger'];

  function Category(CategoryService, logger) {
    /*jshint validthis: true */
    var vm = this;

    vm.list = listCategory;
    vm.get = getCategory;
    vm.save = saveCategory;
    vm.edit = editCategory;
    // vm.update = updateCategory;
    vm.delete = deleteCategory;
    vm.search = searchCategory;


    vm.tree = { "children" : [] };
    vm.listdata = {};

    //base form model
    vm.category = {
      id:undefined,
      name:undefined,
      parent:undefined,
      descriptions: undefined,
      counter:undefined
    };

    vm.resetForm = resetForm;

    vm.bulk = bulk;
    vm.bulkSelect = "action";

    vm.changePage = changePage;
    vm.prevPage = prevPage;
    vm.nextPage = nextPage;
    vm.page = {
      limit: 21,
      current: 1,
      total: 1,
      totalArray: [],
    };

    activate();

    function activate() {
      listCategory(1);
      listCategoryTree(1);
      console.log('List =>',vm.listdata);
      console.log('Tree =>',vm.tree);

    }

    function changePage(pos) {
      vm.page.current = pos;
      // vm.list = null;
      listCategory(pos);
    }


    function nextPage() {
      if (vm.page.current < vm.page.total) {
        vm.page.current = vm.page.current + 1;
        // vm.list = null;
        listCategory(vm.page.current);
      }
    }

    function prevPage() {
      if (vm.page.current > 1) {
        vm.page.current = vm.page.current - 1;
        // vm.list = null;
        listCategory(vm.page.current);
      }
    }

    function countPage(count) {
      vm.page.total = Math.ceil((count / vm.page.limit));
      vm.page.totalArray = new Array(vm.page.total);
    }


    function listCategoryTree(pos){
      var ls = CategoryService.tree();
      if (pos !== undefined) {
        ls = CategoryService.tree(pos, vm.page.limit);
        vm.page.current = pos;
      }

      ls.then(
        function(response) {
          vm.tree.children = response;
          vm.listcat = response;
          countPage(vm.listdata.meta.count); // pagination
        },
        function(error) {
          console.log(error);
        }
      );
      return vm.list;
    }

    function listCategory(pos) {
      var ls = CategoryService.list();
      if (pos !== undefined) {
        ls = CategoryService.list(pos, vm.page.limit);
        vm.page.current = pos;
      }

      ls.then(
        function(response) {
          vm.list = response;
          vm.listdata = response;
          countPage(vm.list.meta.count); // pagination
        },
        function(error) {
          console.log(error);
        }
      );
      return vm.list;
    }


    function getCategory(id) {
      CategoryService.get(id).then(
        function(data) {
          return data;
        },
        function(error) {
          console.log(error);
          return error;
        }
      );
    }

    function saveCategory() {
      if (vm.category.id === undefined || vm.category.id === null) {
        save();
        changePage(vm.page.total);
        // listCategoryTree(1);
      } else {
        update();
        listCategoryTree(1);
      }
    }

    function save() {
      var cCategory = angular.copy(vm.category);
      var sCategory = CategoryService.save(cCategory);
      console.log('save data => ',cCategory);
      sCategory.then(
        function(data) {
          var object = angular.copy(data);
          vm.tree.children.push(object);
          vm.listdata.push(object);
          vm.category = null;
          countPage(vm.list.meta.count); //pagination
          logger.success('Category Saved Success!');
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );
    }

    function update() {
      var cCategory = angular.copy(vm.category);
      var uCategory = CategoryService.update(vm.category.id, cCategory);
      uCategory.then(
        function(data) {
          var object = angular.copy(data);
          console.log('update ', object);
          vm.category = null;
          logger.success('Category Updated Success!');
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );
    }

    function editCategory(category) {
      // vm.category.id = category.id;
      // vm.category.name = category.name;
      // vm.category.parent = category.parent;
      // vm.category.descriptions = category.descriptions;
      // vm.category.counter = category.counter;
      vm.category = category;

      console.log(category);
    }

    function deleteCategory(category) {
      //remove from table in view
      var index = vm.tree.children.indexOf(category);
      if (index > -1) vm.tree.children.splice(index, 1);
      //remove from rest service
      var Categorysv = CategoryService.delete(category.id);
      Categorysv.then(
        function(response) {
          console.log('delete => ', response);
          logger.success('Category Delete Success!');
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );
    }

    function bulk() {
      logger.info(vm.bulkSelect);
      if (vm.bulkSelect === "delete") {
        vm.list.forEach(function(Category) {
          if (Category.isSelected) {
            console.log(Category);
            deleteCategory(Category);
          }
        });
      }

    }

    function searchCategory(keyword) {

    }

    function resetForm() {
      vm.category.id = undefined;
      vm.category.name = undefined;
      vm.category.parent = undefined;
      vm.category.descriptions = undefined;
      vm.category.counter = undefined;
      // vm.category = null;
    }





  }
})();
