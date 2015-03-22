(function() {
  'use strict';

  angular
    .module('app.user')
    .run(appRun);

  // appRun.$inject = ['routehelper']

  /* @ngInject */
  function appRun(routehelper) {
    routehelper.configureRoutes(getRoutes());
  }

  function getRoutes() {
    return [{
      url: '/user',
      config: {
        templateUrl: 'app/user/view/user.html',
        controller: 'User',
        controllerAs: 'vm',
        title: 'User',
        section:{
          title: 'User',
          small: 'View'
        },
        breadcumb: [
          { name: "User", icon: "fa fa-dashboard" },
          { name: "Identity", icon: "fa fa-picture-o" }
        ],
      }
    }];
  }
})();
