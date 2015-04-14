/**
*
*	APP
*
*
*	DESCRIPTION:
*		- Returns a method for creating and booting an express application.
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

var express = require( 'express' ),
	bootable = require( 'bootable' ),
	logger = require( 'logger' ),
	middleware = require( './middleware' ),
	server = require( './server' );


// FUNCTIONS //

/**
* FUNCTIONS: onBoot( clbk )
*	Returns a callback to be invoked after boot completion.
*
* @private
* @param {Function} [clbk] - optional callback
*/
function onBoot( clbk ) {
	/**
	* FUNCTION: onBoot( [error] )
	*	Callback invoked after application boot sequence completion.
	*
	* @private
	* @param {Error} [error] - error object
	*/
	return function onBoot( error ) {
		if ( error ) {
			logger.info({ 'error': error });
			console.log( error );
			return process.exit( -1 );
		}
		if ( clbk ) {
			clbk();
		}
	}; // end FUNCTION onBoot()
} // end FUNCTION onBoot()


// BOOT //

/**
* FUNCTION: boot( [clbk] )
*	Defines the boot order for an express application. When invoked, creates and boots the application.
*
* @param {Function} [clbk] - callback to invoke after successfully booting the application
* @returns {Function} express application
*/
function boot( clbk ) {
	// [0] Create the application...
	var app = bootable( express() );

	// [1] Bind application middleware...
	app.phase( middleware );

	// [2] Create the server...
	app.phase( server );

	// [3] Boot the application...
	app.boot( onBoot( clbk ) );

	return app;
} // end FUNCTION boot()


// EXPORTS //

module.exports = boot;
