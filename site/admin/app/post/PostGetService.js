(function() {
  'use strict';

  angular
  .module('app.post')
  .service('PostGetService', PostGetService);

  PostGetService.$inject = ['logger'];

  function PostGetService(logger){
    /*jshint validthis: true */
    var service = this;
    service.set = set;
    service.get = get;
    service.post = null;

    function get(){
      return service.post;
    }

    function set(post){
      service.post = post;
    }

  }

})();
