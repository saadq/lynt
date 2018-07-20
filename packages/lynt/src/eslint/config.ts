import { eslintStyles } from 'style-rules'
import { Config, Rules, ESLintOptions } from './types'
import { Options } from '../common/types'

/**
 * Get an options object that can be used directly with ESLint's CLIEngine.
 *
 * @param options A config object that lets the user customize how Lynt works.
 * @return An object that is compatible with ESLint's CLIEngine options format.
 */
function getESLintOptions(options: Options): ESLintOptions {
  const engineOptions: ESLintOptions = {
    useEslintrc: false,
    baseConfig: getESLintConfig(options),
    ignorePattern: getESLintIgnores(options.ignore),
    parser: 'babel-eslint',
    fix: !!options.fix
  }

  if (options.global) {
    engineOptions.globals = Array.isArray(options.global)
      ? options.global
      : [options.global]
  }

  if (options.env) {
    engineOptions.envs = Array.isArray(options.env)
      ? options.env
      : [options.env]
  }

  if (options.rules) {
    engineOptions.rules = normalizeRules(options.rules)
  }

  return engineOptions
}

/**
 * Get the ESLint config for lynt. Optionally adds extra React or Flow rules if
 * their corresponding flags are passed.
 *
 * @param options A configuration object that lets you customize how lynt works.
 * @return An object that is compatible with ESLint's config format.
 */
function getESLintConfig(options: Options): Config {
  const config: Config = {
    extends: ['lynt']
  }

  if (options.react) {
    config.extends.push('lynt-react')
  }

  if (options.flow) {
    config.extends.push('lynt-flow')
  }

  return config
}

/**
 * Get the ESLint ignores for Lynt.
 *
 * @param userIgnores Additional ignore patterns to be added to the default.
 * @return The combined ignores.
 */
function getESLintIgnores(userIgnores?: Options['ignore']): Array<string> {
  let ignores: Array<string> = [
    '**/node_modules/**',
    '**/bower_components/**',
    '**/flow-typed/**',
    '**/elm-stuff/**',
    '**/*.min.js',
    '**/bundle.js',
    '{tmp,temp}/**',
    '{test,tests,spec,__tests__}/fixture{s,}/**',
    'fixture{-*,}.{js,jsx}',
    'fixture{s,}/**',
    'vendor/**',
    'dist/**',
    'coverage/**'
  ]

  if (userIgnores) {
    ignores = ignores.concat(userIgnores)
  }

  return ignores
}

/**
 * Takes the base ESLint config and adds additional rules that the user wants to
 * add to it. Users can simply set rules to `on` or `off`, or use a more complex
 * setting. Style rules are still ignored and won't be added to the config.
 *
 * @param rules The custom rules the user wants to merge into the base config.
 * @return A new object with the base config as well as additional custom rules.
 */
function normalizeRules(rules: Rules): Rules {
  return Object.keys(rules)
    .filter(ruleName => !eslintStyles.includes(ruleName))
    .reduce((acc: Rules, ruleName) => {
      switch (rules[ruleName]) {
        case 'off':
        case false:
          acc[ruleName] = 'off'
          break

        case 'on':
        case true:
          acc[ruleName] = 'error'
          break

        default:
          acc[ruleName] = rules[ruleName]
      }

      return acc
    }, {})
}

export { getESLintOptions, getESLintConfig, getESLintIgnores }
