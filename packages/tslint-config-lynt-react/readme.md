# tslint-config-lynt-react

>  TSLint config for [Lynt](https://github.com/saadq/lynt) with additional React rules.

## Installation

```bash
npm install tslint-config-lynt --save-dev
npm install tslint-config-lynt-typed --save-dev
npm install tslint-config-lynt-react --save-dev
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

Note that these rules in `tslint-config-lynt-typed` require the use of typechecking information. If you are running `tslint` without a `--project` flag, do not use this package or the `typed` package, and instead just use [`tslint-config-lynt`](https://github.com/saadq/tslint-config-lynt) on its own.

## License

MIT &copy; Saad Quadri
