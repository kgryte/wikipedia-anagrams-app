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



## Quick Start

To start the application server

``` bash
$ npm start
```

or, alternatively, from the top-level application directory

``` bash
$ node ./bin/cli
```

The default server `port` is `0`, in which case the port is [randomly assigned](https://nodejs.org/api/net.html#net_server_listen_port_host_backlog_callback) at run-time. To determine the run-time `port`, see the log output.

To view the application in your local web browser, navigate to

```
http://127.0.0.1:<port>
```

For advanced usage, see [below](#usage).



## Routes

#### POST /anagrams

Provides a RESTful endpoint for finding [anagrams](http://en.wikipedia.org/wiki/Anagram) in [Wikipedia](http://wikipedia.org) pages.


##### Request: (text/plain | application/json)

The request should include a JSON body having the following fields:

*	__resources__: a `string array` of Wikipedia page titles and/or URLs.
*	__lang__: [*optional*] a `string` specifying the default Wikipedia language. Default: `'en'`.


``` javascript
{
	"resources": [
		"<page title or url>",
		"<page title or url>"
	],
	"lang": "es"
}
```

##### Response: 200 (application/json)

The response body will be a JSON `string` of the form

``` javascript
{
	"<page title or url>": [[],[],...],
	"<page title or url>": [[],[],...],
	...
	"__merged__": [[],[],...]
}
```

where the object *keys* map to the original resource `string array`. If no anagrams are found for a particular Wikipedia page, the associated value is `null`.

The response includes one additional *key*: `__merged__`. The value associated with this *key* is the list of anagrams found across all resources. For more details, see [compute-anagram-hash](https://github.com/compute-io/anagram-hash) and [wikipedia-anagrams](https://github.com/kgryte/wikipedia-anagrams).


##### Error: 400 (application/json)

If provided invalid body parameters, the response will contain the error `status` and an associated `message`

``` javascript
{
	"status": 400,
	"message": "..."
}
```


##### Examples

From the command-line,

``` bash
$ curl -X POST -d '{"resources":["ballet","mathematics"]}' 'http://127.0.0.1:<port>/anagrams' --header "Content-type:application/json"
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

request( 'http://127.0.0.1:<port>/anagrams', {
	'method': 'POST',
	'json': body
}, onAnagrams );

function onAnagrams( error, response, body ) {
	if ( error ) {
		console.error( error );
		return;
	}
	console.log( body );
}
```

A request will receive a response body similar to the following

``` javascript
{
	"ballet": [
		["form","from"],
		["own","now"],
		["on","no"],
		["are","era"],
		["there","three"],
		["large","regal"],
		["theatre","theater"]
	],
	"mathematics": [
		["from","form"],
		["there","three"],
		["predictions","description"],
		["on","no"],
		["at","ta"],
		["own","now"],
		["how","who"],
		["items","times"],
		["peirces","precise"],
		["deal","lead"],
		["deals","leads"],
		["setting","testing"]
	],
	"__merged__": [
		["form","from"],
		["own","now"],
		["on","no"],
		["are","era"],
		["there","three"],
		["who","how"],
		["large","regal"],
		["precise","peirces"],
		["neo","one"],
		["departed","predated"],
		["theatre","theater"],
		["able","abel"],
		["predictions","description"],
		["at","ta"],
		["items","times"],
		["deal","lead"],
		["deals","leads"],
		["setting","testing"]
	]
}
```


#### GET /monitor

Provides a RESTful endpoint for monitoring the server application. The response body will be a JSON `string` of the form

``` javascript
{
  "system": {
    "uptime": 165238000,
    "load": {...},
    "mem": {...},
    "cpu": [...]
  },
  "process": {
    "pid": 10793,
    "uptime": 22000,
    "mem": {...},
    "lag": 1,
    "cpu": {...}
  },
  "response": {
    "count": 0,
    "time": {...},
    "bytes": {...}
  }
}
```

For more information about returned metrics, see [monitor-plugin-os](https://github.com/kgryte/monitor-plugin-os) and [monitor-plugin-process](https://github.com/kgryte/monitor-plugin-process).



#### PUT /loglevel

Provides a RESTful endpoint for setting the server application log level. This endpoint is useful when probing and/or debugging a live server.

The endpoint expects a JSON body having the following fields:

*	__level__: log level. The level may be specified as either a `string` or `number`. The `string` may be one of the following:
	-	__trace__




## Examples

To run the example code from the top-level application directory, in one terminal

``` bash
$ node ./bin/cli -p 7311
```

and in another terminal

``` bash
$ node ./examples/index.js
```



## Usage

``` bash
Usage: wikipedia-anagrams-app [options]

Options:

  -h,    --help                Print this message.
  -V,    --version             Print the package version.
  -p,    --port [port]         Specify the server port. Default: 0.
         --ssl                 Enable HTTPS.
         --key [path]          Path to SSL key file. Default: null.
         --cert [path]         Path to SSL certificate. Default: null.
         --loglevel [level]    Specify the log level. Default: info.
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
