import { CLIEngine } from 'eslint'
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
      'prefer-const': 'error'
    }
  }

  return config
}

export default getConfig
