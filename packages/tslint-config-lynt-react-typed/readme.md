# tslint-config-lynt-react-typed

>  TSLint config for [Lynt](https://github.com/saadq/lynt) with additional typechecking React rules.

[![Build Status](https://travis-ci.org/saadq/tslint-config-lynt-react-typed.svg?branch=master)](https://travis-ci.org/saadq/tslint-config-lynt-react-typed)

## Installation

```bash
npm install tslint-config-lynt --save-dev
npm install tslint-config-lynt-typed --save-dev
npm install tslint-config-lynt-react --save-dev
npm install tslint-config-lynt-react-typed --save-dev
```

## Usage

Put the following in your TSLint config:

```json
{
  "extends": [
    "tslint-config-lynt",
    "tslint-config-lynt-typed",
    "tslint-config-lynt-react"
  ]
}
```

Note that these rules require the use of typechecking information. If you are running `tslint` without a `--project` flag, do not use this package, and instead just use [`tslint-config-lynt`](https://github.com/saadq/tslint-config-lynt) and [`tslint-config-lynt-react`](https://github.com/saadq/tslint-config-lynt-react)` on its own.

## License

MIT &copy; Saad Quadri
