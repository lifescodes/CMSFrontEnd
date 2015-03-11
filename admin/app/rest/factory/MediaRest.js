(function() {
  'use strict';

  angular
    .module('app.rest')
    .factory('MediaRest', MediaRest);

  MediaRest.$inject = ['Restangular', 'logger','restconfig'];

  function MediaRest(Restangular, logger, restconfig) {
    /*jshint validthis: true */
    return Restangular.withConfig(function(RestangularConfigurer) {
      var url = restconfig.baseUrl + 'media';
      RestangularConfigurer.setBaseUrl(url);
    });
  }
})();
