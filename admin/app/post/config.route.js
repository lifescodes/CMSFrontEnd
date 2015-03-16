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
        controller: 'PostList',
        controllerAs: 'vm',
        title: 'Post List'
      }
    }, {
      url: '/blog/post/add',
      config: {
        templateUrl: 'app/post/view/postform.html',
        controller: 'PostForm',
        controllerAs: 'vm',
        title: 'Post Add'
      }
    }, {
      url: '/blog/post/edit/:id',
      config: {
        templateUrl: 'app/post/view/postform.html',
        controller: 'PostForm',
        controllerAs: 'vm',
        title: 'Post Edit'
      }
    }, ];
  }
})();
