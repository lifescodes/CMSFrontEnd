(function() {
  'use strict';

  angular
  .module('app.post')
  .controller('PostList', PostList);

  PostList.$inject = [
    'PostService','CategoryService','TagService',
    'PostCountHelper','PostPaginator','PostGetService',
    'URLHelper','logger',
  ];

  function PostList(
    PostService, CategoryService, TagService,
    PostCountHelper, PostPaginator, PostGetService,
    URLHelper, logger
  ) {
    /*jshint validthis: true */
    var vm = this;

    // vm.list = list;
    vm.get = get;
    // vm.change = change;
    vm.edit = edit;
    vm.remove = remove;
    vm.search = search;
    vm.service = PostGetService;

    vm.listdata = [];

    vm.paginator = PostPaginator;


    /**
    * runnner
    */
    activate();
    function activate() {
      vm.paginator = PostPaginator;
      vm.paginator.init();
      initCountButton();
    }

    function initCountButton(){
      var limit = 1000;
      var helper = PostCountHelper;
      vm.count = helper.count(limit);
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
      vm.post = post;
      vm.service.set(vm.post);
      URLHelper.redirectTo("blog/post/edit/"+post.id);
    }

    function remove(post) {
      //remove from table in view
      var index = vm.paginator.data().indexOf(post);
      if (index > -1) vm.paginator.data().splice(index, 1);

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
        vm.listdata.forEach(function(post) {
          if (post.isSelected) {
            remove(post);
            console.log('Post Selected =>',post);
          }
        });
      }
    }

    function bulkCheckClick() {
      vm.listdata.forEach(function(post) {
        post.isSelected = true;
      });
    }



  }
})();
