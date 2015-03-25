(function() {
  'use strict';

  angular
  .module('app.user')
  .controller('User', User);

  User.$inject = ['UserService', 'UserPaginator', 'logger'];

  function User(userService, UserPaginator, logger) {
    /*jshint validthis: true */
    var vm = this;

    // vm.list = list;
    vm.get = get;
    vm.save = save;
    vm.edit = edit;
    vm.update = update;
    vm.remove = remove;
    vm.search = search;


    vm.paginator = UserPaginator;


    vm.roleOptions = [
      {value:'choose', label:'=== Choose Role ==='},
      {value:'admin', label:'Administrator'},
      {value:'editor', label:'Editor'},
      {value:'guest', label:'Guest'},
    ];
    //base form model
    vm.user = {
      id:undefined,
      displayName:undefined,
      email:undefined,
      username:undefined,
      password:undefined,
      passconf:undefined,
      active:undefined,
      roleOpt:vm.roleOptions[0],
      role:undefined,
    };

    vm.resetForm = resetForm;
    vm.bulk = bulk;
    vm.bulkSelect = "action";

    activate();
    function activate() {
      vm.paginator = UserPaginator;
      vm.paginator.init();
    }


    function get(id) {
      UserService.get(id).then(
        function(data) {
          return data;
        },
        function(error) {
          console.log(error);
          return error;
        }
      );
    }


    function save() {
      vm.user.counter = 0;
      var cUser = angular.copy(vm.user);
      var sUser = UserService.save(cUser);
      console.log('save data => ',cUser);
      sUser.then(
        function(data) {
          var object = angular.copy(data);
          vm.paginator.tree().children.push(object);
          vm.paginator.data().push(object);
          vm.user = null;
          vm.paginator.change(vm.paginator.total());
          logger.success('User Saved Success!');
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );
    }

    function update() {
      var ccat = angular.copy(vm.user);
      var ucat = UserService.update(vm.user.id, ccat);
      ucat.then(
        function(data) {
          var object = angular.copy(data);
          vm.user = null;
          console.log('update ', object);
          logger.success('User Updated Success!');
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );
    }

    function edit(user) {
      vm.user = user;
      vm.user.passconf = user.password;
      if (user.active == 1){
        vm.user.active = true;
      } else {
        vm.user.active = false;
      }
      vm.user.roleOpt = editOptionSelector(vm.user.role);


      // console.log(role);
    }

    function editOptionSelector(roleDb){
      var out = vm.roleOptions[0];
      switch (roleDb) {
        case 'admin':
          out = vm.roleOptions[1];
          break;
        case 'editor':
          out = vm.roleOptions[2];
          break;
        case 'guest':
          out = vm.roleOptions[3];
          break;
        default:
          out = vm.roleOptions[0];
          break;
      }

      return out;
    }

    function remove(user) {
      //remove from select option view
      var index = vm.paginator.data().indexOf(user);
      if (index > -1) vm.paginator.data().splice(index, 1);

      var tree = vm.paginator.tree().children.indexOf(user);
      if (tree > -1) vm.paginator.tree().children.splice(index, 1);

      //remove from rest service
      var cs = UserService.remove(user.id);
      cs.then(
        function(response) {
          console.log('delete => ', response);
          logger.success('User Delete Success!');
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );
    }

    function bulk() {
      logger.info(vm.bulkSelect);
      if (vm.bulkSelect === "delete") {
        vm.paginator.data().forEach(function(user) {
          if (user.isSelected) {
            console.log(user);
            deleteUser(user);
          }
        });
      }
    }

    function search(keyword) {

    }

    function resetForm() {
      vm.user.id = undefined;
      vm.user.name = undefined;
      vm.user.parent = undefined;
      vm.user.descriptions = undefined;
      vm.user.counter = undefined;
      // vm.user = null;
    }





  }
})();
