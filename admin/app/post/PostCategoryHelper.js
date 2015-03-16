(function() {
  'use strict';

  angular
  .module('app.post')
  .factory('PostCategoryHelper', PostCategoryHelper);

  PostCategoryHelper.$inject = [
    'PostCategoryService','CategoryService','logger'
  ];

  function PostCategoryHelper(PostCategoryService, CategoryService, logger){
    /*jshint validthis: true */
    var vm = this;
    vm.list = [];
    var service = {
      save: save,
      update: update
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
          console.log('PostCategoryHelper.savePostCat',response);
        },
        function(response){
          console.log("Error with status code", response.status);
        }
      );
    }

    function update(post, categories){
      var filter = {post: post.id, page_limit: 1000};
      var pts = PostCategoryService.filter(filter);
      pts.then(
        function(response){
          vm.list = response;

          //==========================
          var dbCat = [];
          vm.list.forEach(function(catObj){
            dbCat.push(catObj.category);
            // console.log(catObj.category);
          });
          var inCat = catClean(categories);
          var stay = _.intersection(dbCat, inCat);
          var removed = _.difference(dbCat, inCat);
          var added = _.xor(removed, _.xor(dbCat, inCat));
          //=============================

          console.log('dbCat', dbCat);
          console.log('inCat', inCat);
          console.log('stay',stay);
          console.log('removed',removed);
          console.log('added',added);

          //Remove Unselected Category
          //=======================================
          removed.forEach(function(delCat){
            var filter = {category: delCat};
            var pcs = PostCategoryService.filter(filter);
            pcs.then(
              function(response){
                var pc = response[0];
                //remove
                var rm = PostCategoryService.remove(pc.id);
                rm.then(
                  function(response){},
                  function(response){ console.log("Error", response.status);}
                );
              },
              function(response){
                console.log("Error with status code", response.status);
              }
            );
          });
          //=======================================

          //Save New Related Category
          //============================
          added.forEach(function(cat){
              savePostCat(post.id, cat);
          });
          //==============================

        },
        function(response){
          console.log("Error with status code", response.status);
        }
      );
    }

    function catClean(catDirt){
      var clean = [];
      catDirt.forEach(function(key, value){
        if (key===true){
          clean.push(value);
        }

      });

      return clean;
    }

  }


})();
