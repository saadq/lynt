import { Lynter, LyntOptions, LyntResults } from './types'

class Lynt {
  linter: Lynter

  /**
   * Creates a Lynt instance and sets the internal linter to eslint or tslint.
   *
   * @param options A config object that lets you customize how lynt works.
   */
  constructor(options: LyntOptions = {}) {
    const Linter: Lynter = options.typescript
      ? require('./tslint').default
      : require('./eslint').default

    this.linter = new Linter(options)
  }

  /**
   * Uses ESLint or TSLint to lint some given text.
   *
   * @param text The code to be linted.
   * @param fileName An optional file name for the given code.
   * @return The results of running ESLint or TSLint on the code.
   */
  lintText(text: string, fileName?: string): LyntResults {
    return this.linter.lintText(text, fileName)
  }

  /**
   * Uses ESLint or TSLint to lint a given set of files.
   *
   * @param paths An array of file globs that you want to lint.
   * @return The results of running ESLint or TSLint on the files.
   */
  lintFiles(paths: Array<string>): LyntResults {
    return this.linter.lintFiles(paths)
  }
}

export default Lynt
