import execa from 'execa'
import { join } from 'path'
import { writeFileSync, existsSync } from 'fs'
import { getTSLintConfig } from './config'
import convert from './convert'
import { Results as TSLintResults } from './types'
import { Options, Results } from '../common/types'

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
function tslint(paths: Array<string>, options: Options): Results {
  if (!options.project && paths.length === 0) {
    options.project = '.'
  }

  const configData = getTSLintConfig(options)
  const configPath = join(__dirname, 'tslint.json')
  writeFileSync(configPath, JSON.stringify(configData, null, 2))

  const tslintArgs: Array<string> = []

  if (paths) {
    tslintArgs.push(...paths)
  }

  tslintArgs.push('--config', configPath)
  tslintArgs.push('--format', 'json')

  if (options.project) {
    if (!existsSync(join(options.project, 'tsconfig.json'))) {
      throw new Error(
        'You must have a tsconfig.json file in your project root or point to it with a --project flag'
      )
    }

    tslintArgs.push('--project', options.project)
  }

  if (options.fix) {
    tslintArgs.push('--fix')
  }

  if (options.ignore) {
    const ignores = Array.isArray(options.ignore)
      ? options.ignore
      : [options.ignore]

    ignores.forEach(glob => tslintArgs.push('--exclude', glob))
  }

  let results: Results = []

  try {
    execa.sync('tslint', tslintArgs)
  } catch (lynt) {
    try {
      const tslintResults: TSLintResults = JSON.parse(lynt.stdout)
      results = convert(tslintResults)
    } catch (jsonErr) {
      throw new Error(lynt.stdout || lynt.stderr || jsonErr)
    }
  }

  return results
}

export default tslint
