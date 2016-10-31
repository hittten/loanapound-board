angular.module('loanPound')
    .controller('oauthController', function($routeParams, oauth, $location, $route) {
        if ('/logout' === $route.current.originalPath) {
            oauth.logout();
        } else {
            oauth.setToken($routeParams.token);
            $location.url('/');
        }
    });
