(function() {
  angular
    .module('app.layout')
    .controller('SideNav', SideNav);

  SideNav.$inject = ['logger'];

  function SideNav(logger, $event) {
    var vm = this;
    vm.isTree = false;
    vm.toggleTree = toggleTree;
    vm.style = {
      'display': 'none'
    };


    function toggleTree($event) {
      // logger.info(vm.isVisible);
      vm.isTree = !vm.isTree;
      if (vm.isTree) {
        vm.style = {
          'display': 'block'
        };
      } else {
        vm.style = {
          'display': 'none'
        };
      }

      $event.preventDefault();
      $event.stopPropagation();
    }
  }
})();