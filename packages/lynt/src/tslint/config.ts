import { Config } from './types'
import { Options } from '../common/types'

/**
 * Get the TSLint config for lynt. Optionally adds extra React rules if the
 * `react` flag is passed.
 *
 * @param options A configuration object that lets you customize how lynt works.
 * @return An object that is compatible with TSLint's config format.
 */
function getConfig(options: Options) {
  let config: Config = {
    extends: [],
    defaultSeverity: 'error',
    rulesDirectory: ['tslint-microsoft-contrib'],
    linterOptions: {
      exclude: []
    },
    rules: {
      // TypeScript-specific
      'adjacent-overload-signatures': true,
      'ban-types': {
        options: [
          ['Object', 'Did you mean `object`?'],
          ['Boolean', 'Did you mean `boolean`?'],
          ['Number', 'Did you mean `number`?'],
          ['String', 'Did you mean `string`?'],
          ['Symbol', 'Did you mean `symbol`?']
        ]
      },
      'no-empty-interface': true,
      'no-import-side-effect': true,
      'no-internal-module': true,
      'no-namespace': true,
      'no-non-null-assertion': true,
      'no-parameter-reassignment': true,
      'no-reference': true,
      'no-var-requires': true,
      'only-arrow-functions': [true, 'allow-named-functions'],
      'prefer-for-of': true,

      // Functionality
      'ban-comma-operator': true,
      curly: true,
      'no-arg': true,
      'no-conditional-assignment': true,
      'no-construct': true,
      'no-duplicate-super': true,
      'no-duplicate-switch-case': true,
      'no-duplicate-variable': true,
      'no-dynamic-delete': true,
      'no-empty': true,
      'no-eval': true,
      'no-implicit-dependencies': [true, 'dev', 'optional'],
      'no-invalid-template-strings': true,
      'no-invalid-this': true,
      'no-misused-new': true,
      'no-return-await': true,
      'no-shadowed-variable': true,
      'no-sparse-arrays': true,
      'no-string-throw': true,
      'no-switch-case-fall-through': true,
      'no-this-assignment': true,
      'no-unnecessary-class': true,
      'no-unsafe-finally': true,
      'no-unused-expression': [
        true,
        'allow-fast-null-checks',
        'allow-tagged-template'
      ],
      'no-var-keyword': true,
      'prefer-object-spread': true,
      radix: true,
      'switch-default': true,
      'triple-equals': true,
      'use-isnan': true,

      // Maintainability
      eofline: true,
      'no-duplicate-imports': true,
      'prefer-const': true,

      // Style (no aesthetic-only rules however)
      'no-irregular-whitespace': true,
      encoding: true,
      'interface-over-type-literal': true,
      'switch-final-break': true
    }
  }

  if (options.project) {
    config = {
      ...config,
      rules: {
        ...config.rules,
        'no-unnecessary-type-assertion': true,
        'await-promise': true,
        'no-floating-promises': true,
        'no-for-in-array': true,
        'no-unused-variable': true,
        'no-use-before-declare': true,
        'restrict-plus-operands': true,
        'strict-type-predicates': true,
        'use-default-type-parameter': true,
        deprecation: true,
        'prefer-readonly': true
      }
    }
  }

  if (options.react) {
    config = getReactConfig(config)
  }

  return config
}

/**
 * Takes the base TSLint config and adds additional React rules to it.
 *
 * @param config The current TSLint config.
 * @return A new object with the base config as well as additional React rules.
 */
function getReactConfig(config: Config): Config {
  return {
    ...config,
    extends: [...config.extends, 'tslint-react'],
    rules: {
      ...config.rules,
      'jsx-key': true,
      'jsx-no-string-ref': true,
      'react-anchor-blank-noopener': true,
      'react-iframe-missing-sandbox': true
    }
  }
}

export default getConfig
