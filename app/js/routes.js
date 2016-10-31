angular.module('loanPound')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                redirectTo: '/loans'
            })
            .when('/access_token=:token&expires_in=:expires&token_type=:type', {
                template: 'tpl/pages/loading.html',
                controller: 'oauthController'
            })
            .when('/logout', {
                template: 'tpl/pages/loading.html',
                controller: 'oauthController'
            })
            .when('/loans',{
                templateUrl: 'tpl/pages/loans/index.html',
                controller: 'loansController',
                controllerAs: 'loansController'
            })
            .when('/loans/new',{
                templateUrl: 'tpl/pages/loans/edit.html',
                controller: 'loansController',
                controllerAs: 'loansController'
            })
            .when('/loans/:id',{
                templateUrl: 'tpl/pages/loans/show.html',
                controller: 'loansController',
                controllerAs: 'loansController'
            })
            .when('/loans/:id/edit',{
                templateUrl: 'tpl/pages/loans/edit.html',
                controller: 'loansController',
                controllerAs: 'loansController'
            })
            .otherwise({redirectTo: '/'});
    });
