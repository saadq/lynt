import { Config, Rules } from './types'
import { Options } from '../common/types'

/**
 * Get the ESLint config for lynt. Optionally adds extra React or Flow rules if
 * their corresponding flags are passed.
 *
 * @param options A configuration object that lets you customize how lynt works.
 * @return An object that is compatible with ESLint's config format.
 */
function getConfig(options: Options): Config {
  let config: Config = {
    useEslintrc: false,
    parserOptions: {
      ecmaVersion: 8,
      ecmaFeatures: {
        experimentalObjectRestSpread: true
      },
      sourceType: 'module'
    },
    plugins: [],
    globals: [],
    envs: ['es6', 'node', 'browser'],
    ignorePattern: [
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
    ],
    rules: {
      'no-compare-neg-zero': 'error',
      'no-cond-assign': 'error',
      'no-constant-condition': 'error',
      'no-control-regex': 'error',
      'no-dupe-args': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      'no-empty-character-class': 'error',
      'no-ex-assign': 'error',
      'no-extra-boolean-cast': 'error',
      'no-func-assign': 'error',
      'no-inner-declarations': 'error',
      'no-invalid-regexp': 'error',
      'no-irregular-whitespace': 'error',
      'no-obj-calls': 'error',
      'no-regex-spaces': 'error',
      'no-sparse-arrays': 'error',
      'no-unexpected-multiline': 'error',
      'no-unreachable': 'error',
      'no-unsafe-finally': 'error',
      'no-unsafe-negation': 'error',
      'use-isnan': 'error',
      'valid-typeof': [
        'error',
        {
          requireStringLiterals: true
        }
      ],
      'accessor-pairs': 'error',
      'block-scoped-var': 'error',
      curly: ['error', 'multi-line'],
      eqeqeq: [
        'error',
        'always',
        {
          null: 'ignore'
        }
      ],
      'no-caller': 'error',
      'no-case-declarations': 'error',
      'no-empty-pattern': 'error',
      'no-eval': 'error',
      'no-extend-native': 'error',
      'no-extra-bind': 'error',
      'no-fallthrough': 'error',
      'no-global-assign': 'error',
      'no-implied-eval': 'error',
      'no-iterator': 'error',
      'no-labels': 'error',
      'no-lone-blocks': 'error',
      'no-multi-str': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-octal': 'error',
      'no-octal-escape': 'error',
      'no-proto': 'error',
      'no-redeclare': 'error',
      'no-return-assign': 'error',
      'no-return-await': 'error',
      'no-self-assign': 'error',
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-throw-literal': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true
        }
      ],
      'no-useless-call': 'error',
      'no-useless-concat': 'error',
      'no-useless-escape': 'error',
      'no-useless-return': 'error',
      'no-with': 'error',
      'prefer-promise-reject-errors': 'error',
      radix: 'error',
      'wrap-iife': [
        'error',
        'any',
        {
          functionPrototypeMethods: true
        }
      ],
      'no-delete-var': 'error',
      'no-shadow-restricted-names': 'error',
      'no-undef': 'error',
      'no-undef-init': 'error',
      'no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'none',
          ignoreRestSiblings: true
        }
      ],
      'no-use-before-define': [
        'error',
        {
          functions: false,
          classes: false,
          variables: false
        }
      ],
      'handle-callback-err': ['error', '^(err|error)$'],
      'no-new-require': 'error',
      'no-path-concat': 'error',
      'constructor-super': 'error',
      'no-class-assign': 'error',
      'no-const-assign': 'error',
      'no-dupe-class-members': 'error',
      'no-new-symbol': 'error',
      'no-this-before-super': 'error',
      'no-useless-computed-key': 'error',
      'no-useless-constructor': 'error',
      'no-useless-rename': 'error',
      'symbol-description': 'error'
    }
  }

  if (options.react) {
    config = getReactConfig(config)
  }

  if (options.flow) {
    config = getFlowConfig(config)
  }

  if (options.global) {
    config = {
      ...config,
      globals: config.globals.concat(options.global)
    }
  }

  if (options.env) {
    config = {
      ...config,
      envs: config.envs.concat(options.env)
    }
  }

  if (options.ignore) {
    config = {
      ...config,
      ignorePattern: config.ignorePattern.concat(options.ignore)
    }
  }

  if (options.fix) {
    config = {
      ...config,
      fix: true
    }
  }

  if (options.rules) {
    config = normalizeRules(config, options.rules)
  }

  return config
}

/**
 * Takes the base ESLint config and adds additional React rules to it.
 *
 * @param config The current ESLint config.
 * @return A new object with the base config as well as additional React rules.
 */
