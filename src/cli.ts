#!/usr/bin/env node

import meow from 'meow'
import lynt, { format } from '.'

const help = `
  Usage
    $ lynt [files] <options>

  Options
    --typescript   Add support for TypeScript.
    --flow         Add support for FlowType.
    --react        Add support for React.
    --ignore       Glob patterns for paths to ignore.
    --fix          Automatically fix linting issues.
    --global       Add support for a given global variable.
    --env          Add support for a given environment.
    --json         Get lint results in JSON format instead of default "stylish" format.
    --project      Specify your project's main directory if it isn't in the root (only use with --typescript).

  JavaScript Examples
    $ lynt src
    $ lynt --typescript
    $ lynt src --ignore dist
    $ lynt src --ignore dist --ignore build
    $ lynt src --global chrome
    $ lynt src --global chrome --global atom
`

const cli = meow({
  help,
  flags: {
    typescript: 'boolean',
    flow: 'boolean',
    react: 'boolean',
    ignore: 'string',
    fix: 'boolean',
    global: 'string',
    env: 'string',
    json: 'boolean',
    project: 'string'
  }
})

const results = lynt(cli.input, cli.flags)

const output = cli.flags.json
  ? JSON.stringify(results, null, 4)
  : format(results)

console.log(output)
