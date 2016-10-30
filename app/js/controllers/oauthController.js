angular.module('loanPound')
    .controller('oauthController', function($routeParams, oauth, $location) {
        oauth.setToken($routeParams.token);
        $location.url('/');
    });
