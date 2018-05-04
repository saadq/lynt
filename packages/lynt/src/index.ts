import { Lynt, LyntOptions, LyntResults } from './types'

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
