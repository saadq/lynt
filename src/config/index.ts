import { CLIEngine, Linter } from 'eslint'
import { existsSync } from 'fs'
import { LyntOptions } from '..'

const baseConfig: CLIEngine.Options = require('./base.json')

function getReactConfig(config: CLIEngine.Options) {
  const reactRules: CLIEngine.Options['rules'] = require('./react.json')
  return {
    ...config,
    parser: 'babel-eslint',
    parserOptions: {
      ...config.parserOptions,
      ecmaFeatures: {
        ...config.parserOptions!.ecmaFeatures,
        jsx: true
      }
    },
    plugins: [...config.plugins!, 'react'],
    rules: {
      ...config.rules,
      ...reactRules
    }
  }
}

function getJestConfig(config: CLIEngine.Options) {
  const jestConfig: CLIEngine.Options = {
    ...config,
    envs: [...config.envs!, 'jest']
  }

  return jestConfig
}

function getConfig(options: LyntOptions) {
  let config: CLIEngine.Options = {
    ...baseConfig,
    useEslintrc: false
  }

  if (options.react) {
    config = getReactConfig(config)
  }

  if (options.jest) {
    config = getJestConfig(config)
  }

  if (options.global) {
    config = {
      ...config,
      globals: Array.isArray(options.global) ? options.global : [options.global]
    }
  }

  const ignoreFile = '.lyntignore'

  if (existsSync(ignoreFile)) {
    config = {
      ...config,
      ignorePath: ignoreFile
    }
  } else if (options.ignore) {
    config = {
      ...config,
      ignorePattern: options.ignore
    }
  }

  return config
}

export default getConfig
