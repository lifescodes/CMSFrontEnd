(function() {
  'use strict';

  angular
    .module('app.blog')
    .run(appRun);

  // appRun.$inject = ['routehelper']

  /* @ngInject */
  function appRun(routehelper) {
    routehelper.configureRoutes(getRoutes());
  }

  function getRoutes() {
    return [{
      url: '/blog',
      config: {
        templateUrl: 'app/blog/blog.html',
        controller: 'Blog',
        controllerAs: 'vm',
        title: 'blog'
      }
    }];
  }
})();
