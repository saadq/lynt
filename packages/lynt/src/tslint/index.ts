import execa from 'execa'
import { join } from 'path'
import { writeFileSync, unlinkSync as deleteFileSync } from 'fs'
import getConfig from './config'
import { LyntOptions, LyntError, LyntResults } from '../types'

function tslint(paths: Array<string>, options: LyntOptions): LyntResults {
  if (!options.project && paths.length === 0) {
    options.project = '.'
  }

  const configData = getConfig(options)
  const configPath = join(__dirname, 'tslint.json')

  writeFileSync(configPath, JSON.stringify(configData, null, 2))

  const tslintArgs = []

  tslintArgs.push('--config', configPath)
  tslintArgs.push('--format', 'json')

  if (options.project) {
    tslintArgs.push('--project', options.project)
  }

  try {
    execa.sync('tslint', tslintArgs)
  } catch (err) {
    const lintErrors: Array<LyntError> = JSON.parse(err.stdout)

    if (options.json) {
      return {
        errorCount: lintErrors.length,
        output: lintErrors
      }
    }

    const errorMap: Map<string, Array<LyntError>> = new Map()

    lintErrors.forEach(lintErr => {
      const { name } = lintErr
      const errorsForCurrentFile = errorMap.get(name)
      if (errorsForCurrentFile) {
        errorsForCurrentFile.push(lintErr)
      } else {
        errorMap.set(name, [lintErr])
      }
    })
  }

  deleteFileSync(configPath)

  return {
    errorCount: 0,
    output: ''
  }
}

export default tslint
