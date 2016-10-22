# negate-promise

[![NPM version](https://img.shields.io/npm/v/negate-promise.svg?style=flat-square)](https://npmjs.org/package/negate-promise)
[![LICENSE](http://img.shields.io/npm/l/api-error-handler.svg?style=flat-square)](LICENSE)
[![codecov](https://codecov.io/gh/tanhauhau/negate-promise/branch/master/graph/badge.svg)](https://codecov.io/gh/tanhauhau/negate-promise)

Negate a promise, reject resolved promise, resolve rejected promise

# Install

```sh
$ npm install --save negate-promise
```

# Usage

**negate a promise**

```javascript
var negate = require('negate-promise');

function isPromiseRejected(promise) {
	return negate(promise);
}

isPromiseRejected(Promise.reject()).then(function(){
    console.log('yeah, promise rejected');
});
```

**negate a callback style function**

```javascript
var negate = require('negate-promise');
var fs = require('fs');

function noSuchFile(path) {
	return negate(fs.stat)(path);
}

noSuchFile('/file/path').then(function(){
    console.log('yeah, no such file');
});
```

**negate something else**

```javascript
var negate = require('negate-promise');

negate(1).then(function(){
	//not called
}, function(data){
	console.log(data);
	//Wrong argument type. Must be either 'Promise' or 'Function'
});
```

# Documentation

*negate(promise)*

Return a rejected promise if the promise passed in is resolved, and a resolved promise if the promise passed in is rejected.
> *IKR, it's lengthy, but basically it means, 'negate your promise'*

*negate(function)*

Return a function that will return a negated promise.
> *Basically it means, 'promisify your function and negate that promise'*

*negate(others)*

Return a rejected promise.


## License

The MIT License (MIT)

Copyright (c) 2016 Tan Li Hau

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
