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
				'ballet'
			]
		},
		'locals': {}
	};
	response = {};
	next = function(){};

	beforeEach( function before() {
		request.body = {
			'resources': [
				'ballet'
			]
		};
		request.locals = {};
	});


	// TESTS //

	it( 'should export a function', function test() {
		expect( anagrams ).to.be.a( 'function' );
	});

	it( 'should forward any errors', function test( done ) {
		var anagrams, next;

		anagrams = proxyquire( mpath, {
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

	it( 'should append an `anagrams` results object to the request locals object', function test( done ) {
		var next = function next() {
			expect( request.locals.anagrams ).to.be.an( 'object' );
			done();
		};
		this.timeout( 10000 );
		anagrams( request, response, next );
	});

	it( 'should use additional options', function test( done ) {
		var anagrams;

		anagrams = proxyquire( mpath, {
			'wikipedia-anagrams': function getAnagrams( rsrc, opts, clbk ) {
				assert.strictEqual( opts.lang, 'es' );
				done();
			}
		});

		request.body.lang = 'es';
		anagrams( request, response, next );
	});

	it( 'should invoke a callback after finding anagrams', function test( done ) {
		var next = function next() {
			assert.ok( true );
			done();
		};
		this.timeout( 10000 );
		anagrams( request, response, next );
	});

});
