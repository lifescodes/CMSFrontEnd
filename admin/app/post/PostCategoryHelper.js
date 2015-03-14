(function() {
  'use strict';

  angular
  .module('app.post')
  .factory('PostCategoryHelper', PostCategoryHelper);

  PostCategoryHelper.$inject = [
    'PostCategoryService','logger'
  ];

  function PostCategoryHelper(PostCategoryService, logger){
    /*jshint validthis: true */
    var service = {
      save: save
    };

    return service;

    function save(post, categories){
      categories.forEach(function(cat_id){
        checkPostCat(post.id, cat_id);
      });
    }

    function checkPostCat(post_id, cat_id){
      var object = {post: post_id, category: cat_id};
      var pcs = PostCategoryService.filter(object);
      pcs.then(
        function(response){
          console.log('updatePostCat  =>',response);
          if (response.meta.count === 0){ //3.a.1
            savePostCat(post_id, cat_id);
          }
        },
        function(response){
          console.log("Error with status code", response.status);
        }
      );
    }

    function savePostCat(post_id, cat_id){
      var object = {post: post_id, category: cat_id};
      var pcs = PostCategoryService.save(object);
      pcs.then(
        function(response){
          console.log('savePostCat =>',response);
        },
        function(response){
          console.log("Error with status code", response.status);
        }
      );
    }

  }


})();
