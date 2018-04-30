import { CLIEngine } from 'eslint'
import getConfig from './config'
import { ESLintConfig, LyntOptions, LyntResults } from '../types'

class ESLint {
  eslint: CLIEngine
  format: 'json' | 'stylish'

  /**
   * Create a new ESLint instance.
   *
   * @param options A config object that lets you customize how lynt works.
   */
  constructor(options: LyntOptions) {
    const config = getConfig(options)
    this.eslint = new CLIEngine(config)
    this.format = options.json ? 'json' : 'stylish'
  }

  /**
   * Lint files using TSLint.
   *
   * @param paths Glob patterns of files to lint.
   * @return A results object with an errorCount and output.
   */
  lintFiles(paths: Array<string>): LyntResults {
    const report = this.eslint.executeOnFiles(paths)
    const formatter = this.eslint.getFormatter(this.format)
    const output = formatter(report.results)

    const results: LyntResults = {
      errorCount: report.errorCount,
      output
    }

    return results
  }
}

export default ESLint
