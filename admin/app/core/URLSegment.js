(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('URLSegment', URLSegment);

  URLSegment.$inject = ['$location'];

  function URLSegment($location){

    var vm = this;

    var service = {
      segment: segment,
      first: first,
      last: last,
      total: total,
    };

    return service;


    function segment(number){
      var path = $location.path().split("/");
      if(path[number]) {
        return path[number];
      }
      return false;
    }

    function total(){
      var path = $location.path().split("/");
      return path.length-1;
    }

    function first(){
      var s = segment(1);
      return s;

    }

    function last(){
      var t = total();
      var s = segment(t);
      return s;
    }



  }

})();
