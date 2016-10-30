angular.module('loanPound')
    .controller('loansController', function(loanFactory, $routeParams, $location) {
        var controller = this;
        controller.loans = [];
        controller.loan = undefined;
        controller.form = {
            success: false,
            errors: null
        };

        controller.editing = ($routeParams.id !== undefined);

        if ($routeParams.id !== undefined) {
            loanFactory.getLoan($routeParams.id)
                .then(function (result) {
                    controller.loan = result;
                    controller.loan.borrowing_rate = (controller.loan.borrowing_rate / 100);
                })
                .catch(function (error) {
                    if(error.status === 404)
                        $location.url('#/404');
                })
        } else {
            controller.loan = undefined;
        }

        controller.getAll = function () {
            loanFactory.getLoans()
                .then(function (result) {
                    controller.loans = result;
                })
        };

        controller.save = function () {
            var promise = null;
            controller.form.errors = null;
            controller.form.success = false;
            if ($routeParams.id === undefined) {
                promise = loanFactory.postLoans({
                    provider: controller.loan.provider,
                    borrowing_rate: (controller.loan.borrowing_rate * 100),
                    term: controller.loan.term
                });
            } else {
                promise = loanFactory.patchLoans($routeParams.id, {
                    provider: controller.loan.provider,
                    borrowing_rate: (controller.loan.borrowing_rate * 100),
                    term: controller.loan.term
                });
            }

            promise
                .then(function (result) {
                    controller.form.success = true;
                    controller.loan = undefined;
                })
                .catch(function (error) {
                    if (error && error.data) {
                        controller.form.errors = error.data.errors;
                    }
                });
        };

        controller.delete = function () {
            //TODO: finish delete loan
        };
    });
