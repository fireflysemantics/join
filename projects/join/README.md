[![Build Status](https://travis-ci.org/fireflysemantics/join.svg?branch=master)](https://travis-ci.org/fireflysemantics/join)


# Join

## Install

```
npm i -S @fireflysemantics/join
npm i -S tslib
```

## Usage

```
import { join } from '@fireflysemantics/join'
console.log(join('http://www.example.com/', '/pity/the/foo/'))
console.log(join('http://www.example.com/','', '/pity/the/foo/'))

```

[Stackblitz Demo](https://stackblitz.com/edit/fireflysemantics-join?file=index.ts)
## Build

Run `npm run b` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `npm run b`, run `npm run p` to publish.

## Running unit tests

Run `npm t` to execute the unit tests via [Jest](https://jestjs.io/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).