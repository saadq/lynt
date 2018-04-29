import { LyntOptions, LyntResults, Lynt } from './types'

/**
 * Uses ESLint or TSLint to lint a given set of files.
 *
 * @param paths An array of file globs that you want to lint
 * @param options A configuration object that lets you customize how lynt works.
 *
 * @return A results object with an errorCount and output.
 */
function lynt(paths: Array<string>, options: LyntOptions = {}): LyntResults {
  if (!paths || !Array.isArray(paths)) {
    throw new TypeError('You must pass an array of paths to lynt().')
  }

  if (options.flow && options.typescript) {
    throw new TypeError('You cannot use both Flow and Typescript at once.')
  }

  const lint: Lynt = options.typescript
    ? require('./tslint').default
    : require('./eslint').default

  const results = lint(paths, options)

  return results
}

export default lynt
