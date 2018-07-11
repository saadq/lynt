# tslint-config-lynt

> The base TSLint config for [Lynt](https://github.com/saadq/lynt).

[![Build Status](https://travis-ci.org/saadq/tslint-config-lynt.svg?branch=master)](https://travis-ci.org/saadq/tslint-config-lynt)

## Installation

```bash
npm install tslint-config-lynt --save-dev
```

## Usage

Put the following in your TSLint config:

```json
{
  "extends": ["tslint-config-lynt"]
}
```

None of these rules require any typechecking information. If you want to add additional typechecking rules (recommended), please include [`tslint-config-lynt-typed`](https://github.com/saadq/tslint-config-lynt-typed) as well.

## License

MIT &copy; Saad Quadri
