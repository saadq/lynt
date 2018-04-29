#!/usr/bin/env node

import meow from 'meow'
import lynt from '.'

const help = `
  Usage
    $ lynt [files] <options>

  Options
    --typescript   Add support for TypeScript.
    --flow         Add support for FlowType.
    --react        Add support for React.
    --ignore       Glob patterns for paths to ignore.
    --global       Add support for a given global variable.
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
    global: 'string',
    json: 'boolean',
    project: 'string'
  }
})

const { errorCount, output } = lynt(cli.input, cli.flags)

if (errorCount > 0) {
  process.stderr.write(output)
  process.exit(1)
}

process.stdout.write(output)
