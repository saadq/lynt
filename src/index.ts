import { CLIEngine } from 'eslint'
import { resolve } from 'path'
import getConfig from './config'

interface LyntOptions {
  react?: boolean
  flow?: boolean
  jest?: boolean
  ignore?: string | Array<string>
  global?: string | Array<string>
}

function lynt(paths: Array<string>, options: LyntOptions = {}) {
  if (!paths || !Array.isArray(paths)) {
    throw new Error('You must pass an array of paths to lynt()')
  }

  const config = getConfig(options)
  const engine = new CLIEngine(config)
  const report = engine.executeOnFiles(paths.map(path => resolve(path)))
  const formatter = engine.getFormatter('stylish')
  const results = formatter(report.results)

  if (report.errorCount > 0) {
    process.stderr.write(results)
    process.exit(1)
  }

  process.stdout.write(results)
}

export { LyntOptions }
export default lynt
