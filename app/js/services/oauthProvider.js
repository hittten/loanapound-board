angular.module('loanPound')
    .provider('oauth', function () {
        var oauth = this;

        oauth.client_id = '';
        oauth.token_storage_key = '';
        oauth.api_auth_url = '';
        oauth.api_logout_url = '';
        oauth.response_type = '';

        oauth.setClientId = function (client_id) {
            oauth.client_id = client_id;
        };

        oauth.setTokenStorageKey = function (key) {
            oauth.token_storage_key = key;
        };

        oauth.setAuthUrl = function (url) {
            oauth.api_auth_url = url;
        };

        oauth.setLogoutUrl = function (url) {
            oauth.api_logout_url = url;
        };

        oauth.setResponseType = function (type) {
            oauth.response_type = type;
        };

        this.$get = function ($window) {
            return {
                getToken : function() {
                    return JSON.parse($window.localStorage.getItem(oauth.token_storage_key));
                },
                setToken : function(token) {
                    $window.localStorage.setItem(oauth.token_storage_key, JSON.stringify(token));
                },
                removeToken : function() {
                    $window.localStorage.removeItem(oauth.token_storage_key);
                },
                isAuthenticated : function() {
                    return (this.getToken() !== null);
                },
                authenticate : function() {
                    this.removeToken();

                    var url = oauth.api_auth_url + this.buildQueryString({
                        'client_id': oauth.client_id,
                        'redirect_uri': ($window.location.origin || $window.location.protocol + '//' + $window.location.host),
                        'response_type': oauth.response_type
                    });

                    $window.location.replace(url);
                },
                buildQueryString : function(queryParams) {
                    var queryString = [];

                    angular.forEach(queryParams, function(value, key) {
                        queryString.push(key + '=' + value);
                    });

                    return '?' + queryString.join('&');
                },
                logout : function () {
                    this.removeToken();
                    $window.location.replace(oauth.api_logout_url);
                }
            };
        };
    });
