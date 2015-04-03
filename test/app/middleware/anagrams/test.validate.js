/* global require, describe, it, beforeEach */
'use strict';

var mpath = './../../../../app/middleware/anagrams/validate.js';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	validate = require( mpath );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'app/middleware/anagrams/validate', function tests() {

	// SETUP //

	var request, response, next;

	request = {
		'body': {
			'resources': [
				'ballet',
				'mathematics'
			]
		}
	};
	response = {};
	next = function(){};

	beforeEach( function() {
		request.body = {
			'resources': [
				'ballet',
				'mathematics'
			]
		};
	});


	// TESTS //

	it( 'should export a function', function test() {
		expect( validate ).to.be.a( 'function' );
	});

	it( 'should invoke a callback after successfully validating', function test( done ) {
		next = function( error ) {
			if ( error ) {
				assert.notOk( true );
			} else {
				assert.ok( true );
			}
			done();
		};
		validate( request, response, next );
	});

	it( 'should return an error if provided an invalid `resources` parameter', function test( done ) {
		var values, count;

		values = [
			5,
			null,
			undefined,
			NaN,
			true,
			{},
			function(){},
			['a',null],
			['a',1],
			[]
		];

		next = function( error ) {
			if ( error ) {
				assert.ok( true );
			} else {
				assert.notOk( true );
			}
			if ( ++count === values.length ) {
				done();
			}
		};

		count = 0;
		for ( var i = 0; i < values.length; i++ ) {
			request.body.resources = values[ i ];
			validate( request, response, next );
		}
	});

	it( 'should return an error if provided an invalid `lang` parameter', function test( done ) {
		var values, count;

		values = [
			5,
			null,
			undefined,
			NaN,
			true,
			{},
			[],
			function(){}
		];

		next = function( error ) {
			if ( error ) {
				assert.ok( true );
			} else {
				assert.notOk( true );
			}
			if ( ++count === values.length ) {
				done();
			}
		};

		count = 0;
		for ( var i = 0; i < values.length; i++ ) {
			request.body.lang = values[ i ];
			validate( request, response, next );
		}
	});

});
