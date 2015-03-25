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
          title: 'Media Upload',
          section:{
            title: 'Media Upload',
            small: 'View'
          },
          breadcumb: [
            { name: "Media", icon: "fa fa-dashboard" },
            { name: "Upload", icon: " fa-picture-o" }
          ],
        }
      },
      {
        url: '/media/library',
        config: {
          templateUrl: 'app/media/view/media.html',
          controller: 'MediaLibrary',
          controllerAs: 'vm',
          title: 'Media Upload',
          section:{
            title: 'Media Library',
            small: 'View'
          },
          breadcumb: [
            { name: "Media", icon: "fa fa-dashboard" },
            { name: "Library", icon: " fa-picture-o" }
          ],
        }
      }
    ];
  }
})();
