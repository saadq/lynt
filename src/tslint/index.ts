import execa from 'execa'
import globby from 'globby'
import { join } from 'path'
import { writeFileSync, unlinkSync, existsSync, readFileSync } from 'fs'
import getConfig from './config'
import { LyntOptions, LyntError } from '../types'
import format from './formatter'

/**
 * Lints files using the TSLint CLI via a child process.
 *
 * Though TSLint has a Node API, it only offers a subset of the features that
 * the CLI has, which is why it is not being used.
 *
 * @param paths An array of file globs that you want to lint.
 * @param options A configuration object that lets you customize how lynt works.
 * @return A `results` object with an errorCount and output.
 */
function tslint(paths: Array<string>, options: LyntOptions) {
  if (!options.project && paths.length === 0) {
    options.project = '.'
  }

  const configData = getConfig(options)
  const configPath = join(__dirname, 'tslint.json')
  writeFileSync(configPath, JSON.stringify(configData, null, 2))

  const tslintArgs: Array<string> = []

  if (paths) {
    tslintArgs.push(...globby.sync(paths))
  }

  tslintArgs.push('--config', configPath)
  tslintArgs.push('--format', 'json')

  if (options.project) {
    tslintArgs.push('--project', options.project)
  }

  let ignores: Array<string> = []

  if (options.ignore) {
    ignores = ignores.concat(options.ignore)
  }

  if (existsSync('.lyntignore')) {
    ignores = ignores.concat(readFileSync('.lyntignore', 'utf8').split('\n'))
  }

  if (ignores.filter(Boolean).length > 0) {
    globby
      .sync(ignores)
      .forEach(ignoreGlob => tslintArgs.push('--exclude', ignoreGlob))
  }

  try {
    execa.sync('tslint', tslintArgs)
    return { errorCount: 0, output: '' }
  } catch (err) {
    const lintErrors: Array<LyntError> = JSON.parse(err.stdout)
    return {
      errorCount: lintErrors.length,
      output: options.json ? lintErrors : format(lintErrors)
    }
  } finally {
    unlinkSync(configPath)
  }
}

export default tslint
