(function(){
  'use strict';

  angular
  .module('app.post')
  .service('PostPaginator', PostPaginator);

  PostPaginator.$inject = ['PostService','logger'];

  function PostPaginator(PostService, logger){
    /*jshint validthis: true */
    var vm = this;
    vm.paginator = {
      limit: 6,
      current: 1,
      total: 1,
      totalArray: [1],
    };
    vm.data = [];

    var service = {
      init: init,
      paginator: paginator,
      data: data,
      change: change,
      count: count,
      page: page,
      first: first,
      next: next,
      prev: prev,
      last: last,
      limit: limit,
      current: current,
      total: total
    };

    init();
    return service;

    function init(){
      change(1);
    }

    function paginator(){
      return vm.paginator;
    }

    function data(){
      return vm.data;
    }

    function page(number){
      change(number);
    }

    function change(current) {
      vm.paginator.current = current;
      return executeRest(current);
    }

    function first(){
      change(1);
    }

    function next() {
      if (vm.paginator.current < vm.paginator.total) {
        vm.paginator.current++;
        change(vm.paginator.current);
      }
    }

    function prev() {
      if (vm.paginator.current > 1) {
        vm.paginator.current--;
        change(vm.paginator.current);
      }
    }

    function last(){
      change(vm.paginator.total);
    }

    function count(cnt) {
      vm.paginator.total = Math.ceil((cnt / vm.paginator.limit));
      vm.paginator.totalArray = new Array(vm.paginator.total);
    }

    function limit(number){
      if (number === undefined){
        return vm.paginator.limit;
      } else {
        vm.paginator.limit = number;
        return false;
      }
    }

    function current(curr){
      if (curr=== undefined){
        return vm.paginator.current;
      } else {
        vm.paginator.current = curr;
        return false;
      }
    }

    function total(){
      return vm.paginator.totalArray;
    }

    function executeRest(curr) {
      var ps = PostService.list();
      if (curr !== undefined) {
        ps = PostService.list(curr, limit());
        current(curr);
      }
      ps.then(
        function(response) {
          count(response.meta.count);
          return response;
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );

      vm.data = ps.$object;
      return ps;
    }

  }

})();
