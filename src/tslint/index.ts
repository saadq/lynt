import { CLIEngine } from 'eslint'
import { Linter as TSLint, Configuration, ILinterOptions } from 'tslint'
import globby from 'globby'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import getConfig from './config'
import { LyntOptions, LyntResults } from '../types'

/**
 * Lint files using TSLint. Optionally adds extra React rules if `react` flag is
 * passed.
 *
 * @param paths Glob patterns of files to lint.
 * @param options A configuration object that lets you customize how lynt works.
 * @return A results object with an errorCount and output.
 */
function tslint(paths: Array<string>, options: LyntOptions) {
  if (paths.length === 0 && !options.project) {
    options.project = '.'
  }

  const configData = JSON.stringify(getConfig(options), null, 2)
  const configPath = join(__dirname, 'tslint.json')
  writeFileSync(configPath, configData)
  const configuration = Configuration.findConfiguration(configPath).results

  const tslintOptions: ILinterOptions = {
    fix: false,
    formatter: options.json ? 'json' : 'stylish'
  }

  let linter: TSLint
  let filesToLint: Array<string>

  if (options.project) {
    const program = TSLint.createProgram('tsconfig.json', options.project)
    linter = new TSLint(tslintOptions, program)
    filesToLint = TSLint.getFileNames(program)
  } else {
    linter = new TSLint(tslintOptions)
    filesToLint = globby.sync(paths)
  }

  filesToLint.forEach(file => {
    const fileContents = readFileSync(file, 'utf8')
    linter.lint(file, fileContents, configuration)
  })

  const { errorCount, output } = linter.getResult()

  const results: LyntResults = {
    errorCount,
    output
  }

  return results
}

export default tslint
