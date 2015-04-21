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
