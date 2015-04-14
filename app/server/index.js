/**
*
*	SERVER
*
*
*	DESCRIPTION:
*		- Returns a function to create an application server.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2015. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2015.
*
*/

'use strict';

// MODULES //

var http = require( 'http' ),
	logger = require( 'logger' );


// VARIABLES //

var PROTOCOL = 'http',
	PORT = 7311;


// FUNCTIONS //

/**
* FUNCTION: onError( error )
*	Server error event handler.
*
* @private
* @param {Error} error - server error
*/
function onError( error ) {
	if ( error.code === 'EADDRINUSE' ) {
		logger.info( 'Server address already in use.' );
	}
	logger.info({ 'error': error });
	return process.exit( -1 );
} // end FUNCTION onError()

/**
* FUNCTION: onListen( clbk )
*	Wraps a callback in a closure and returns a function to be invoked once a server is ready to handle requests.
*
* @private
* @param {Function} clbk - enclosed callback
* @returns {Function} callback
*/
function onListen( clbk ) {
	/**
	* FUNCTION: onListen()
	*	Callback invoked once a server is listening and ready to handle requests.
	*
	* @private
	*/
	return function onListen() {
		logger.info( PROTOCOL.toUpperCase() + ' server initialized. Server is listening for requests on port: ' + PORT + '.' );
		clbk();
	}; // end FUNCTION onListen()
} // end FUNCTION onListern()


// SERVER //

/**
* FUNCTION: create( next )
*	Creates an HTTP server.
*
* @param {Function} next - callback to run after initializing the server
*/
function create( next ) {
	/* jshint validthis:true */
	var server = http.createServer( this );
	server.on( 'error', onError );
	server.listen( PORT, onListen( next ) );
	this.server = server;
} // end FUNCTION create()


// EXPORTS //

module.exports = create;
