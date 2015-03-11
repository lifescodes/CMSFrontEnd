(function() {
  'use strict';

  angular
    .module('app.tag')
    .run(appRun);

  // appRun.$inject = ['routehelper']

  /* @ngInject */
  function appRun(routehelper) {
    routehelper.configureRoutes(getRoutes());
  }

  function getRoutes() {
    return [{
      url: '/blog/tag',
      config: {
        templateUrl: 'app/tag/view/tag.html',
        controller: 'Tag',
        controllerAs: 'vm',
        title: 'Tag'
      }
    }];
  }
})();
