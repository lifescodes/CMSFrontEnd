(function() {
  'use strict';

  angular
    .module('app.category')
    .run(appRun);

  // appRun.$inject = ['routehelper']

  /* @ngInject */
  function appRun(routehelper) {
    routehelper.configureRoutes(getRoutes());
  }

  function getRoutes() {
    return [{
      url: '/blog/category',
      config: {
        templateUrl: 'app/category/view/category.html',
        controller: 'Category',
        controllerAs: 'vm',
        title: 'Category'
      }
    }];
  }
})();
