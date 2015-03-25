(function() {
  'use strict';

  angular
  .module('app.post')
  .factory('PostCountHelper', PostCountHelper);

  PostCountHelper.$inject = ['PostService','logger'];

  function PostCountHelper(PostService, logger){
    /*jshint validthis: true */
    var vm = this;
    vm.count = {
      all: 0,
      publish: 0,
      draft: 0
    };

    var service = {
      all: all,
      publish: publish,
      draft: draft,
      count: count
    };

    return service;


    function all(limit){
      var ps = PostService.list(1, limit);
      ps.then(
        function(response){
          vm.count.all = response.meta.count;
        }
      );
    }

    function publish(limit){
      var filter = {status: 1, page_limit: limit};
      var ps = PostService.filter(filter);
      ps.then(
        function(response){
          vm.count.publish = response.meta.count;
        }
      );
    }

    function draft(limit){
      var filter = {status: 0, page_limit: limit};
      var ps = PostService.filter(filter);
      ps.then(
        function(response){
          vm.count.draft = response.meta.count;
        }
      );
    }

    function count(limit){
      this.all(limit);
      this.publish(limit);
      this.draft(limit);
      return vm.count;
    }

  }

})();
