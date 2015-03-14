(function() {
  'use strict';

  angular
  .module('app.post')
  .controller('PostForm', PostForm);

  PostForm.$inject = [
    'PostService', 'CategoryService', 'TagService',
    'PostTagHelper','PostCategoryHelper','PostGetService',
    'logger','$location'
  ];

  function PostForm(
    PostService, CategoryService, TagService,
    PostTagHelper, PostCategoryHelper, PostGetService,
    logger, $location
  ){
    /*jshint validthis: true */
    var vm = this;
    vm.save = save;
    vm.update = update;
    vm.listCat = listCat;
    vm.listTag = listTag;

    vm.listdata = {
      category: [],
      tag: []
    };

    vm.post = null;
    vm.tag = null;
    vm.category = null;

    vm.shared = PostGetService;

    vm.checkCategory = [];
    vm.selectedCategory = [];
    vm.selectCategory = selectCategory;


    /**
    * runnner
    */
    activate();
    function activate() {
      listCat();
      listTag();
    }

    function save() {
      vm.post.status = 0; //default for draft
      vm.post.user = 3;
      var cpost = angular.copy(vm.post);
      var ps = PostService.save(cpost);
      ps.then(
        function(response){
          var post = angular.copy(response);
          vm.post = post;

          // vm.listdata.post.push(post);

          PostTagHelper.save(post, vm.tag);
          PostCategoryHelper.save(post, vm.selectedCategory);
        },
        function(response){
          console.log("Error with status code", response.status);
        }
      );
    }

    function update(){

    }

    function selectCategory(id){
      vm.selectedCategory = [];
      vm.checkCategory.forEach(function(value,key){
        if (value === true){
          vm.selectedCategory.push(key);
        }
      });
      console.log(vm.selectedCategory);
    }

    vm.checkClick = checkClick;
    function checkClick(){
      console.log(vm.selectedCategory);
    }


    function publish(){

    }


    function listCat() {
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
