(function() {
  'use strict';

  angular
  .module('app.rest')
  .factory('BlogRest', BlogRest);

  BlogRest.$inject = ['Restangular','logger'];

  function BlogRest(Restangular, logger){
    /*jshint validthis: true */
    return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl('http://api.lifecode.loc/v1/blog');
      });
  }
})();
