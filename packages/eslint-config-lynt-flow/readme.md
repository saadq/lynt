# eslint-config-lynt-flow

> The Flowtype ESLint config for [Lynt](https://github.com/saadq/lynt).

**Note**: This package is currently in beta.

## Installation

```bash
npm install eslint-config-lynt-flow --save-dev
```

If you don't have `babel-eslint`, make sure to install that as well.

```bash
npm install babel-eslint --save-dev
```

## Usage

Put the following in your ESLint config:

```json
{
  "parser": "babel-eslint",
  "extends": ["lynt-flow"]
}
```

## License
MIT &copy; Saad Quadri
