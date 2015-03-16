(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('URLHelper', URLHelper);

  URLHelper.$inject = ['URLSegment','$location'];

  function URLHelper(URLSegment, $location){

    var vm = this;

    var service = {
      getSegment: getSegment,
      segment: segment,
      redirectTo: redirectTo
    };
    return service;


    function getSegment(){
      return URLSegment;
    }

    function segment(number){
      return getSegment().segment(number);
    }

    function redirectTo(path){
      $location.path(path);
    }

  }

})();
