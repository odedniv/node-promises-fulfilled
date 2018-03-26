# promises-fulfilled

[![Build Status](https://travis-ci.org/odedniv/node-promises-fulfilled.svg?branch=master)](https://travis-ci.org/odedniv/node-promises-fulfilled)

Given an array of promises, returns a promise that is resolved/rejected once *ALL* of the promises are fulfilled.

* If all promises are resolved, the returned promise is resolved with an array of all the results in the order of the given promises.
* If even one promise rejects, the returned promise is rejected with the error of the first rejected promise, but only after *ALL* promises have been fulfilled.

## Install

```bash
npm install --save promises-fulfilled
```

## Usage

```javascript
const fulfilled = require('promises-fulfilled');

fulfilled([p1, p2, p3])
  .then(...)
  .catch(...);
```

## License

MIT
