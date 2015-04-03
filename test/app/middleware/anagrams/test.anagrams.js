/* global require, describe, it, beforeEach */
'use strict';

var mpath = './../../../../app/middleware/anagrams/anagrams.js';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Stub required modules:
	proxyquire = require( 'proxyquire' ),

	// Module to be tested:
	anagrams = require( mpath );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'app/middleware/anagrams/anagrams', function tests() {

	// SETUP //

	var request, response, next;

	request = {
		'body': {
			'resources': [
				'ballet',
				'mathematics'
			]
		},
		'locals': {}
	};
	response = {};
	next = function(){};

	beforeEach( function before() {
		request.locals = {};
	});


	// TESTS //

	it( 'should export a function', function test() {
		expect( anagrams ).to.be.a( 'function' );
	});

	it( 'should forward any errors', function test( done ) {
		var anagrams = proxyquire( mpath, {
			'wikipedia-anagrams': function getAnagrams( rsrc, opts, clbk ) {
				clbk( new Error() );
			}
		});

		next = function next( err ) {
			if ( err ) {
				assert.ok( true );
			} else {
				assert.ok( false );
			}
			done();
		};
		anagrams( request, response, next );
	});

	xit( 'should find anagrams in Wikipedia pages', function test( done ) {
		var anagrams = proxyquire( mpath, {
			'wikipedia-anagrams': function() {

			}
		});
		anagrams( request, response, next );
	});

	it( 'should invoke a callback after finding anagrams', function test( done ) {
		next = function next() {
			assert.ok( true );
			done();
		};
		anagrams( request, response, next );
	});

});
