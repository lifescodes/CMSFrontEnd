(function() {
  'use strict';

  angular
    .module('app.tag')
    .controller('Tag', Tag);

  Tag.$inject = ['TagService', 'logger'];

  function Tag(TagService, logger) {
    /*jshint validthis: true */
    var vm = this;
    vm.list = list;
    vm.get = get;
    vm.saveOrUpdate = saveOrUpdate;
    vm.save = save;
    vm.edit = edit;
    vm.update = update;
    vm.remove = remove;
    vm.search = search;

    vm.listdata = [];
    vm.tag = {};

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
      list(1);
    }

    function changePage(pos) {
      vm.page.current = pos;
      list(pos);
    }

    function nextPage() {
      if (vm.page.current < vm.page.total) {
        vm.page.current = vm.page.current + 1;
        list(vm.page.current);
      }
    }

    function prevPage() {
      if (vm.page.current > 1) {
        vm.page.current = vm.page.current - 1;
        list(vm.page.current);
      }
    }

    function countPage(count) {
      vm.page.total = Math.ceil((count / vm.page.limit));
      vm.page.totalArray = new Array(vm.page.total);
    }

    function list(current) {
      var ts = TagService.list();
      if (current !== undefined) {
        ts = TagService.list(current, vm.page.limit);
        vm.page.current = current;
      }

      ts.then(
        function(response) {
          vm.listdata = response;
          countPage(vm.listdata.meta.count); // pagination
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );
      return vm.list;
    }


    function get(id) {
      TagService.get(id).then(
        function(response) {
          vm.tag = response;
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );

    }

    function saveOrUpdate() {
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
          vm.listdata.push(object);
          vm.tag = null;
          countPage(vm.listdata.meta.count); //pagination
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
          vm.tag = null;
          console.log('Tag.update ', object);
          logger.success('Tag Updated Success!');
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );
    }

    function edit(tag) {
      vm.tag = tag;
      console.log(tag);
    }

    function remove(tag) {
      //remove from table in view
      var index = vm.listdata.indexOf(tag);
      if (index > -1) vm.listdata.splice(index, 1);
      //remove from rest service
      var tagsv = TagService.remove(tag.id);
      tagsv.then(
        function(response) {
          console.log('Tag.delete ', response);
          logger.info('Tag Deleted Success!');
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );
    }

    function bulk() {
      logger.info(vm.bulkSelect);
      if (vm.bulkSelect === "delete") {
        vm.listdata.forEach(function(tag) {
          if (tag.isSelected) {
            console.log(tag);
            deleteTag(tag);
          }
        });
      }

    }

    function search(keyword) {

    }

    function resetForm() {
      vm.tag.id = '';
      vm.tag.name = '';
      vm.tag.descriptions = '';
    }


  }
})();
