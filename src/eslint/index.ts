import { CLIEngine as ESLint } from 'eslint'
import getConfig from './config'
import { LyntOptions, LyntResults } from '../types'

class ESLinter {
  options: LyntOptions

  /**
   * Create a new ESLinter instance.
   *
   * @param options Settings for customizing lynt.
   */
  constructor(options: LyntOptions) {
    this.options = options
  }

  /**
   * Lint files using ESLint.
   *
   * @param paths Glob patterns of files to lint.
   * @return A results object with an errorCount and output.
   */
  lint(paths: Array<string>): LyntResults {
    const config = getConfig(this.options)
    const engine = new ESLint(config)
    const report = engine.executeOnFiles(paths)
    const format = this.options.json ? 'json' : 'stylish'
    const formatter = engine.getFormatter(format)
    const output = formatter(report.results)

    const results: LyntResults = {
      errorCount: report.errorCount,
      output
    }

    return results
  }
}

export default ESLinter
