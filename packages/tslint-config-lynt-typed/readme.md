# tslint-config-lynt-typed

>  TSLint config for Lynt with additional rules that require typechecking information.

[![Build Status](https://travis-ci.org/saadq/tslint-config-lynt-typed.svg?branch=master)](https://travis-ci.org/saadq/tslint-config-lynt-typed)

## Installation

```bash
npm install tslint-config-lynt tslint-config-lynt-typed --save-dev
```

## Usage

Put the following in your TSLint config:

```json
{
  "extends": ["tslint-config-lynt", "tslint-config-lynt-typed"]
}
```

Note that all of the rules in `tslint-config-lynt-typed` require the use of typechecking information. If you are running `tslint` without a `--project` flag, do not use this package and instead just use [`tslint-config-lynt`](https://github.com/saadq/tslint-config-lynt) on its own.

## License

MIT &copy; Saad Quadri
