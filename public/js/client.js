var pf = angular.module( 'PersonalFinance', ['ngRoute'] );

pf.config ( function ( $routeProvider ) {
    $routeProvider
    
    .when( '/', {
        templateUrl: '/assets/js/apps/expensesapp/expenses.html',
        controller: 'expensesController'
    })
    
    .when( '/expenses', {
        templateUrl: '/assets/js/apps/expensesapp/expenses.html',
        controller: 'expensesController'
    })
    
    .when( '/channels', {
        templateUrl: 'assets/js/apps/expensesapp/expenses.html',
        controller: 'expensesController'
    });
});