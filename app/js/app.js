;(function () {
    angular.module('loanPound', ['ngRoute', 'restangular'])
        .config(function (CONFIG, oauthProvider, RestangularProvider) {
            oauthProvider.setClientId(CONFIG.CLIENT_ID);
            oauthProvider.setTokenStorageKey(CONFIG.TOKEN_STORAGE_KEY);
            oauthProvider.setAuthUrl(CONFIG.API_BASE_URL + CONFIG.API_AUTH_URL);
            oauthProvider.setLogoutUrl(CONFIG.API_BASE_URL + CONFIG.API_LOGOUT_URL);
            oauthProvider.setResponseType(CONFIG.RESPONSE_TYPE);

            RestangularProvider.setBaseUrl(CONFIG.API_BASE_URL);
        })
        .run( function (oauth, $rootScope, Restangular, $http) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + oauth.getToken();

            $rootScope.$on('$routeChangeStart', function(event, next, current) {
                //check login
                if (!oauth.isAuthenticated() && next.originalPath !== '/access_token=:token&expires_in=:expires&token_type=:type') {
                    oauth.authenticate();
                    //event.preventDefault();
                }
            });

            Restangular.setErrorInterceptor(function(response) {
                if (response.status === 401 && oauth.isAuthenticated()) {
                    oauth.authenticate();

                    return false;
                }

                if (!oauth.isAuthenticated()) {
                    oauth.authenticate();

                    return false;
                }

                return true;
            });
        });
})();
