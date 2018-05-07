import execa from 'execa'
import { join } from 'path'
import { writeFileSync, unlinkSync as deleteFileSync } from 'fs'
import getConfig from './config'
import { LyntOptions, LyntError } from '../types'
import format from './formatter'

interface Bar {}

function tslint(paths: Array<string>, options: LyntOptions) {
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
    return { errorCount: 0, output: '' }
  } catch (err) {
    const lintErrors: Array<LyntError> = JSON.parse(err.stdout)
    return {
      errorCount: lintErrors.length,
      output: options.json ? lintErrors : format(lintErrors)
    }
  } finally {
    deleteFileSync(configPath)
  }
}

export default tslint
