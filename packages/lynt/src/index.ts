import Linter from './linter'
import { LyntOptions, LyntResults } from './types'

/**
 * Uses ESLint or TSLint to lint a given set of files.
 *
 * @param paths An array of file globs that you want to lint
 * @param options A configuration object that lets you customize how lynt works.
 */
function lynt(paths: Array<string>, options: LyntOptions = {}): LyntResults {
  if (!paths || !Array.isArray(paths)) {
    throw new Error('You must pass an array of paths to lynt()')
  }

  const linter = new Linter(options)
  const results = linter.lint(paths)

  return results
}

export default lynt
