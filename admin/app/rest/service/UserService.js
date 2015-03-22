(function() {
  'use strict';

  angular
  .module('app.rest')
  .factory('UserService', UserService);

  UserService.$inject = ['UserRest', 'exception', 'logger'];

  function UserService(UserRest, exception, logger) {
    /*jshint validthis: true */
    var service = {
      list: list,
      filter: filter,
      get: get,
      save: save,
      update: update,
      remove: remove,
      search: search
    };
    return service;

    /* begin function */
    function list(num, limit) {
      if (num === undefined) {
        return UserRest.all('identity/related').getList();
      } else {
        return UserRest.all('identity/related').customGETLIST('', {
          page_limit: limit,
          page: num
        });
      }
    }

    function filter(object){
      return UserRest.all('identity').customGETLIST('filter',object);
    }

    function get(id) {
      return UserRest.one('identity/related', id).get();
    }


    function save(data) {
      return UserRest.all('identity').User(data);
    }

    function update(id, edit) {
      var ps = UserRest.one('identity', id).get();
      ps.then(
        function(data) {
          var userdata = UserRest.copy(data);
          userdata.displayName = edit.displayName;
          userdata.username = edit.username;
          userdata.password = edit.password;
          userdata.email = edit.email;
          userdata.active = edit.active;
          userdata.role = edit.role;
          userdata.put();
          console.log('identityService.update ',userdata);
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );

      return ps;
    }

    function remove(id) {
      var ps = UserRest.one('identity', id).get();
      ps.then(
        function(User) {
          User.remove();
          console.log('identityService.remove',User);
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );

      return ps;
    }

    function search() {

    }

  }
})();
