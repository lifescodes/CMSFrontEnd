(function() {
  angular
    .module('app.layout')
    .controller('TopNav', TopNav);

  TopNav.$inject = ['logger', 'config'];

  function TopNav(logger, config) {
    var vm = this;
    vm.title = config.appTitle;
    vm.isVisible = false;
    vm.toggleCanvas = toggleCanvas;


    function toggleCanvas($event) {
      // logger.info(vm.isVisible);
      vm.isVisible = !vm.isVisible;

      $event.preventDefault();
      $event.stopPropagation();
    }
  }

})();