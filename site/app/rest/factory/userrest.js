(function() {
  'use strict';

  angular
  .module('app.rest')
  .factory('UserRest', UserRest);

  UserRest.$inject = ['Restangular','logger'];

  function UserRest(Restangular, logger){
    /*jshint validthis: true */
    return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl('http://api.lifecode.loc/v1/user');
      });
  }
})();
