import { Lynt, LyntOptions, LyntResults } from './types'

/**
 * Uses ESLint or TSLint to lint a given set of files.
 *
 * @param paths An array of file globs that you want to lint.
 * @param options A configuration object that lets you customize how lynt works.
 * @return A `results` object with an errorCount and output.
 */
function lynt(paths: string | Array<string>, options: LyntOptions = {}) {
  if (!paths) {
    throw new TypeError('You must pass in path(s) of files to lint.')
  }

  if (typeof paths !== 'string' && !Array.isArray(paths)) {
    throw new TypeError('paths must be a string or array of strings.')
  }

  if (options.typescript && options.flow) {
    throw new TypeError('You cannot use TypeScript and Flow together.')
  }

  const lint: Lynt = options.typescript
    ? require('./tslint').default
    : require('./eslint').default

  const files = Array.isArray(paths) ? paths : [paths]
  const results = lint(files, options)

  return results
}

export default lynt
