import { CLIEngine } from 'eslint'
import getConfig from './config'
import { Options, Results } from '../types'

/**
 * Lints files using ESLint.
 *
 * @param paths Glob patterns of files to lint.
 * @param options A configuration object that lets you customize how lynt works.
 * @return A `results` object with an errorCount and output.
 */
function eslint(paths: Array<string>, options: Options): Results {
  const config = getConfig(options) as CLIEngine.Options
  const engine = new CLIEngine(config)

  let filesToLint = paths

  if (paths.length === 0) {
    filesToLint = options.react ? ['**/*.js', '**.jsx'] : ['**/*.js']
  }

  const report = engine.executeOnFiles(filesToLint)
  const format = options.json ? 'json' : 'stylish'
  const formatter = engine.getFormatter(format)

  if (options.fix) {
    CLIEngine.outputFixes(report)
  }

  const results = formatter(report.results)

  return results
}

export default eslint
