import { CLIEngine } from 'eslint'
import fs from 'fs'
import { Options } from '.'

function getConfig(options: Options) {
  const config: CLIEngine.Options = {
    useEslintrc: false,
    parserOptions: {
      ecmaVersion: 8,
      ecmaFeatures: {
        experimentalObjectRestSpread: true,
        jsx: true
      },
      sourceType: 'module'
    },
    envs: ['es6', 'node'],
    rules: {
      'prefer-const': 'error',
      'no-undef': 'error'
    }
  }

  const ignoreFile = '.lyntignore'

  if (fs.existsSync(ignoreFile)) {
    config.ignorePath = ignoreFile
  } else if (options.ignore) {
    config.ignorePattern = options.ignore
  }

  if (options.jest && config.envs) {
    config.envs.push('jest')
  }

  if (options.global) {
    config.globals = Array.isArray(options.global)
      ? options.global
      : [options.global]
  }

  return config
}

export default getConfig
