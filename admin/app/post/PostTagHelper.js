(function() {
  'use strict';

  angular
  .module('app.post')
  .factory('PostTagHelper', PostTagHelper);

  PostTagHelper.$inject = [
    'PostTagService','TagService','logger'
  ];

  function PostTagHelper(PostTagService, TagService, logger){
    /*jshint validthis: true */
    var vm = this;
    // vm.list = {};

    var service = {
      save: save,
      update: update
    };
    return service;



    /**
    * 1. cek pada setiap tag yang di inputkan, apakah sama dengan yang ada pada database
    * 2. jika tidak sama maka save tag tersebut
    *    2.a. simpan relasi antar post dan tag pada table blog_post_tag
    * 3. jika sama maka update tag tersebut dengan menambahkan counter nya
    *    3.a. check pada apakah post telah berlasi dengan tag yang di update
    *         3.a.1. jika tidak maka relasikan dengan post tag pada tabel blog_post_tag
    */
    function save(post, tags){
      if (tags.length > 0){
        tags.forEach(function(object){ //looping tiap tag
          var tag = {name: object.text};
          var ts = TagService.filter(tag); //check tag ke service database
          ts.then(
            function(response){
              if (response.meta.count === 0){ //data tidak ada pada database
                saveTag(post, tag);
              } else { //data ada pada database
                updateTag(post, response[0]); //update tag
              }
            },
            function(response){
              console.log("Error with status code", response.status);
            }
          );
        });
      }
    }

    function saveTag(post, tag){
      tag.counter = 1;
      var ts = TagService.save(tag);
      ts.then(
        function(response){
          tag = response;
          savePostTag(post.id, tag.id);
        },
        function(response){
          console.log("Error with status code", response.status);
        }
      );
    }

    function savePostTag(post_id, tag_id){
      var object = {post: post_id, tag: tag_id};
      var pts = PostTagService.save(object);
      pts.then(
        function(response){
          console.log('savePostTag =>',response);
        },
        function(response){
          console.log("Error with status code", response.status);
        }
      );
    }


    function update(post, tags){
      var filter = {post: post.id, page_limit: 1000};
      var pts = PostTagService.filter(filter);
      pts.then(
        function(response){
          vm.list = response;

          //==================
          var dbTag = [];
          vm.list.forEach(function(tagObj){
            dbTag.push(tagObj.tag);
            // console.log(tagObj.tag);
          });
          var inTag = tagsArray(tags);
          var diff = _.difference(dbTag, inTag);
          //===================

          // console.log('dbTag', dbTag);
          // console.log('inTag', inTag);
          // console.log('diff',diff);

          //Remove Tag
          //===========================
          diff.forEach(function(delTag){
            var filter = {tag: delTag};
            var pts = PostTagService.filter(filter);
            var pt = {};
            pts.then(
              function(response){
                pt = response[0];
                //remove
                var rm = PostTagService.remove(pt.id);
                rm.then(
                  function(response){console.dir(response);},
                  function(response){ console.log("Error", response.status);}
                );
              },
              function(response){
                console.log("Error with status code", response.status);
              }
            );
          });
          //==============================

          //Save New Tag
          //============================
          tags.forEach(function(obj){
            if (obj.id === undefined){
              var tag = { name: obj.text };
                saveTag(post, tag);
            }
          });
          //==============================

        },
        function(response){
          console.log("Error with status code", response.status);
        }
      );
    }

    function tagsArray(tags){
      var ar = [];
      tags.forEach(function(hb){ //looping tiap tag
        ar.push(hb.id);
      });
      return ar;
    }

    function list(post){
      var filter = {post: post.id, page_limit: 1000};
      var pts = PostTagService.filter(filter);
      pts.then(
        function(response){
          vm.list = response;
          return response;
        },
        function(response){
          console.log("Error with status code", response.status);
        }
      );
      return pts;
    }


    function updateTag(post, tag){
      if (tag.counter === null || tag.counter === 0){
        tag.counter = 1;
      }
      tag.counter = tag.counter + 1;
      var ts = TagService.update(tag.id, tag);
      ts.then(
        function(response){
          tag = response;
          updatePostTag(post.id, tag.id);
        },
        function(response){
          console.log("Error with status code", response.status);
        }
      );
    }

    function updatePostTag(post_id, tag_id){
      var object = {post: post_id, tag: tag_id};
      var pts = PostTagService.filter(object);
      pts.then(
        function(response){
          var out = response;
          if (response.meta.count === 0){ //3.a.1
            savePostTag(post_id, tag_id);
          }
        },
        function(response){
          console.log("Error with status code", response.status);
        }
      );
    }
  }


})();
