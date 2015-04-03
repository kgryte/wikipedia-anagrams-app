Wikipedia Anagrams App
===

[![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Provides a REST interface for finding [anagrams](http://en.wikipedia.org/wiki/Anagram) in [Wikipedia](http://wikipedia.org) pages.


## Installation

``` bash
$ git clone https://github.com/kgryte/wikipedia-anagrams-app.git
```

The application runs on [Node.js](https://nodejs.org/). Before running the application, install [dependencies](https://www.npmjs.org/) by executing the following command

``` bash
$ make install
```



## Run

To start the application server

``` bash
$ npm start
```

or, alternatively, from the top-level application directory

``` bash
$ node ./bin/server
```

To view the application in your local web browser, navigate to

```
http://127.0.0.1:7311
```

The application runs on port `7311`.


## Routes

#### POST /anagrams

Provides a RESTful endpoint for finding [anagrams](http://en.wikipedia.org/wiki/Anagram) in [Wikipedia](http://wikipedia.org) pages. The endpoint expects a JSON body having the following fields:

*	__resources__: a `string array` of Wikipedia page titles and/or URLs.
*	__lang__: [optional] a `string` specifying the default Wikipedia language. Default: `'en'`.


``` javascript
{
	"resources": [
		"<page title or url>",
		"<page title or url>"
	],
	"lang": "es"
}
```

The response body will be a JSON `string` of the form

``` javascript
{
	"<page title or url>": [[],[],...],
	"<page title or url>": [[],[],...],
	...
	"__merged__": [[],[],...]
}
```

where the object *keys* map to the original resource `string array`. If no anagrams are found for a particular Wikipedia page, the value will be `null`.

The response includes one additional *key*: `__merged__`. The value associated with this *key* is the list of anagrams found across all resources.





## Examples

From the command-line,

``` bash
$ curl -X POST -d '{"resources":["ballet","mathematics"]}' 'http://127.0.0.1:7311/anagrams' --header "Content-type:application/json"
```

From another [Node](https://nodejs.org/) application,

``` javascript
var request = require( 'request' );

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

// Response callback...
function onAnagrams( error, response, body ) {
	if ( error ) {
		console.error( error );
		return;
	}
	console.log( body );
}
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```



---
## License

[MIT license](http://opensource.org/licenses/MIT). 


## Copyright

Copyright &copy; 2015. Athan Reines.


[travis-image]: http://img.shields.io/travis/kgryte/wikipedia-anagrams-app/master.svg
[travis-url]: https://travis-ci.org/kgryte/wikipedia-anagrams-app

[coveralls-image]: https://img.shields.io/coveralls/kgryte/wikipedia-anagrams-app/master.svg
[coveralls-url]: https://coveralls.io/r/kgryte/wikipedia-anagrams-app?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/wikipedia-anagrams-app.svg
[dependencies-url]: https://david-dm.org/kgryte/wikipedia-anagrams-app

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/wikipedia-anagrams-app.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/wikipedia-anagrams-app

[github-issues-image]: http://img.shields.io/github/issues/kgryte/wikipedia-anagrams-app.svg
[github-issues-url]: https://github.com/kgryte/wikipedia-anagrams-app/issues
