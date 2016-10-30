;(function () {
    angular.module('loanPound', ['ngRoute']).
        config(function (CONFIG, oauthProvider) {
            oauthProvider.setClientId(CONFIG.CLIENT_ID);
            oauthProvider.setTokenStorageKey(CONFIG.TOKEN_STORAGE_KEY);
            oauthProvider.setAuthUrl(CONFIG.API_BASE_URL + CONFIG.API_AUTH_URL);
            oauthProvider.setResponseType(CONFIG.RESPONSE_TYPE);
        })
        .run( function (oauth,$rootScope) {
            $rootScope.$on('$routeChangeStart', function(event, next, current) {
                //check login
                if (!oauth.isAuthenticated() && next.originalPath !== '/access_token=:token&expires_in=:expires&token_type=:type') {
                    oauth.authenticate();
                    //event.preventDefault();
                }
            });
        });
})();
