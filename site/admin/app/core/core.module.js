(function() {
  'use strict';

  angular.module('app.core', [
    /*
    * Angular modules
    */
    'angular-loading-bar', 'ngAnimate', 'ngRoute', 'ngSanitize',
    /*
    * Our reusable cross app code modules
    */
    'blocks.exception', 'blocks.logger', 'blocks.router',
    /*
    * 3rd Party modules
    */
    'ngplus', 'restangular', 'ngCkeditor', 'ngTagsInput',

    'slugifier', 

    'angularFileUpload',  'ui.grid', 'wu.masonry', 'ngDialog',
    /*
    *UI Bootstrap
    */
    'ui.bootstrap', 'ui.bootstrap.dropdown', 'adaptv.adaptStrap',
    /*
    * VideoGular
    */
    "com.2fdevs.videogular", "com.2fdevs.videogular.plugins.controls",
    "com.2fdevs.videogular.plugins.overlayplay", "com.2fdevs.videogular.plugins.buffering"
  ]);
})();
