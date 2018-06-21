import { Config, Rules } from './types'
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
      'no-internal-module': true,
      'no-namespace': true,
      'no-non-null-assertion': true,
      'no-parameter-reassignment': true,
      'no-reference': true,
      'no-var-requires': true,
      'only-arrow-functions': [true, 'allow-named-functions'],
      'prefer-for-of': true,
      'ban-comma-operator': true,
      curly: true,
      'no-arg': true,
      'no-conditional-assignment': true,
      'no-construct': true,
      'no-duplicate-super': true,
      'no-duplicate-switch-case': true,
      'no-dynamic-delete': true,
      'no-empty': true,
      'no-eval': true,
      'no-implicit-dependencies': [true, 'dev', 'optional'],
      'no-invalid-template-strings': true,
      'no-invalid-this': true,
      'no-misused-new': true,
      'no-return-await': true,
      'no-sparse-arrays': true,
      'no-string-throw': true,
      'no-switch-case-fall-through': true,
      'no-this-assignment': true,
      'no-unsafe-finally': true,
      'no-unused-expression': [
        true,
        'allow-fast-null-checks',
        'allow-tagged-template'
      ],
      'no-var-keyword': true,
      radix: true,
      'triple-equals': true,
      'use-isnan': true,
      eofline: true,
      'no-duplicate-imports': true,
      'no-irregular-whitespace': true,
      encoding: true,
      'interface-over-type-literal': true
    }
  }

  if (options.project) {
    config = {
      ...config,
      rules: {
        ...config.rules,
        'no-unnecessary-type-assertion': true,
        'await-promise': true,
        'no-for-in-array': true,
        'no-unused-variable': true,
        'no-use-before-declare': true,
        'restrict-plus-operands': true,
        'strict-type-predicates': true,
        'use-default-type-parameter': true,
        deprecation: true
      }
    }
  }

  if (options.react) {
    config = getReactConfig(config)
  }

  if (options.rules) {
    config = normalizeRules(config, options.rules)
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

/**
 * Takes the base TSLint config and adds additional rules that the user wants to
 * add to it. Style rules are still ignored and won't be added to the config.
 *
 * @param config The current TSLint config.
 * @param rules The custom rules the user wants to merge into the base config.
 * @return A new object with the base config as well as additional custom rules.
 */
function normalizeRules(config: Config, rules: Rules): Config {
  const styleRules = [
    'align',
    'array-type',
    'arrow-parens',
    'arrow-return-shorthand',
    'binary-expression-operand-order',
    'callable-types',
    'class-name',
    'comment-format',
    'completed-docs',
    'encoding',
    'file-header',
    'import-spacing',
    'interface-name',
    'interace-over-type-literal',
    'jsdoc-format',
    'match-default-export-name',
    'newline-before-return',
    'newline-per-chained-call',
    'new-parens',
    'no-angle-bracket-type-assertion',
    'no-boolean-literal-compare',
    'no-consecutive-blank-lines',
    'no-irregular-whitespace',
    'no-parameter-properties',
    'no-redundant-jsdoc',
    'no-reference-import',
    'no-trailing-whitespace',
    'no-unnecessary-callback-wrapper',
    'no-unnecessary-initializer',
    'no-unnecessary-qualifier',
    'number-literal-format',
    'object-literal-key-quotes',
    'object-literal-shorthand',
    'one-line',
    'one-variable-per-declaration',
    'ordered-imports',
    'prefer-function-over-method',
    'prefer-method-signature',
    'prefer-switch',
    'prefer-template',
    'prefer-while',
    'quotemark',
    'return-undefined',
    'semicolon',
    'space-before-function-paren',
    'space-within-parens',
    'switch-final-break',
    'type-literal-delimeter',
    'variable-name',
    'whitespace'
  ]

  // Remove style rules and allow usage of 'off/on' for rules
  const rulesWithoutStyles: Rules = Object.keys(rules)
    .filter(ruleName => !styleRules.includes(ruleName))
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

  return {
    ...config,
    rules: {
      ...config.rules,
      ...rulesWithoutStyles
    }
  }
}

export default getConfig
