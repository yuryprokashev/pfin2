// require Express
var express = require( 'express' );

// create express app, I call it 'server'
var server = express();

// use 'static' middleware to serve static files from server
// static files will be accessible from 'public' folder on server by requesting '/assets' in url
server.use( '/assets', express.static( __dirname + '/public' ) );

// configure view engine, that server will use when 'server.render()' method is invoked.
server.set( 'view engine', "ejs" );
server.set( 'views', './views' );

// configure port, that server will listen: try to use environment variables (if any). Otherwise, use 3000.
var port = process.env.PORT || 3000;
// start listening to port
server.listen( port );

// ask server to handle '/' get requests from clients with 'index.jade' template
server.get( '/', function ( request, response ) {
    response.render( 'index', {} );
});

console.log("Personal Finance Server started!");