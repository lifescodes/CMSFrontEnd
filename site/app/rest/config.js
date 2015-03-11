(function() {
  'use strict';

  var core = angular.module('app.rest');
  var restconfig = {
    baseUrl : 'http://api.lifecode.loc/v1/',
    requestSuffix : '?format=json',
    defaultHeaders :{
      "Content-Type": "application/json",
      "Accept":"application/json"
    }
  };
  core.value('restconfig',restconfig);

  core.config(initConfig);
  /* @ngInject */
  function initConfig(RestangularProvider) {
    RestangularProvider.setBaseUrl(restconfig.baseUrl);
    RestangularProvider.setRequestSuffix(restconfig.requestSuffix);
    RestangularProvider.setDefaultHeaders(restconfig.defaultHeaders);

    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
      var eData;
      var metaData;
      if (operation === "getList") {
        eData = response.data.results;
        metaData = response.data;
        // eData.meta = metaData;
      }
      if (operation === "get"){
        eData = response.data;
      }
      return eData;
    });
  }
})();
