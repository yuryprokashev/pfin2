// expenses is Service, which provides CRUD operations with Expenses and stores all Expenses
pf.service('expenses', ['$log', '$filter', 'channels', function ( $log, $filter, channels ) {
    // expenses storage raw
    var expenses = {};
    
    // expenses storage for time charts
    var expensesShowcaseTime = {};
    
    // channels available for this service are given by channels service
    var myChannels = channels.getChannels( 'services', 'expenses' );
    $log.info( myChannels );
    
    // currencies reference
    var currencies = [ 
        { id: 1, name: 'RUB', isGlyph: true, className: "fa fa-rub" },
        { id: 2, name: 'USD', isGlyph: true, className: "fa fa-usd" },
        { id: 3, name: 'EUR', isGlyph: true, className: "fa fa-eur" }
    ];
            
    // categories reference this should be later refactored to get the data from angular service
    var categories = [ 
        { id: 1, name: 'food', isGlyph: true, className: "fa fa-cutlery" },
        { id: 2, name: 'car', isGlyph: true, className: "fa fa-car" },
        { id: 3, name: 'kids', isGlyph: true, className: "fa fa-child" },
        { id: 4, name: 'entertainment', isGlyph: true, className: "fa fa-glass" },
        { id: 5, name: 'business services', isGlyph: true, className: "fa fa-briefcase" },
        { id: 6, name: 'transport', isGlyph: true, className: "fa fa-train" }
    ];
    
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };
    
    // function that assignes guid to newly created problem
    function guid() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };
    
    // -----PUBLIC API ------
    
//    this.get = function ( guid ) {
//        return expenses[ guid ];
//    };
    
    this.getEmpty = function () {
        var e = {};
        e.date = new Date();
        e.amount = null;
        e.spentCurrencyId = currencies[0].id;
        e.categoryId = categories[0].id;
        e.description = null;
        return e;
    };
    
    this.getAll = function () {
        var e = [];
        
        for (var i in expenses) {
            e.push( expenses[ i ] );
        }
        
        return e;
    };
    
    this.getCategories = function () {
        return categories;
    };
    
    this.getCategoriesArray = function () {
        var array = [];
        for ( var i in categories ) {
            array.push( categories[ i ].name );
        }
        return array;
    }
    
    this.getCurrencies = function() {
        return currencies;
    };
    
    this.getCurrencyById = function( id ) {
        
        var currency = {};
        
        for ( var i in currencies ) {
            if( currencies[ i ].id === id ){
                currency = currencies[ i ];
                break;
            }
            else {
                currency = null;
            }
        }
        if (!currency) {
            $log.error('No currency exists for this currency id ' + id);
        }
        
        return currency;
    };
    
    this.getCategoryNameById = function( id ) {
        var result = {};
        for ( var i in categories ) {
            if ( categories[ i ].id === id ) {
                result = categories[ i ].name;
                break;
            }
            else {
                result = null;
            }
        }
        if (!result) {
            $log.error('No name for this expense category id ' + id);
        };
        return result;
    };
    
    this.getCategoryById = function( id ) {
        var result = {};
        for ( var i in categories ) {
            if ( categories[ i ].id === id ) {
                result = categories[ i ];
                break;
            }
            else {
                result = null;
            }
        }
        if (!result) {
            $log.error('No name for this expense category id ' + id);
        };
        return result;
    };
    
    this.getExpenseVolumesByDayPerMonth = function ( month, year ) {
        var result = [];
        if(expensesShowcaseTime[ year ] && expensesShowcaseTime[ year ][ month ]) {
            var itemsInMonth = expensesShowcaseTime[ year ][ month ];
            $log.info( itemsInMonth );
        }
        
        // get all expenses in one day and sum them up. then place result in result array
        result = itemsInMonth;
        channels.publish( myChannels.chart1Ready, { yaxis : result } );
    };
    
    this.create = function ( channel, args ) {
                
        var expense = {};
        
        expense.guid = guid();
        expense.description = args.description || 'default expense';
        expense.categoryId = args.categoryId || null;
        expense.date = args.date || new Date();
        expense.createdAt = new Date().toUTCString();
        expense.amount = args.amount || null;
        expense.spentCurrencyId = args.spentCurrencyId || 1;
        
        // here I need logic that saves expenses in expenses object with year-month-day structure
        
        var day = expense.date.getDate().toString(),
            month = expense.date.getMonth().toString(),
            year = expense.date.getFullYear().toString();
        
        if( !expensesShowcaseTime[ year ] ){
            expensesShowcaseTime[ year ] = {};
        };
        
        if ( !expensesShowcaseTime[ year ][ month ] ) {
            expensesShowcaseTime[ year ][ month ] = {};
        };
        
        if ( !expensesShowcaseTime[ year ][ month ][ day ] ) {
            expensesShowcaseTime[ year ][ month ][day] = {};
        };
        // saves expense object to expenseShowcaseTime for time charts
        expensesShowcaseTime[year][month][day][ expense.guid ] = expense;
        
        // saves expense object to expenses as raw expense data.
        expenses[expense.guid] = expense;
        
        channels.publish( channels.getChannelGroup("expense").saved, { status: 1 } );
        
    };
    
    this.delete = function ( channel, args ) {
        
        var e = expenses[ args.guid ];
        var day = e.date.getDate().toString(),
            month = e.date.getMonth().toString(),
            year = e.date.getFullYear().toString();
        
        // delete expense from raw 'expences' storage
        delete expenses [ args.guid ];
        
        // delete expense from 'expenseShowcaseTime'
        delete expensesShowcaseTime[ year ][ month ][ day ][ args.guid ];
        
//        $log.debug(expenses);
//        $log.debug(expensesShowcaseTime);
        
        channels.publish( channels.getChannelGroup("expense").deleted, { status: 1 } );
    };
    
    this.update = function ( channel, args ) {
        
    };
        
}]);