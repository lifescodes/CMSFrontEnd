(function() {
  angular
    .module('app.layout')
    .controller('Layout', Layout);

  Layout.$inject = ['logger', 'config'];

  function Layout(logger, config) {
    var vm = this;
    vm.title = config.appTitle;
    vm.isVisible = false;
    vm.toggleCanvas = toggleCanvas;


    vm.right = "right-side";
    vm.left = "left-side sidebar-offcanvas";
    vm.wrapper = "wrapper row-offcanvas row-offcanvas-left active relative";
    vm.toggleButton = "fa fa-outdent";

    function toggleCanvas($event) {
      // logger.info(vm.isVisible);
      vm.isVisible = !vm.isVisible;
      if (!vm.isVisible){
        vm.right = "right-side strech";
        vm.left = "left-side sidebar-offcanvas collapse-left";
        vm.wrapper = "wrapper row-offcanvas row-offcanvas-left";
        vm.toggleButton = "fa fa-indent";
      } else {
        vm.right = "right-side";
        vm.left = "left-side sidebar-offcanvas";
        vm.wrapper = "wrapper row-offcanvas row-offcanvas-left active relative";
        vm.toggleButton = "fa fa-outdent";
      }
      $event.preventDefault();
      $event.stopPropagation();
    }
  }

})();
