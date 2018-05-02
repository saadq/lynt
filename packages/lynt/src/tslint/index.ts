import { Linter, Configuration, ILinterOptions } from 'tslint'
import globby from 'globby'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import getConfig from './config'
import { LyntOptions, LyntResults } from '../types'

class TSLint {
  projectRoot?: string
  configuration?: Configuration.IConfigurationFile
  options: ILinterOptions

  /**
   * Create a new ESLint instance.
   *
   * @param options A config object that lets you customize how lynt works.
   */
  constructor(options: LyntOptions) {
    const configPath = join(__dirname, 'tslint.json')
    const configData = getConfig(options)

    writeFileSync(configPath, configData)

    this.configuration = Configuration.findConfiguration(configPath).results
    this.projectRoot = options.project
    this.options = {
      fix: !!options.fix,
      formatter: options.json ? 'json' : 'stylish'
    }
  }

  /**
   * Lint files using TSLint.
   *
   * @param paths Glob patterns of files to lint.
   * @return A results object with an errorCount and output.
   */
  lintFiles(paths: Array<string>): LyntResults {
    if (!this.projectRoot && paths.length === 0) {
      this.projectRoot = '.'
    }

    let tslint: Linter
    let filesToLint: Array<string>

    if (this.projectRoot) {
      const tsconfig = join(this.projectRoot, 'tsconfig.json')
      const program = Linter.createProgram(tsconfig, this.projectRoot)
      tslint = new Linter(this.options, program)
      filesToLint = Linter.getFileNames(program)
    } else {
      tslint = new Linter(this.options)
      filesToLint = globby.sync(paths)
    }

    filesToLint.forEach(file => {
      const fileContents = readFileSync(file, 'utf8')
      tslint.lint(file, fileContents, this.configuration)
    })

    const { errorCount, output } = tslint.getResult()

    const results: LyntResults = {
      errorCount,
      output
    }

    return results
  }

  /**
   * Lint text using TSLint.
   *
   * @param text The code to be linted.
   * @param fileName An optional file name for the given code.
   * @return The results of running TSLint on the code.
   */
  lintText(text: string, fileName: string = 'code.ts'): LyntResults {
    const tslint = new Linter(this.options)
    tslint.lint(fileName, text, this.configuration)
    const { errorCount, output } = tslint.getResult()

    const results: LyntResults = {
      errorCount,
      output
    }

    return results
  }
}

export default TSLint
