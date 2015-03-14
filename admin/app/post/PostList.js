(function() {
  'use strict';

  angular
  .module('app.post')
  .controller('PostList', PostList);

  PostList.$inject = [
    'PostService','CategoryService','TagService',
    'PostCountHelper','PostGetService','logger','$location'
  ];

  function PostList(
    PostService, CategoryService, TagService,
    PostCountHelper, PostGetService, logger, $location
  ) {
    /*jshint validthis: true */
    var vm = this;

    /**
    * Register Method
    */
    vm.list = list;
    vm.get = get;
    vm.edit = edit;
    vm.remove = remove;
    vm.search = search;

    vm.shared = PostGetService;

    /**
    * create storage for list object
    */
    vm.listdata = {
      post : [],
      category : [],
      tag : []
    };

    /**
    * create model for view
    */
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

    /**
    * runnner
    */
    activate();
    function activate() {
      list(1);
      doCount();
    }

    function doCount(){
      var limit = 1000;
      var helper = PostCountHelper;
      vm.count = helper.count(limit);
    }

    function changePage(pos) {
      vm.page.current = pos;
      list(pos);
    }

    function nextPage() {
      if (vm.page.current < vm.page.total) {
        vm.page.current = vm.page.current + 1;
        this.list(vm.page.current);
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

    function get(id) {
      PostService.get(id).then(
        function(response) {
          vm.post = response;
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );
    }



    function edit(post) {
      $location.path("blog/post/edit");
      vm.post = post;
      get(post.id);
      console.log(post);

    }


    function remove(post) {
      //remove from table in view
      var index = vm.listdata.post.indexOf(post);
      if (index > -1) vm.listdata.post.splice(index, 1);

      //remove from rest service
      var ps = PostService.remove(post.id);
      ps.then(
        function(response) {
          console.log('remove => ', response);
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );
    }


    function search(){

    }


    vm.bulk = bulk;
    vm.bulkSelect = "action";
    vm.bulkCheck = false;
    vm.bulkCheckClick = bulkCheckClick;

    function bulk() {
      console.log('bulkSelect=>',vm.bulkSelect);
      if (vm.bulkSelect === "delete") {
        vm.listdata.post.forEach(function(post) {
          if (post.isSelected) {
            remove(post);
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









  }
})();
