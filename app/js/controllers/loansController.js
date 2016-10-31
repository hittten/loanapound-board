angular.module('loanPound')
    .controller('loansController', function(loanFactory, $routeParams, $location) {
        var controller = this;
        controller.loans = [];
        controller.loan = undefined;
        controller.form = {
            success: false,
            errors: null
        };
        controller.loading = false;

        controller.editing = ($routeParams.id !== undefined);

        if ($routeParams.id !== undefined) {
            controller.loading = true;
            loanFactory.getLoan($routeParams.id)
                .then(function (result) {
                    controller.loan = result;
                    controller.loan.borrowing_rate = (controller.loan.borrowing_rate / 100);
                })
                .catch(function (error) {
                    if(error.status === 404)
                        $location.url('#/404');
                })
                .finally(function () {
                    controller.loading = false;
                });
        } else {
            controller.loan = undefined;
        }

        controller.getAll = function () {
            controller.loading = true;
            loanFactory.getLoans()
                .then(function (result) {
                    controller.loans = result;
                })
                .finally(function () {
                    controller.loading = false;
                });
        };

        controller.save = function () {
            controller.loading = true;
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
                    if (true === controller.editing) {
                        controller.loan = result;
                        controller.loan.borrowing_rate = controller.loan.borrowing_rate / 100;
                    } else {
                        controller.loan = undefined;
                    }
                })
                .catch(function (error) {
                    if (error && error.data) {
                        controller.form.errors = error.data.errors;
                    }
                })
                .finally(function () {
                    controller.loading = false;
                });
        };

        controller.delete = function () {
            //TODO: finish delete loan
        };
    });