function getReactConfig(config: Config): Config {
  return {
    ...config,
    parser: 'babel-eslint',
    parserOptions: {
      ...config.parserOptions,
      ecmaFeatures: {
        ...config.parserOptions.ecmaFeatures,
        jsx: true
      }
    },
    plugins: [...config.plugins, 'react'],
    rules: {
      ...config.rules,
      'react/display-name': 'error',
      'react/jsx-key': 'error',
      'react/jsx-no-comment-textnodes': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-target-blank': 'error',
      'react/jsx-no-undef': 'error',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/no-children-prop': 'error',
      'react/no-danger-with-children': 'error',
      'react/no-deprecated': 'error',
      'react/no-direct-mutation-state': 'error',
      'react/no-find-dom-node': 'error',
      'react/no-is-mounted': 'error',
      'react/no-render-return-value': 'error',
      'react/no-string-refs': 'error',
      'react/no-unescaped-entities': 'error',
      'react/no-unknown-property': 'error',
      'react/react-in-jsx-scope': 'error',
      'react/require-render-return': 'error'
    }
  }
}

/**
 * Takes the base ESLint config and adds additional Flowtype rules to it.
 *
 * @param config The current ESLint config.
 * @return A new object with the base config as well as additional React rules.
 */
function getFlowConfig(config: Config): Config {
  return {
    ...config,
    parser: 'babel-eslint',
    plugins: [...config.plugins, 'flowtype'],
    rules: {
      ...config.rules,
      'flowtype/define-flow-type': 'error',
      'flowtype/no-dupe-keys': 'error',
      'flowtype/no-primitive-constructor-types': 'error',
      'flowtype/no-types-missing-file-annotation': 'error',
      'flowtype/object-type-delimiter': ['error', 'comma'],
      'flowtype/use-flow-type': 'error'
    }
  }
}

/**
 * Takes the base ESLint config and adds additional rules that the user wants to
 * add to it. Style rules are still ignored and won't be added to the config.
 *
 * @param config The current ESLint config.
 * @param rules The custom rules the user wants to merge into the base config.
 * @return A new object with the base config as well as additional custom rules.
 */
function normalizeRules(config: Config, rules: Rules): Config {
  const styleRules = [
    'array-bracket-newline',
    'array-bracket-spacing',
    'array-element-newline',
    'block-spacing',
    'brace-style',
    'camelcase',
    'capitalized-comments',
    'comma-dangle',
    'comma-spacing',
    'comma-style',
    'computed-property-spacing',
    'consistent-this',
    'eol-last',
    'func-call-spacing',
    'func-name-matching',
    'func-names',
    'func-style',
    'function-paren-newline',
    'id-blacklist',
    'id-length',
    'id-match',
    'implicit-arrow-linebreak',
    'indent',
    'jsx-quotes',
    'key-spacing',
    'keyword-spacing',
    'line-comment-position',
    'linebreak-style',
    'lines-around-comment',
    'lines-between-class-members',
    'max-depth',
    'max-len',
    'max-lines',
    'max-nested-callbacks',
    'max-params',
    'max-statements',
    'max-statements-per-line',
    'multiline-comment-style',
    'multiline-ternary',
    'new-cap',
    'new-parens',
    'newline-per-chained-call',
    'no-array-constructor',
    'no-bitwise',
    'no-continue',
    'no-inline-comments',
    'no-lonely-if',
    'no-mixed-operators',
    'no-mixed-spaces-and-tabs',
    'no-multi-assign',
    'no-multiple-empty-lines',
    'no-negated-condition',
    'no-nested-ternary',
    'no-new-object',
    'no-plusplus',
    'no-restricted-syntax',
    'no-tabs',
    'no-ternary',
    'no-trailing-spaces',
    'no-underscore-dangle',
    'no-unneeded-ternary',
    'no-whitespace-before-property',
    'nonblock-statement-body-position',
    'object-curly-newline',
    'object-curly-spacing',
    'object-property-newline',
    'one-var',
    'one-var-declaration-per-line',
    'operator-assignment',
    'operator-linebreak',
    'padded-blocks',
    'padding-line-between-statements',
    'prefer-object-spread',
    'quote-props',
    'quotes',
    'require-jsdoc',
    'semi',
    'semi-spacing',
    'semi-style',
    'sort-keys',
    'sort-vars',
    'space-before-blocks',
    'space-before-function-paren',
    'space-in-parens',
    'space-infix-ops',
    'space-unary-ops',
    'spaced-comment',
    'switch-colon-spacing',
    'template-tag-spacing',
    'unicode-bom',
    'wrap-regex'
  ]

  // Remove style rules and allow usage of 'off/on' for rules
  const rulesWithoutStyles: Rules = Object.keys(rules)
    .filter(ruleName => !styleRules.includes(ruleName))
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

  return {
    ...config,
    rules: {
      ...config.rules,
      ...rulesWithoutStyles
    }
  }
}

export default getConfig
