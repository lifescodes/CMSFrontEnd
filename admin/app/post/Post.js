(function() {
  'use strict';

  angular
  .module('app.post')
  .controller('Post', Post);

  Post.$inject = ['PostService', 'CategoryService', 'TagService', 'logger'];

  function Post(PostService, CategoryService, TagService, logger) {
    /*jshint validthis: true */
    var vm = this;
    vm.list = listPost;
    vm.get = getPost;
    vm.save = savePost;
    vm.edit = editPost;
    vm.update = updatePost;
    vm.delete = deletePost;
    vm.search = searchPost;

    vm.bulk = bulk;
    vm.bulkSelect = "action";
    vm.bulkCheck = false;
    vm.bulkCheckClick = bulkCheckClick;

    vm.listCategory = listCategory;
    vm.listTag = listTag;

    //for list
    vm.listdata = {
      post : [],
      category : [],
      tag : []
    };

    //for view model (ng-model)
    vm.tag = null;
    vm.category = null;
    vm.post = null;

    //pagination definition
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
      logger.info('Post View Activated');
      listPost(1);
      listCategory(1);
      listTag(1);

      console.log(vm.listdata);
    }

    function changePage(pos) {
      vm.page.current = pos;
      // vm.list = null;
      listPost(pos);
    }

    function nextPage() {
      if (vm.page.current < vm.page.total) {
        vm.page.current = vm.page.current + 1;
        // vm.list = null;
        listPost(vm.page.current);
      }
    }

    function prevPage() {
      if (vm.page.current > 1) {
        vm.page.current = vm.page.current - 1;
        // vm.list = null;
        listPost(vm.page.current);
      }
    }

    function countPage(count) {
      vm.page.total = Math.ceil((count / vm.page.limit));
      vm.page.totalArray = new Array(vm.page.total);
    }


    function listPost(current) {
      var ps = PostService.list();
      if (current !== undefined) {
        ps = PostService.list(current, vm.page.limit);
        vm.page.current = current;
      }

      ps.then(
        function(response) {
          vm.listdata.post = response;
          countPage(vm.listdata.post.meta.count); // pagination
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );
      return vm.listdata.post;
    }

    function getPost(id) {
      PostService.get(id).then(
        function(data) {
          return data;
        },
        function(error) {
          console.log(error);
          return error;
        }
      );
    }

    function savePost() {

    }

    function editPost(post) {
      vm.post = post;
      console.log(post);
    }

    function updatePost() {

    }


    function deletePost(post) {
      //remove from table in view
      var index = vm.listdata.post.indexOf(post);
      if (index > -1) vm.listdata.post.splice(index, 1);
      //remove from rest service
      var ps = PostService.delete(post.id);
      ps.then(
        function(response) {
          console.log('delete => ', response);
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );
    }

    function searchPost(){

    }


    function bulk() {
      console.log('bulkSelect=>',vm.bulkSelect);
      if (vm.bulkSelect === "delete") {
        vm.listdata.post.forEach(function(post) {
          if (post.isSelected) {
            deletePost(post);
            console.log('Post Selected =>',post);
          }
        });
      }
    }

    function bulkCheckClick() {
      vm.listdata.post.forEach(function(post) {
        post.isSelected = true;
      });
    }

    function listCategory() {
      var currentPage = 1;
      var limit = 100;
      var cs = CategoryService.tree(currentPage, limit);
      cs.then(
        function(response){
          vm.listdata.category = response;
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );

      return cs;
    }

    function listTag() {
      var ts = TagService.list();
      ts.then(
        function(response){
          vm.listdata.tag = response;
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );

      return ts;
    }

  }
})();
