# pcancel

[![Greenkeeper badge](https://badges.greenkeeper.io/preco21/pcancel.svg)](https://greenkeeper.io/)

[![Code Style Prev](https://img.shields.io/badge/code%20style-prev-32c8fc.svg?style=flat-square)](https://github.com/preco21/eslint-config-prev)
[![NPM Version](https://img.shields.io/npm/v/pcancel.svg?style=flat-square)](https://www.npmjs.com/package/pcancel)
[![Build Status](https://img.shields.io/travis/preco21/pcancel/master.svg?style=flat-square)](https://travis-ci.org/preco21/pcancel)
[![Dependency Status](https://dependencyci.com/github/preco21/pcancel/badge?style=flat-square)](https://dependencyci.com/github/preco21/pcancel)

> Wrap promise function into cancelable promise function

## Install

```bash
$ npm install --save pcancel
```

## Usage

```javascript
import pcancel from 'pcancel';

const cDelay = pcancel(delay);
const p = cDelay(6000)
  .promise
  .then(() => console.log('Yey!'))
  .catch((err) => console.error(err));

p.cancel(); // Error: Promise has canceled

function delay(time) {
  return new Promise((resolve, reject) => setTimeout(() => resolve(), time));
}
```

## API

### pcancel(fn)

* `fn` Function - Promise-returning function that will be cancelable.

Returns a wrapped function that returns object includes `Promise` instance and `cancel()` function.

**Note:** `cancel()` rejects the promise immediately when it called.

You can also specify what error will be returned:

```javascript
p.cancel(new Error('Foo')); // Error: Foo
```

## License

[MIT](https://preco.mit-license.org/)
