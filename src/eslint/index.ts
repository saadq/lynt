import { CLIEngine } from 'eslint'
import getConfig from './config'
import { LyntOptions, LyntResults } from '../types'

class ESLint {
  eslint: CLIEngine
  formatter: CLIEngine.Formatter

  /**
   * Create a new ESLint instance.
   *
   * @param options A config object that lets you customize how lynt works.
   */
  constructor(options: LyntOptions) {
    const config = getConfig(options)
    this.eslint = new CLIEngine(config)
    this.formatter = this.eslint.getFormatter(options.json ? 'json' : 'stylish')
  }

  /**
   * Lint files using ESLint.
   *
   * @param paths An array of glob patterns for files to be linted.
   * @return The results of running ESLint on the files.
   */
  lintFiles(paths: Array<string>): LyntResults {
    const report = this.eslint.executeOnFiles(paths)
    const output = this.formatter(report.results)

    return {
      errorCount: report.errorCount,
      output
    }
  }

  /**
   * Lint text using ESLint.
   *
   * @param text The code to be linted.
   * @param fileName An optional file name for the given code.
   * @return The results of running ESLint on the code.
   */
  lintText(text: string, fileName?: string): LyntResults {
    const report = this.eslint.executeOnText(text, fileName)
    const output = this.formatter(report.results)

    return {
      errorCount: report.errorCount,
      output
    }
  }
}

export default ESLint
