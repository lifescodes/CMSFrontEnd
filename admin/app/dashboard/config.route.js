(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .run(appRun);

  // appRun.$inject = ['routehelper']

  /* @ngInject */
  function appRun(routehelper) {
    routehelper.configureRoutes(getRoutes());
  }

  function getRoutes() {
    return [{
      url: '/dashboard',
      config: {
        templateUrl: 'app/dashboard/view/main.html',
        controller: 'Dashboard',
        controllerAs: 'vm',
        title: 'Dashboard',
        section:{
          title: 'Dashboard',
          small: 'View'
        },
        breadcumb: [
          { name: "Home", icon: "fa fa-dashboard" },
          { name: "Dashboard", icon: "fa fa-picture-o" },
        ],
      }
    }];
  }
})();
