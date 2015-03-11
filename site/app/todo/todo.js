  (function() {
      'use strict';

      angular
          .module('app.todo')
          .controller('Todo',Todo);
          Todo.$inject = ['logger'];

          function Todo(logger){
            /*jshint validthis: true */
            var vm = this;
            vm.addTodo = addTodo;
            vm.remaining = remaining;
            vm.archive = archive;

            vm.todos = [
              {text:'learn angular', done:true},
              {text:'build an angular app', done:false}
              ];

            function addTodo(){
              vm.todos.push({text:vm.todoText, done:false});
              vm.todoText = '';
            }

            function remaining(){
              var count = 0;
              angular.forEach(vm.todos, function(todo) {
                count += todo.done ? 0 : 1;
              });
              return count;
            }

            function archive(){
              var oldTodos = vm.todos;
              vm.todos = [];
              angular.forEach(oldTodos, function(todo) {
                if (!todo.done) vm.todos.push(todo);
              });
            }

          }
  })();
