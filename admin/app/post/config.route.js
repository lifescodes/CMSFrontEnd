(function() {
  'use strict';

  angular
    .module('app.post')
    .run(appRun);

  // appRun.$inject = ['routehelper']

  /* @ngInject */
  function appRun(routehelper) {
    routehelper.configureRoutes(getRoutes());
  }

  function getRoutes() {
    return [{
      url: '/blog/post',
      config: {
        templateUrl: 'app/post/view/post.html',
        controller: 'Post',
        controllerAs: 'vm',
        title: 'post'
      }
    }, {
      url: '/blog/post/add',
      config: {
        templateUrl: 'app/post/view/postadd.html',
        controller: 'Post',
        controllerAs: 'vm',
        title: 'post'
      }
    }, {
      url: '/blog/post/edit',
      config: {
        templateUrl: 'app/post/view/postadd.html',
        controller: 'Post',
        controllerAs: 'vm',
        title: 'post'
      }
    }, ];
  }
})();