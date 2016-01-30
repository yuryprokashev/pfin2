pf.directive('submitBtn', [ 'channels', function( channels ) {
    
    return {
        
        templateUrl: "/assets/js/common/submitBtn.html",
        replace: false,
        scope: {
            objectToPost: "=",
            channelGroup: "="
        },
        
        link: function ( scope, el, attrs, controller, transcludeFn ) {
            el.on('click', function() {
                channels.publish( scope.channelGroup.save, scope.objectToPost);
            });
        }
    }
}]);

pf.directive('multipleBtnsSelect', [ 'channels', function( channels ) {
    
    return {
        
        templateUrl: "/assets/js/common/multipleBtnsSelect.html",
        replace: true,
        controller: ['$scope', '$log', function ( $scope, $log ) {
                        
            function select ( option, options ) {
                for ( var btn in options ) {
                    if ( options[ btn ].id === option ) {
                        options[ btn ].isSelected = true;
                    }
                    else {
                        options[ btn ].isSelected = false;
                    }
                }
            };
            
            select( $scope.selectedId, $scope.optionsArray );
            
            this.selectOption = function ( channel, args ) {
                $scope.selectedId = args.option.id;
//                $log.warn($scope.selectedId);
                select( args.option.id, $scope.optionsArray );
                $scope.$apply();
            };
            
            // I do it to make 'channelGroup' available in nested controller.
            this.channelGroup = $scope.channelGroup;
            
            channels.subscribe( this.channelGroup.update, this.selectOption );
                            
        }],
        
        scope: {
            channelGroup: "=",
            optionsArray: "=",
            selectedId: "=",
        },
        link: function ( scope, el, attrs, controller, transcludeFn ) {

        }
    }
}]);

pf.directive('btnInMultipleBtnsSelect', ['channels', function( channels ) {
    
    return {
        
        templateUrl: "/assets/js/common/btnInMultipleBtnsSelect.html",
        restrict: 'E',
        replace: false,
        require: '^multipleBtnsSelect',
        scope: {
            option: "=",
            object: "="
        },
        
        link: function ( scope, el, attrs, controller, transcludeFn ) {
            el.on( 'click', function() {
//                console.log(scope.option);
                channels.publish( controller.channelGroup.update, { option: scope.option });
            });
        }
    }
}]);

pf.directive('deleteBtn', [ 'channels', function( channels ) {
    
    return {
        
        templateUrl: "/assets/js/common/deleteBtn.html",
        replace: false,
        scope: {
            objectGuidToDelete: "=",
            channelGroup: "="
        },
        
        link: function ( scope, el, attrs, controller, transcludeFn ) {
            el.on('click', function() {
                channels.publish( scope.channelGroup.delete, { guid: scope.objectGuidToDelete } );
            });
        }
    }
}]);

pf.directive('expenseAmountWithCurrency', [ 'channels', function( channels ) {
    
    return {
        
        templateUrl: "/assets/js/common/expenseAmountWithCurrency.html",
        replace: false,
        controller: [ '$scope', '$log', 'expenses', function ( $scope, $log, expenses) {
            $scope.setCurrencyIcon = function ( id ) {
                return expenses.getCurrencyById( id ).className;
            };
            
            $scope.formatAmount = function ( num ) {
                return numeral( num ).format( '0,0[.]00' );
            }
        }],
        scope: {
            expenseAmount: "=",
            currencyId: "="
        },
        
        link: function ( scope, el, attrs, controller, transcludeFn ) {
            

        }
    }
}]);