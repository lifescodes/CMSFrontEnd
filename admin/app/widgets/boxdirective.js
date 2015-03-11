(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('drBox', drBox);

  /* @ngInject */
  function drBox() {
    var directive = {
      //  link: link,
      scope: {
        'class': '@',
        'display': '@',
      },
      transclude: true,
      templateUrl: 'app/widgets/template/box.html',
      restrict: 'AE'
    };

    return directive;
  }


  angular
    .module('app.widgets')
    .directive('drBoxHeader', drBoxHeader);

  /* @ngInject */
  function drBoxHeader() {
    var directive = {
      //  link: link,
      transclude: true,
      templateUrl: 'app/widgets/template/box-header.html',
      restrict: 'E'
    };

    return directive;
  }

  angular
    .module('app.widgets')
    .directive('drBoxTools', drBoxTools);

  /* @ngInject */
  function drBoxTools() {
    var directive = {
      //  link: link,
      scope: {
        'position': '@'
      },
      transclude: true,
      templateUrl: 'app/widgets/template/box-tools.html',
      restrict: 'E'
    };

    return directive;
  }

  angular
    .module('app.widgets')
    .directive('drToolsMin', drToolsMin);

  /* @ngInject */
  function drToolsMin() {
    var directive = {
      //  link: link,
      scope: {
        'status': '@',
        'class': '@'
      },
      transclude: true,
      templateUrl: 'app/widgets/template/box-tools-min.html',
      restrict: 'E'
    };

    return directive;
  }

  angular
    .module('app.widgets')
    .directive('drToolsClose', drToolsClose);

  /* @ngInject */
  function drToolsClose() {
    var directive = {
      //  link: link,
      scope: {
        'class': '@'
      },
      transclude: true,
      templateUrl: 'app/widgets/template/box-tools-close.html',
      restrict: 'E'
    };

    return directive;
  }


  angular
    .module('app.widgets')
    .directive('drBoxBody', drBoxBody);

  /* @ngInject */
  function drBoxBody() {
    var directive = {
      //  link: link,
      scope: {
        'display': '@'
      },
      transclude: true,
      templateUrl: 'app/widgets/template/box-body.html',
      restrict: 'E'
    };

    return directive;
  }


})();