'use strict';

// MODULES //

var getAnagrams = require( 'wikipedia-anagrams' );


// ANAGRAMS //

/**
* FUNCTION: anagrams( request, response, next )
*	Finds anagrams in Wikipedia pages.
*
* @param {Object} request - HTTP request object
* @param {Object} response - HTTP response object
* @param {Function} next - callback to invoke after finding anagrams
*/
function anagrams( request, response, next ) {
	var rsrc = request.body.resources,
		opts = {};

	if ( request.body.hasOwnProperty( 'lang' ) ) {
		opts.lang = request.body.lang;
	}

	getAnagrams( rsrc, opts, onAnagrams );

	function onAnagrams( error, hashes ) {
		var blob,
			hash,
			len,
			i;
		if ( error ) {
			next( error );
			return;
		}
		// Create a JSON blob...
		blob = {};
		len = hashes.length;
		for ( i = 0; i < len; i++ ) {
			blob[ rsrc[ i ] ] = hashes[ i ].get();
		}
		// Create a combined hash...
		hash = hashes[ 0 ].copy();
		hash.merge.apply( hash, hashes.slice( 1 ) );
		blob[ '__merged__' ] = hash.get();

		// Pass the blob to the next middleware...
		request.locals.anagrams = blob;
		next();
	}
} // end FUNCTION anagrams()


// EXPORTS //

module.exports = anagrams;
