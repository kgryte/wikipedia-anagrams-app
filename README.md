Wikipedia Anagrams App
===

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Provides a REST interface for finding anagrams in Wikipedia pages.


1. [Overview](#overview)
1. [Install](#installation)
1. [Run](#run)
1. [Tests](#tests)
	*	[Unit](#unit)
		-	[Server](#unit-server)
	*	[Coverage](#coverage)
		-	[Server](#coverage-server)
1. [License](#license)


---
## Overview




## Installation

``` bash
$ git clone https://github.com/kgryte/wikipedia-anagrams-app.git
```

Before running the application, install development dependencies

``` bash
$ make install-node
```

which installs [node modules](https://www.npmjs.org/).



## Run

To start the application server

``` bash
$ npm start
```

or, alternatively, from the top-level application directory

``` bash
$ node ./bin/server.js
```

To view the application in your local web browser, navigate to

```
http://127.0.0.1:7311
```


---
## Examples




---
## Tests

### Unit

<a name="unit-server"></a>
#### Server

Server-side unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command from the top-level application directory:

``` bash
$ make test-server
```


### Test Coverage

<a name="coverage-server"></a>
#### Server

To generate a test coverage report exclusively for server-side tests,

``` bash
$ make test-server-cov
```

Istanbul creates a `./reports/coverage/server` directory. To access an HTML version of the report,

``` bash
$ make view-server-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT). 


## Copyright

Copyright &copy; 2015. Athan Reines.


[screenshot-image]: https://github.com/kgryte/wikipedia-anagrams-app/.png
[screenshot-url]: https://github.com/kgryte/wikipedia-anagrams-app

[npm-image]: http://img.shields.io/npm/v/.svg
[npm-url]: https://npmjs.org/package/

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
