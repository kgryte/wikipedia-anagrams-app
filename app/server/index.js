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


// SERVER //

/**
* FUNCTION: create( clbk )
*	Creates an HTTP server.
*
* @param {Function} clbk - callback to run after initializing the server
*/
function create( next ) {
	/* jshint validthis:true */
	var server = http.createServer( this );
	server.on( 'error', onError );
	server.listen( PORT, onListen );
	this.server = server;
	return;

	/**
	* FUNCTION: onListen()
	*	Callback invoked once a server is listening and ready to handle requests.
	*
	* @private
	*/
	function onListen() {
		logger.info( PROTOCOL.toUpperCase() + ' server initialized. Server is listening for requests on port: ' + PORT + '.' );
		next();
	} // end FUNCTION onListen()
} // end FUNCTION create()


// EXPORTS //

module.exports = create;
