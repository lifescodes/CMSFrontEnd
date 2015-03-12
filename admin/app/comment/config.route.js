(function() {
  'use strict';

  angular
    .module('app.comment')
    .run(appRun);

  // appRun.$inject = ['routehelper']

  /* @ngInject */
  function appRun(routehelper) {
    routehelper.configureRoutes(getRoutes());
  }

  function getRoutes() {
    return [{
      url: '/blog/comment',
      config: {
        templateUrl: 'app/comment/view/comment.html',
        controller: 'Comment',
        controllerAs: 'vm',
        title: 'Comment'
      }
    }];
  }
})();
