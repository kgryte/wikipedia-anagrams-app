'use strict';

// MODULES //
var request = require( 'request' );


// GET ANAGRAMS //

var body = {
	'resources': [
		'ballet',
		'http://en.wikipedia.org/wiki/mathematics'
	]
};

request( 'http://127.0.0.1:7311/anagrams', {
	'method': 'POST',
	'json': body
}, onAnagrams );

/**
* FUNCTION: onAnagrams( error, request, response )
*	Callback invoked after receiving a response from the server.
*
* @param {Object|null} error - error object
* @param {Object} response - HTTP response
* @param {String} body - HTTP response body
*/
function onAnagrams( error, response, body ) {
	if ( error ) {
		console.error( error );
		return;
	}
	console.log( body );
} // end FUNCTION onAnagrams()
