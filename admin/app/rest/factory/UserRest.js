(function() {
  'use strict';

  angular
    .module('app.rest')
    .factory('UserRest', UserRest);

  UserRest.$inject = ['Restangular', 'logger','restconfig'];

  function UserRest(Restangular, logger, restconfig) {
    /*jshint validthis: true */
    return Restangular.withConfig(function(RestangularConfigurer) {
      var url = restconfig.baseUrl + 'user';
      RestangularConfigurer.setBaseUrl(url);
    });
  }
})();
