import { CLIEngine } from 'eslint'
import getConfig from './config'
import { LyntOptions, LyntResults } from '../types'

function eslint(paths: Array<string>, options: LyntOptions): LyntResults {
  const config = getConfig(options)
  const engine = new CLIEngine(config)
  const report = engine.executeOnFiles(paths)
  const format = options.json ? 'json' : 'stylish'
  const formatter = engine.getFormatter(format)

  if (options.fix) {
    CLIEngine.outputFixes(report)
  }

  const results: LyntResults = {
    errorCount: report.errorCount,
    output: formatter(report.results)
  }

  return results
}

export default eslint
