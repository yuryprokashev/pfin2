pf.directive('chart1', [ 'charts', 'channels', function( charts, channels ) {
    
    return {
        
        templateUrl: "/assets/js/apps/chartsapp/chart1.html",
        replace: false,
        controller: ['$scope', '$log', function ( $scope, $log ) {
            
            var myChannels = channels.getChannels( 'services', 'charts' );
            
            $scope.chart1 = charts.getChart1();
            
//            $log.debug($scope.chart1);
            $scope.channelGroup = channels.getChannelGroup("charts").chart1;
            
            channels.subscribe( myChannels.chart1Ready, function ( channel, args ) {
                $log.debug( args );
            });
            
                        
        }],
        
        link: function ( scope, el, attrs, controller, transcludeFn ) {
//            console.log(attrs["$$element"][0].parentElement.clientHeight);
//            console.log(attrs["$$element"][0].clientHeight);
//            console.log(attrs["$$element"]);

            Plotly.newPlot( "chart-1", scope.chart1, { height: 200, margin: { l: 40, r: 10, t: 20, b: 25 } } );
        }
            
    }
}]);

pf.directive('chart2', [ 'charts', 'channels', function( charts, channels ) {
    
    return {
        
        templateUrl: "/assets/js/apps/chartsapp/chart2.html",
        replace: false,
        controller: ['$scope', '$log', function ( $scope, $log ) {
            
            $scope.chart2 = charts.getChart2();
            
//            $log.debug($scope.chart2);
            $scope.channelGroup = channels.getChannelGroup("charts").chart2;
                        
        }],
        
        link: function ( scope, el, attrs, controller, transcludeFn ) {
//            console.log(attrs["$$element"][0].parentElement.clientHeight);
//            console.log(attrs["$$element"][0].clientHeight);
//            console.log(attrs["$$element"]);

            Plotly.newPlot( "chart-2", scope.chart2, { height: 200, margin: { l: 40, r: 10, t: 20, b: 25 } } );
        }
            
    }
}]);

pf.directive('chart3', [ 'charts', 'channels', function( charts, channels ) {
    
    return {
        
        templateUrl: "/assets/js/apps/chartsapp/chart3.html",
        replace: false,
        controller: ['$scope', '$log', function ( $scope, $log ) {
            
            $scope.chart3 = charts.getChart3();
            
//            $log.debug($scope.chart3);
            $scope.channelGroup = channels.getChannelGroup("charts").chart3;
                        
        }],
        
        link: function ( scope, el, attrs, controller, transcludeFn ) {
//            console.log(attrs["$$element"][0].parentElement.clientHeight);
//            console.log(attrs["$$element"][0].clientHeight);
//            console.log(attrs["$$element"]);

            Plotly.newPlot( "chart-3", scope.chart3, { height: 200, margin: { l: 5, r: 5, t: 5, b: 5 } } );
        }
            
    }
}]);

pf.directive('chart4', [ 'charts', 'channels', function( charts, channels ) {
    
    return {
        
        templateUrl: "/assets/js/apps/chartsapp/chart4.html",
        replace: false,
        controller: ['$scope', '$log', function ( $scope, $log ) {
            
            $scope.chart4 = charts.getChart4();
            
//            $log.debug($scope.chart4);
            $scope.channelGroup = channels.getChannelGroup("charts").chart4;
                        
        }],
        
        link: function ( scope, el, attrs, controller, transcludeFn ) {
//            console.log(attrs["$$element"][0].parentElement.clientHeight);
//            console.log(attrs["$$element"][0].clientHeight);
//            console.log(attrs["$$element"]);

            Plotly.newPlot( "chart-4", scope.chart4, { height: 200, margin: { l: 5, r: 5, t: 5, b: 5 } } );
        }
            
    }
}]);