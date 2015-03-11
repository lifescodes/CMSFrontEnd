(function() {
  'use strict';

  angular
    .module('app.home')
    .controller('Home',Home);

  Home.$inject = ['dataservice', 'logger'];

  function Home(dataservice, logger){
    /*jshint validthis: true */
    var vm = this;

  }
})();
