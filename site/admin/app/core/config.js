(function() {
  'use strict';

  var core = angular.module('app.core');

  core.config(toastrConfig);

  /* @ngInject */
  function toastrConfig(toastr) {
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';
  }

  var config = {
    appErrorPrefix: '[LifeCode] ', //Configure the exceptionHandler decorator
    appTitle: 'LifeCode',
    version: '1.0.0'
  };

  core.constant('config', config);

  core.config(configure);

  /* @ngInject */
  function configure($logProvider, $routeProvider, routehelperConfigProvider, exceptionHandlerProvider) {
    // turn debugging off/on (no info or warn)
    if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true);
    }

    // Configure the common route provider
    routehelperConfigProvider.config.$routeProvider = $routeProvider;
    routehelperConfigProvider.config.docTitle = 'LifeCode: ';

    // $routeProvider.otherwise({redirectTo: '/'});


    // Configure the common exception handler
    exceptionHandlerProvider.configure(config.appErrorPrefix);
  }
})();
