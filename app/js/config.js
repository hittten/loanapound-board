angular.module('loanPound')
    .constant('CONFIG', {
        'API_BASE_URL': 'http://dev-api.loanapound.com',
        'TOKEN_STORAGE_KEY' : 'loan_app_token',
        'CLIENT_ID': '1_randomid',
        'API_AUTH_URL' : '/oauth/v2/auth',
        'API_LOGOUT_URL' : '/oauth/v2/auth_logout',
        'RESPONSE_TYPE' : 'token'
    });
