import { CLIEngine } from 'eslint'
import { Linter as TSLint, Configuration, ILinterOptions } from 'tslint'
import globby from 'globby'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import getTSLintConfig from './config'
import { LyntOptions, LyntResults } from '../types'

class TSLinter {
  options: LyntOptions

  /**
   * Create a new TSLinter instance.
   *
   * @param options Settings for customizing lynt.
   */
  constructor(options: LyntOptions) {
    this.options = options
  }

  /**
   * Lint files using TSLint.
   *
   * @param paths Glob patterns of files to lint.
   * @return A results object with an errorCount and output.
   */
  lint(paths: Array<string>): LyntResults {
    if (paths.length === 0 && !this.options.project) {
      this.options.project = '.'
    }

    const configData = JSON.stringify(getTSLintConfig(this.options), null, 2)
    const configPath = join(__dirname, 'tslint.json')
    writeFileSync(configPath, configData)
    const configuration = Configuration.findConfiguration(configPath).results

    const options: ILinterOptions = {
      fix: false,
      formatter: this.options.json ? 'json' : 'stylish'
    }

    let linter: TSLint
    let filesToLint: Array<string>

    if (this.options.project) {
      const program = TSLint.createProgram(
        'tsconfig.json',
        this.options.project
      )
      linter = new TSLint(options, program)
      filesToLint = TSLint.getFileNames(program)
    } else {
      linter = new TSLint(options)
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
}

export default TSLinter
