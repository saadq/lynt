import { tslintStyles } from 'style-rules'
import { Config, Rules } from './types'
import { Options } from '../common/types'

/**
 * Get the TSLint config for lynt. Optionally adds extra React rules if the
 * `react` flag is passed.
 *
 * @param options A configuration object that lets you customize how lynt works.
 * @return An object that is compatible with TSLint's config format.
 */
function getTSLintConfig(options: Options) {
  const config: Config = {
    extends: ['tslint-config-lynt'],
    linterOptions: {
      exclude: getTSLintIgnores(options.ignore)
    }
  }

  if (options.project) {
    config.extends.push('tslint-config-lynt-typed')
  }

  if (options.react) {
    config.extends.push('tslint-config-lynt-react')
  }

  if (options.project && options.react) {
    config.extends.push('tslint-config-lynt-react-typed')
  }

  if (options.rules) {
    config.rules = normalizeRules(options.rules)
  }

  return config
}

/**
 * Get the ESLint ignores for Lynt.
 *
 * @param userIgnores Additional ignore patterns to be added to the default.
 * @return The combined ignores.
 */
function getTSLintIgnores(userIgnores?: Options['ignore']): Array<string> {
  let ignores: Array<string> = [
    '**/node_modules/**',
    '**/bower_components/**',
    '{tmp,temp}/**',
    '{test,tests,spec,__tests__}/fixture{s,}/**',
    'fixture{-*,}.{js,jsx,ts,tsx}',
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
 * Takes the base TSLint config and adds additional rules that the user wants to
 * add to it. Users can simply set rules to `on` or `off`, or use a more complex
 * setting. Style rules are still ignored and won't be added to the config.
 *
 * @param rules The custom rules the user wants to merge into the base config.
 * @return A new object with the base config as well as additional custom rules.
 */
function normalizeRules(rules: Rules): Rules {
  return Object.keys(rules)
    .filter(ruleName => !tslintStyles.includes(ruleName))
    .reduce((acc: Rules, ruleName) => {
      switch (rules[ruleName]) {
        case 'off':
        case false:
          acc[ruleName] = false
          break

        case 'on':
        case true:
          acc[ruleName] = true
          break

        default:
          acc[ruleName] = rules[ruleName]
      }

      return acc
    }, {})
}

export { getTSLintConfig, getTSLintIgnores }
