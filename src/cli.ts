#!/usr/bin/env node

import meow from 'meow'
import lynt from '.'
import { LyntResults } from './types'

const help = `
  Usage
    $ lynt [files] <options>

  Options
    --typescript   Add support for TypeScript.
    --flow         Add support for FlowType.
    --react        Add support for React.
    --jest         Add support for Jest globals.
    --ignore       Glob patterns for paths to ignore.
    --global       Add support for a given global variable.
    --json         Get lint results in JSON format instead of default "stylish" format.

  Examples
    $ lynt src
    $ lynt src --jest
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
    jest: 'boolean',
    ignore: 'string',
    global: 'string',
    json: 'boolean'
  }
})

const { errorCount, output } = lynt(cli.input, cli.flags)

if (errorCount > 0) {
  process.stderr.write(output)
  process.exit(1)
}

process.stdout.write(output)
