/**
*
*	MIDDLEWARE: validate
*
*
*	DESCRIPTION:
*		- Validates an anagrams request.
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

var isString = require( 'validate.io-string-primitive' ),
	isStringArray = require( 'validate.io-string-primitive-array' );


// VALIDATE //

/**
* FUNCTION: validate( request, response, next )
*	Validates request parameters for an anagrams request.
*
* @param {Object} request - HTTP request object
* @param {Object} response - HTTP response object
* @param {Function} next - callback to invoke after validating
*/
function validate( request, response, next ) {
	var body = request.body,
		msg,
		error;

	if ( !isString( body.resources ) && !isStringArray( body.resources ) ) {
		msg = 'Invalid body parameter. `resources` should either be a string or a string array. Value: `' + body.resources + '`.';
		error = {
			'status': 400,
			'message': msg
		};
		next( error );
		return;
	}
	if ( body.hasOwnProperty( 'lang' ) && !isString( body.lang ) ) {
		msg = 'Invalid body parameter. `lang` should be a string. Value: `' + body.lang + '`.';
		error = {
			'status': 400,
			'message': msg
		};
		next( error );
		return;
	}
	next();
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
