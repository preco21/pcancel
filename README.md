# pcancel

[![Code Style Prev](https://img.shields.io/badge/code%20style-prev-32c8fc.svg?style=flat-square)](https://github.com/preco21/eslint-config-prev)
[![NPM Version](https://img.shields.io/npm/v/pcancel.svg?style=flat-square)](https://www.npmjs.com/package/pcancel)
[![Build Status](https://img.shields.io/travis/preco21/pcancel/master.svg?style=flat-square)](https://travis-ci.org/preco21/pcancel)
[![Dependency Status](https://dependencyci.com/github/preco21/pcancel/badge?style=flat-square)](https://dependencyci.com/github/preco21/pcancel)

> Wrap promise function into cancelable promise function

Sometimes you may need to create cancelable promise for situation like to avoid [isMounted antipattern in React](https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html). `pcancel` provides simple utility for creating cancelable promises. Highly inspired from [this comment](https://github.com/facebook/react/issues/5465#issuecomment-157888325).

## Install

```bash
$ npm install pcancel
```

## Usage

```javascript
import pcancel from 'pcancel';

const delayC = pcancel(delay);
const p = delayC(4000)
  .promise
  .then(() => console.log('Yey!'))
  .catch((err) => console.error(err));

p.cancel(); // Error: Promise has canceled

function delay(time) {
  return new Promise((resolve) => setTimeout(() => resolve(), time));
}
```

## API

### pcancel(fn[, options])

* `fn` Function - Promise-returning function that will be cancelable.
* `options` Object (optional)
  * `noReject` Boolean - Whether to reject when canceling. If this option is `true`, the promise will be resolved with the value passed through to `cancel()` method on the promise.

Returns a wrapped function that returns object includes `Promise` instance and `cancel()` function.

You can also specify error or value through `cancel()` method, the specified value will be returned instead of value of the promise:

```javascript
p.cancel(new Error('Foo')); // Error: Foo
```

**Note:** `cancel()` rejects the promise immediately when it called.

## License

[MIT](https://preco.mit-license.org/)
