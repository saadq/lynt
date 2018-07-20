#!/usr/bin/env node

import meow from 'meow'
import chalk from 'chalk'
import cosmiconfig from 'cosmiconfig'
import { writeFileSync } from 'fs'
import lynt, { format } from '.'
import { getTSLintConfig } from './tslint/config'
import { getESLintConfig, getESLintIgnores } from './eslint/config'

const help = `
  Usage
    $ lynt [files] <options>

  Options
    --exportConfig Export tslint or eslint config to use with editors.
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
    $ lynt
    $ lynt --react
    $ lynt --flow
    $ lynt --react --flow
    $ lynt src
    $ lynt src --ignore dist --ignore build --env jest
    $ lynt src --global chrome --global atom

  TypeScript Examples
    $ lynt --typescript
    $ lynt --typescript --react
    $ lynt --typescript --project .
    $ lynt src --typescript
    $ lynt src --typescript --ignore dist --ignore build
`

const cli = meow({
  help,
  flags: {
    exportConfig: 'boolean',
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

if (options.exportConfig) {
  if (options.typescript) {
    const config = getTSLintConfig(options)
    writeFileSync('./tslint.json', JSON.stringify(config, null, 2))
    console.log(chalk.bold.green('\n\u2714 tslint.json generated\n'))
  } else {
    const config = getESLintConfig(options)
    const ignore = getESLintIgnores(options.ignore)
    writeFileSync('./eslintrc.json', JSON.stringify(config, null, 2))
    writeFileSync('./.eslintignore', ignore.join('\n'))
    console.log(chalk.bold.green('\n\u2714 eslintrc.json generated'))
    console.log(chalk.bold.green('\u2714 .eslintignore generated\n'))
  }
  process.exit(0)
}

const lyntResults = lynt(filePaths, options)

const output = options.json
  ? JSON.stringify(lyntResults, null, 4)
  : format(lyntResults)

const exitCode = lyntResults.length > 0 ? 1 : 0

console.log(output)
process.exit(exitCode)
