import eslint from './eslint'
import tslint from './tslint'
import { Options, Results } from './common/types'

/**
 * Uses ESLint or TSLint to lint a given set of files.
 *
 * @param paths An array of file globs that you want to lint.
 * @param options A configuration object that lets you customize how lynt works.
 * @return An array of lint errors.
 */
function lynt(paths: string | Array<string>, options: Options = {}): Results {
  if (!paths) {
    throw new TypeError('You must pass in path(s) of files to lint.')
  }

  if (typeof paths !== 'string' && !Array.isArray(paths)) {
    throw new TypeError('paths must be a string or array of strings.')
  }

  if (options.typescript && options.flow) {
    throw new TypeError('You cannot use TypeScript and Flow together.')
  }

  const files = Array.isArray(paths) ? paths : [paths]

  const results = options.typescript
    ? tslint(files, options)
    : eslint(files, options)

  return results
}

export { default as format } from './common/format'
export default lynt
