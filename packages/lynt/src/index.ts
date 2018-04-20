import { CLIEngine } from 'eslint'
import { resolve } from 'path'
import getConfig from './config'

type Options = Partial<{
  typescript: boolean
  flow: boolean
  react: boolean
}>

function lynt(paths: Array<string>, options: Options = {}) {
  const config = getConfig(options)
  const engine = new CLIEngine(config)
  const report = engine.executeOnFiles(paths.map(path => resolve(path)))
  const formatter = engine.getFormatter('stylish')
  process.stdout.write(formatter(report.results))

  if (report.errorCount > 0) {
    process.exit(1)
  }
}

export { Options }
export default lynt
