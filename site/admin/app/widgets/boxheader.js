(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('drBoxHeader', drBoxHeader);

  /* @ngInject */
  function drBoxHeader() {
    var directive = {
      //  link: link,
      scope: {
        'classbox': '@',
        'displaybox': '@',
      },
      templateUrl: 'app/widgets/template/box-header.html',
      restrict: 'E'
    };

    return directive;
  }


})();