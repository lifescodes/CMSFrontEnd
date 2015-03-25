(function(){

  angular
    .module('app.dashboard')
      .controller('Dashboard', Dashboard);

    Dashboard.$inject = ['logger'];

    function Dashboard(logger){

      var vm = this;
    }

})();
