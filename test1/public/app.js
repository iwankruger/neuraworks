(function () {
    'use strict';
    angular
        .module('app', ['ui.router'])
        .config(config);

    function config($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/home");

        // app routes
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'views/home.html',
                controller: 'homeCtrl',
                controllerAs: 'vm'
            });
            
    }

    

    
})();