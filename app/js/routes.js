angular.module('loanPound')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/access_token=:token&expires_in=:expires&token_type=:type', {
                template: '',
                controller: 'oauthController'
            })
            .otherwise({redirectTo: '/'});
    });
