/**
*
*	ROUTES: POST /anagrams
*
*
*	DESCRIPTION:
*		- Route for finding anagrams in Wikipedia pages.
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

// MIDDLEWARE //

var parse = require( 'body-parser' ).json(),
	validate = require( './validate.js' ),
	anagrams = require( './anagrams.js' ),
	json = require( './json.js' );


// EXPORTS //

module.exports = [
	parse,
	validate,
	anagrams,
	json
];
