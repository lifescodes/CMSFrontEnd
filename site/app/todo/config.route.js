(function() {
    'use strict';

    angular
        .module('app.todo')
        .run(appRun);

    // appRun.$inject = ['routehelper']

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/todo',
                config: {
                    templateUrl: 'app/todo/todo.html',
                    controller: 'Todo',
                    controllerAs: 'vm',
                    title: 'todo'
                }
            }
        ];
    }
})();
