(function() {
  'use strict';

  angular
  .module('app.rest')
  .factory('PostService', PostService);

  PostService.$inject = ['BlogRest','exception','logger'];

  function PostService(BlogRest, exception, logger){
    /*jshint validthis: true */
    var service ={
      list: getListPost,
      get: getPost,
      search: searchPost,
      save: savePost,
      update: updatePost,
      delete: deletePost
    };
    return service;

    /* begin function */
    function getListPost(){
      return BlogRest.all('post').getList();
    }

    function getPost(id){
      return BlogRest.one('post',id).get();
    }


    function savePost(data){
      return BlogRest.all('post').post(data);
    }

    function updatePost(id, postedit){
      var ps = BlogRest.one('post',id).get();
      ps.then(
        function(data){
          var postdata = BlogRest.copy(data);
          postdata.title = postedit.title;
          postdata.slug = postedit.slug;
          postdata.content = postedit.content;
          postdata.status = postedit.status;
          postdata.modified  = postedit.modified;
          postdata.save();
          console.log(postdata);
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );

      return ps;
    }

    function deletePost(id){
      var ps = BlogRest.one('post',id).get();
      ps.then(
        function(post){
          post.remove();
        },
        function (response){
          console.log("Error with status code", response.status);
        }
      );

      return ps;
    }

    function searchPost(){

    }

  }
})();
