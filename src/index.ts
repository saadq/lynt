import { Lynt, LyntOptions, LyntResults } from './types'

/**
 * Uses ESLint or TSLint to lint a given set of files.
 *
 * @param paths An array of file globs that you want to lint.
 * @param options A configuration object that lets you customize how lynt works.
 * @return A `results` object with an errorCount and output.
 */
function lynt(paths: string | Array<string>, options: LyntOptions = {}) {
  if (!paths || (!Array.isArray(paths) && typeof paths !== 'string')) {
    throw new TypeError('paths mnust be a string or an array of strings')
  }

  const lint: Lynt = options.typescript
    ? require('./tslint').default
    : require('./eslint').default

  const files = Array.isArray(paths) ? paths : [paths]
  const results = lint(files, options)

  return results
}

export default lynt
