(function () {
    'use strict';
    angular
        .module('app', ['ui.router','ngSanitize','ngCsv'])
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
            })
            .state('csv', {
                url: '/csv',
                templateUrl: 'views/csv_test.html',
                controller: 'csv_testCtrl',
                controllerAs: 'vm'
            });
        
            
    }

    

    
})();