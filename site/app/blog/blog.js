(function() {
  'use strict';

  angular
  .module('app.blog')
  .controller('Blog',Blog);

  Blog.$inject = ['PostService', 'logger'];

  function Blog(PostService, logger){
    /*jshint validthis: true */
    var vm = this;
    vm.getPost = getPost;
    // vm.getCategory = getCategory;
    // vm.getTag = getTag;

    vm.listPost = [];
    vm.listCategory = [];
    vm.listTag = [];

    activate();

    function activate() {
      getPost().then(
        function(data){
          vm.listPost = data;
        },
        function(error){
          console.log(error);
        }
      );

      var edit = {
        id:3,
        user:1,
        title: 'Test Post From Angularjs',
        slug: 'Slug From Angularjs',
        content: 'This content is from <b>AngularJS</b>',
        status: 1,
      };
      PostService.save(edit);

      // PostService.delete(1);



      // getCategory().then(function(data){
      //   vm.listCategory = data;
      // });
      //
      // getTag().then(function(data){
      //   vm.listTag = data;
      // });
    }

    function getPost(){
      return PostService.list();
    }

    // function getCategory(){
    //   return BlogRest.all('category').getList();
    // }
    //
    // function getTag(){
    //   return BlogRest.all('tag').getList();
    // }

  }
})();
