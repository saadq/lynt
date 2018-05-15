#!/usr/bin/env node

import meow from 'meow'
import cosmiconfig from 'cosmiconfig'
import { existsSync, readFileSync } from 'fs'
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

const filePaths = cli.input
const options = cli.flags

const searchPlaces = ['package.json', '.lyntrc']
const explorer = cosmiconfig('lynt', { searchPlaces })
const configResults = explorer.searchSync()

if (configResults) {
  Object.assign(options, configResults.config)
}

const lyntResults = lynt(filePaths, options)

const output = options.json
  ? JSON.stringify(lyntResults, null, 4)
  : format(lyntResults)

const exitCode = lyntResults.length > 0 ? 1 : 0

console.log(output)
process.exit(exitCode)
