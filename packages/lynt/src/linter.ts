import { CLIEngine } from 'eslint'
import { Linter as TSLinter, Configuration } from 'tslint'
import { resolve } from 'path'
import getConfig from './config'
import { LyntOptions, LyntResults } from './types'

class Linter {
  options: LyntOptions

  /**
   * @param options Settings for customizing lynt.
   */
  constructor(options: LyntOptions) {
    this.options = options
  }

  /**
   * Lint files using ESLint.
   *
   * @param paths Glob patterns of files to lint.
   */
  eslint(paths: Array<string>): LyntResults {
    const config = getConfig(this.options)
    const engine = new CLIEngine(config)
    const report = engine.executeOnFiles(paths.map(path => resolve(path)))
    const formatter = engine.getFormatter(this.options.json ? 'json' : 'stylish')
    const output = formatter(report.results)

    const results: LyntResults = {
      errorCount: report.errorCount,
      output
    }

    return results
  }

  /**
   * Lint files using TSLint.
   *
   * @param paths Glob patterns of files to lint.
   */
  tslint(paths: Array<string>): any {}

  /**
   * Lints files using TypeScript or ESLint based on the user's configured options.
   *
   * @param paths Glob patterns of files to lint.
   */
  lint(paths: Array<string>): LyntResults {
    if (this.options.typescript) {
      return this.tslint(paths)
    } else {
      return this.eslint(paths)
    }
  }
}

export default Linter
