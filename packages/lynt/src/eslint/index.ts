import { CLIEngine as ESLint } from 'eslint'
import getConfig from './config'
import { LyntOptions, LyntResults } from '../types'

/**
 * Lint files using TSLint.
 *
 * @param paths Glob patterns of files to lint.
 * @param options A configuration object that lets you customize how lynt works.
 * @return A results object with an errorCount and output.
 */
function eslint(paths: Array<string>, options: LyntOptions): LyntResults {
  const config = getConfig(options)
  const engine = new ESLint(config)
  const report = engine.executeOnFiles(paths)
  const format = options.json ? 'json' : 'stylish'
  const formatter = engine.getFormatter(format)
  const output = formatter(report.results)

  const results: LyntResults = {
    errorCount: report.errorCount,
    output
  }

  return results
}

export default eslint
