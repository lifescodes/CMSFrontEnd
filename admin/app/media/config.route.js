(function() {
  'use strict';

  angular
  .module('app.media')
  .run(appRun);

  // appRun.$inject = ['routehelper']

  /* @ngInject */
  function appRun(routehelper) {
    routehelper.configureRoutes(getRoutes());
  }

  function getRoutes() {
    return [
      {
        url: '/media/upload',
        config: {
          templateUrl: 'app/media/view/upload.html',
          controller: 'MediaUpload',
          controllerAs: 'vm',
          title: 'Media Upload'
        }
      },
      {
        url: '/media/library',
        config: {
          templateUrl: 'app/media/view/media.html',
          controller: 'MediaLibrary',
          controllerAs: 'vm',
          title: 'Media Upload'
        }
      }
    ];
  }
})();
