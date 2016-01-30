pf.controller ('expensesController', ['$scope','$log', function ( $scope, $log ) {
    $scope.name = 'expenses controller scope';
}]);
    
pf.directive('expenseInputForm', [ 'expenses', 'channels', function( expenses, channels ) {
    
    return {
        
        templateUrl: "/assets/js/apps/expensesapp/expenseInputForm.html",
        replace: false,
        controller: ['$scope', '$log', function ( $scope, $log ) {
                        
            $scope.categories = expenses.getCategories();
            
            $scope.currencies = expenses.getCurrencies();
            
            $scope.allChannelGroups = channels.getChannelGroup();
            
            var self = this;
            
            this.create = function( channel, args ) {
                expenses.create( channel, args );
                $scope.newExpense = expenses.getEmpty();
                self.updateMultipleBtnSelectors();
            };
            
            this.updateMultipleBtnSelectors = function () {
                var e = $scope.newExpense;
                var optionCurency = {
                    option: expenses.getCurrencyById( e.spentCurrencyId )
                };
                var optionCategory = {
                    option: expenses.getCategoryById( e.categoryId )
                };
                channels.publish( $scope.allChannelGroups.category.update, optionCategory );
                channels.publish( $scope.allChannelGroups.currency.update, optionCurency );
            };
            
            this.updateCategoryName = function( channel, args ) {
                $scope.selectedCategoryName = expenses.getCategoryNameById( $scope.newExpense.categoryId );
                $scope.$apply();
            };
            
            $scope.newExpense = expenses.getEmpty();
            this.updateMultipleBtnSelectors();
            
            $scope.selectedCategoryName = expenses.getCategoryNameById( $scope.newExpense.categoryId );
            
            channels.subscribe( $scope.allChannelGroups.expense.save, this.create );
            
            channels.subscribe( $scope.allChannelGroups.category.update, this.updateCategoryName );
            
        }],
        
        link: function ( scope, el, attrs, controller, transcludeFn ) {
            
        }
    }
}]);

pf.directive('expensesView', [ 'expenses', 'channels', function( expenses, channels ) {
    
    return {
        
        templateUrl: "/assets/js/apps/expensesapp/expensesView.html",
        replace: false,
        controller: ['$scope', '$log', function( $scope, $log ) {
            $scope.expenses = expenses.getAll();
            
            this.channelGroup = channels.getChannelGroup( "expense" );
            
            channels.subscribe( this.channelGroup.saved, function () {
                $scope.expenses = expenses.getAll();
            });
            
            this.delete = function ( channel, args ) {
                expenses.delete( channel, args );
            }
            
            channels.subscribe( this.channelGroup.delete, this.delete );
            
            channels.subscribe( this.channelGroup.deleted, function () {
                $scope.expenses = expenses.getAll();
                $scope.$apply();
            });
        }],
        scope: {
        },
        
        link: function ( scope, el, attrs, controller, transcludeFn ) {
        }
    }
}]);

pf.directive('oneExpenseView', [ 'channels', 'expenses', function( channels, expenses ) {
    
    return {
        
        templateUrl: "/assets/js/apps/expensesapp/oneExpenseView.html",
        replace: false,
        controller: [ '$scope', '$log', function( $scope, $log ){
            $scope.formatDate = function ( date ) {
//                $log.debug('formatDate is called');
                return moment( date ).format( 'DD/MM/YYYY' );
            };
            
            $scope.setCategoryName = function( id ) {
                return expenses.getCategoryNameById( id );
            };
            
            $scope.channelGroup = channels.getChannelGroup( "expense" );
            
        }],
        scope: {
            expenseObject: "=",
        },
        
        link: function ( scope, el, attrs, controller, transcludeFn ) {
        }
    }
}]);