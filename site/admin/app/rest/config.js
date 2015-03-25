(function() {
  'use strict';

  var rest = angular.module('app.rest');
  var remoteconfig = {
    site: 'http://api.lifecode.dev',
    apiVersion : 'v1',
  };
  var restconfig = {
    siteUrl: 'http://api.lifecode.dev',
    apiVersion : 'v1',
    baseUrl: 'http://api.lifecode.dev/v1/',
    requestSuffix: '?format=json',
    defaultHeaders: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    uploadHeaders: {
      "Content-Type": "multipart/form-data"
    },
  };

  rest.constant('restconfig', restconfig);
  rest.value('restconfig', restconfig);
  rest.config(initConfig);
  /* @ngInject */
  function initConfig(RestangularProvider) {
    RestangularProvider.setBaseUrl(restconfig.baseUrl);
    RestangularProvider.setRequestSuffix(restconfig.requestSuffix);
    RestangularProvider.setDefaultHeaders(restconfig.defaultHeaders);

    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
      // console.log("````````````````");
      // console.log('data => ',data);
      // console.log('operation => ',operation);
      // console.log('what => ',what);
      // console.log('url => ',url);
      // console.log('response => ',response);
      // console.log('deferred => ',deferred);
      // console.log("````````````````");

      var eData;
      eData = ['info'];
      var metaData;
      if (operation === "getList") {
        eData = response.data.results;
        eData.meta = {
          'next': response.data.next,
          'prev': response.data.prev,
          'count': response.data.count
        };
      }
      if (operation === "get") {
        eData = response.data;
      }

      if (operation === "post") {
        eData = response.data;
      }
      return eData;
    });
  }
})();
