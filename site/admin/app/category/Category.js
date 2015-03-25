(function() {
  'use strict';

  angular
  .module('app.category')
  .controller('Category', Category);

  Category.$inject = ['CategoryService', 'CategoryPaginator', 'logger'];

  function Category(CategoryService, CategoryPaginator, logger) {
    /*jshint validthis: true */
    var vm = this;

    // vm.list = list;
    vm.get = get;
    vm.save = save;
    vm.edit = edit;
    vm.update = update;
    vm.remove = remove;
    vm.search = search;


    vm.paginator = CategoryPaginator;

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

    activate();
    function activate() {
      vm.paginator = CategoryPaginator;
      vm.paginator.init();
    }


    function get(id) {
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


    function save() {
      vm.category.counter = 0;
      var cCategory = angular.copy(vm.category);
      var sCategory = CategoryService.save(cCategory);
      console.log('save data => ',cCategory);
      sCategory.then(
        function(data) {
          var object = angular.copy(data);
          vm.paginator.tree().children.push(object);
          vm.paginator.data().push(object);
          vm.category = null;
          vm.paginator.change(vm.paginator.total());
          logger.success('Category Saved Success!');
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );
    }

    function update() {
      var ccat = angular.copy(vm.category);
      var ucat = CategoryService.update(vm.category.id, ccat);
      ucat.then(
        function(data) {
          var object = angular.copy(data);
          vm.category = null;
          console.log('update ', object);
          logger.success('Category Updated Success!');
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );
    }

    function edit(category) {
      // vm.category.id = category.id;
      // vm.category.name = category.name;
      // vm.category.parent = category.parent;
      // vm.category.descriptions = category.descriptions;
      // vm.category.counter = category.counter;
      vm.category = category;

      console.log(category);
    }

    function remove(category) {
      //remove from select option view
      var index = vm.paginator.data().indexOf(category);
      if (index > -1) vm.paginator.data().splice(index, 1);

      var tree = vm.paginator.tree().children.indexOf(category);
      if (tree > -1) vm.paginator.tree().children.splice(index, 1);

      //remove from rest service
      var cs = CategoryService.remove(category.id);
      cs.then(
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
        vm.paginator.data().forEach(function(category) {
          if (category.isSelected) {
            console.log(category);
            deleteCategory(category);
          }
        });
      }
    }

    function search(keyword) {

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
