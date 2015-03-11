(function() {
  'use strict';

  angular
    .module('app.rest')
    .factory('BlogRest', BlogRest);

  BlogRest.$inject = ['Restangular', 'logger','restconfig'];

  function BlogRest(Restangular, logger, restconfig) {
    /*jshint validthis: true */
    return Restangular.withConfig(function(RestangularConfigurer) {
      var url = restconfig.baseUrl + 'blog';
      RestangularConfigurer.setBaseUrl(url);
    });
  }
})();
