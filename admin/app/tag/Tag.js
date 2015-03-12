(function() {
  'use strict';

  angular
    .module('app.tag')
    .controller('Tag', Tag);

  Tag.$inject = ['TagService', 'logger'];

  function Tag(TagService, logger) {
    /*jshint validthis: true */
    var vm = this;
    vm.list = listTag;
    vm.get = getTag;
    vm.save = saveTag;
    vm.edit = editTag;
    // vm.update = updateTag;
    vm.delete = deleteTag;
    vm.search = searchTag;

    vm.bulk = bulk;
    vm.bulkSelect = "action";

    vm.changePage = changePage;
    vm.prevPage = prevPage;
    vm.nextPage = nextPage;
    vm.page = {
      limit: 6,
      current: 1,
      total: 1,
      totalArray: [],
    };

    activate();

    function activate() {
      listTag(1);

    }

    function changePage(pos) {
      vm.page.current = pos;
      // vm.list = null;
      listTag(pos);
    }


    function nextPage() {
      if (vm.page.current < vm.page.total) {
        vm.page.current = vm.page.current + 1;
        // vm.list = null;
        listTag(vm.page.current);
      }
    }

    function prevPage() {
      if (vm.page.current > 1) {
        vm.page.current = vm.page.current - 1;
        // vm.list = null;
        listTag(vm.page.current);
      }
    }

    function countPage(count) {
      vm.page.total = Math.ceil((count / vm.page.limit));
      vm.page.totalArray = new Array(vm.page.total);
    }


    function listTag(pos) {
      var ls = TagService.list();
      if (pos !== undefined) {
        ls = TagService.list(pos, vm.page.limit);
        vm.page.current = pos;
      }

      ls.then(
        function(response) {
          vm.list = response;
          countPage(vm.list.meta.count); // pagination
        },
        function(error) {
          console.log(error);
        }
      );
      return vm.list;
    }


    function getTag(id) {
      TagService.get(id).then(
        function(data) {
          return data;
        },
        function(error) {
          console.log(error);
          return error;
        }
      );
    }

    function saveTag() {
      if (vm.tag.id === undefined) {
        save();
        changePage(vm.page.total);
      } else {
        update();
      }
    }

    function save() {
      var ctag = angular.copy(vm.tag);
      var stag = TagService.save(ctag);
      stag.then(
        function(data) {
          var object = angular.copy(data);
          vm.list.push(object);
          vm.tag = null;
          countPage(vm.list.meta.count); //pagination
          logger.success('Tag Saved Success!');
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );
    }

    function update() {
      var ctag = angular.copy(vm.tag);
      var utag = TagService.update(vm.tag.id, ctag);
      utag.then(
        function(data) {
          var object = angular.copy(data);
          console.log('update ', object);
          vm.tag = null;
          logger.success('Tag Updated Success!');
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );
    }

    function editTag(tag) {
      vm.tag = tag;
      console.log(tag);
    }

    function deleteTag(tag) {
      //remove from table in view
      var index = vm.list.indexOf(tag);
      if (index > -1) vm.list.splice(index, 1);
      //remove from rest service
      var tagsv = TagService.delete(tag.id);
      tagsv.then(
        function(response) {
          console.log('delete => ', response);
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );
    }

    function bulk() {
      logger.info(vm.bulkSelect);
      if (vm.bulkSelect === "delete") {
        vm.list.forEach(function(tag) {
          if (tag.isSelected) {
            console.log(tag);
            deleteTag(tag);
          }
        });
      }

    }

    function searchTag(keyword) {

    }

    function resetForm() {
      vm.tag.id = '';
      vm.tag.name = '';
      vm.tag.descriptions = '';
    }


  }
})();
