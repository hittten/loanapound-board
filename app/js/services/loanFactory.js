angular.module('loanPound')
    .factory('loanFactory', function(Restangular) {
        return {
            getLoans: function () {
                return Restangular.all('loans').getList();
            },
            getLoan: function (id) {
                return Restangular.one('loans', id).get();
            },
            postLoans: function (loan) {
                return Restangular.all('loans').post({loan:loan});
            },
            patchLoans: function (id, loan) {
                return Restangular.one('loans', id).patch({loan:loan});
            }
        };
    });
