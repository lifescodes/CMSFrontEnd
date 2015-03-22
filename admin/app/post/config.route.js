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
        title: 'Blog Post List',
        section:{
          title: 'Blog Post',
          small: 'List View'
        },
        breadcumb: [
          { name: "Blog", icon: "fa fa-dashboard" },
          { name: "Post", icon: "fa fa-picture-o" },
          { name: "List", icon: "fa fa-picture-o" }
        ],
      }
    }, {
      url: '/blog/post/add',
      config: {
        templateUrl: 'app/post/view/postform.html',
        controller: 'PostForm',
        controllerAs: 'vm',
        title: 'Blog Post Add',
        section:{
          title: 'Blog Post',
          small: 'Add View'
        },
        breadcumb: [
          { name: "Blog", icon: "fa fa-dashboard" },
          { name: "Post", icon: "fa fa-picture-o" },
          { name: "Add", icon: "fa fa-picture-o" }
        ],
      }
    }, {
      url: '/blog/post/edit/:id',
      config: {
        templateUrl: 'app/post/view/postform.html',
        controller: 'PostForm',
        controllerAs: 'vm',
        title: 'Blog Post Edit',
        section:{
          title: 'Blog Post',
          small: 'Add View'
        },
        breadcumb: [
          { name: "Blog", icon: "fa fa-dashboard" },
          { name: "Post", icon: "fa fa-picture-o" },
          { name: "Edit", icon: "fa fa-picture-o" }
        ],
      }
    }, ];
  }
})();
