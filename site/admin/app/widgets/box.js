(function() {
  angular
    .module('app.widgets')
    .controller('Box', Box);

  Box.$inject = ['logger'];

  function Box(logger) {
    var vm = this;


    vm.styleBox = {
      'display': 'block'
    };
    vm.styleBody = "block";
    vm.styleFoot = {
      'display': 'block'
    };
    vm.classIconMin = "fa fa-chevron-up";
    vm.classBox = "box box-solid";

    vm.isMinimize = false;
    vm.minimize = minimize;
    vm.close = close;


    function minimize($event) {
      logger.info('Box Minimize');
      vm.isMinimize = !vm.isMinimize;
      if (vm.isMinimize) {
        vm.styleBody = "none";
        vm.styleFoot = {
          'display': 'none'
        };
        vm.classIconMin = "fa fa-chevron-up";
        vm.classBox = "box box-solid collapsed-box";
      } else {
        vm.styleBody = {
          'display': 'block'
        };
        vm.styleFoot = {
          'display': 'block'
        };
        vm.classIconMin = "fa  fa-chevron-down";
        vm.classBox = "box box-solid collapsed-box";
      }
      $event.preventDefault();
      $event.stopPropagation();
    }

    function close($event) {
      logger.info('Box Close');
      vm.styleBox = {
        'display': 'none'
      };
      $event.preventDefault();
      $event.stopPropagation();
    }
  }

})();