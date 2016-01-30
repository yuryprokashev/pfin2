// expenses is Service, which provides CRUD operations with Expenses and stores all Expenses
pf.service('charts', ['$log', '$filter', 'channels', 'expenses', function ( $log, $filter, channels, expenses ) {
            
    // object for Chart 1: expence volume by day in current month
    var  chart1 = {
        type: 'scatter',
        y: null,
        x: null
    };
    
    var chart2 = {
        type: 'bar',
        y: null,
        x: null
    }
    
    var chart3 = {
        type: 'pie',
        values: [1,3,2,5,3],
        labels: expenses.getCategoriesArray()
    }
    
    var chart4 = {
        type: 'pie',
        values: [32,57,83,26,75],
        labels: expenses.getCategoriesArray()
    }
    
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    
    // -----PUBLIC API ------ 
    
    function expenseVolumes ( month, year ) {
        // get only expenses in selected month, year
        var currentMonthExpenses = expenses.getExpenseVolumesByDayPerMonth( month, year );
        var volumePerDay = 0;
        var monthLength = new Date(year, month, 0).getDate();
        var volumes = [];
        for ( var i = 1; i <= monthLength; i++ ) {
            volumes.push( getRandomInt( 500, 4000 ) );
        }
        return volumes;
    };
    
    function days ( month, year ) {
        var days = [];
        var monthLength = new Date(year, month, 0).getDate();
        for ( var i = 1; i <= monthLength; i++ ) {
            days.push( i );
        }
        return days;
    };
    
//    $log.debug(days(2,2016));
    
    this.getChart1 = function ( channel, args ) {
        var today = new Date();
        var c = chart1;
        c.x = days(today.getMonth(), today.getYear());
        c.y = expenseVolumes(today.getMonth(), today.getYear());
        return [ c ];
    };
    
    this.getChart2 = function (channeg, args ) {
        var today = new Date();
        var c = chart2;
        c.x = days(today.getMonth(), today.getYear());
        c.y = expenseVolumes(today.getMonth(), today.getYear());
        return [ c ];
    }
    
    this.getChart3 = function ( channel, args ) {
        return [ chart3 ];
    }
    
    this.getChart4 = function ( channel, args ) {
        return [ chart4 ];
    }
        
}]);