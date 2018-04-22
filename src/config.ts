import { CLIEngine } from 'eslint'
import { existsSync } from 'fs'
import { Options } from '.'

function getConfig(options: Options) {
  const config: CLIEngine.Options = {
    useEslintrc: false,
    parser: 'babel-eslint',
    parserOptions: {
      ecmaVersion: 8,
      ecmaFeatures: {
        experimentalObjectRestSpread: true,
        jsx: true
      },
      sourceType: 'module'
    },
    envs: ['es6', 'node', 'browser'],
    rules: {
      // Possible Errors
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
      'no-extra-semi': 'error',
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
      'valid-typeof': ['error', { requireStringLiterals: true }],

      // Best Practices
      'accessor-pairs': 'error',
      'block-scoped-var': 'error',
      curly: ['error', 'multi-line'],
      eqeqeq: ['error', 'always', { null: 'ignore' }],
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
      'wrap-iife': ['error', 'any', { functionPrototypeMethods: true }],
      yoda: 'error',

      // Variables
      'no-delete-var': 'error',
      'no-shadow-restricted-names': 'error',
      'no-undef': 'error',
      'no-undef-init': 'error',
      'no-unused-vars': [
        'error',
        { vars: 'all', args: 'none', ignoreRestSiblings: true }
      ],
      'no-use-before-define': [
        'error',
        { functions: false, classes: false, variables: false }
      ],

      // Node.js and CommonJS
      'handle-callback-err': ['error', '^(err|error)$'],
      'no-new-require': 'error',
      'no-path-concat': 'error',

      // ECMAScript 6
      'constructor-super': 'error',
      'no-class-assign': 'error',
      'no-const-assign': 'error',
      'no-dupe-class-members': 'error',
      'no-new-symbol': 'error',
      'no-this-before-super': 'error',
      'no-useless-computed-key': 'error',
      'no-useless-constructor': 'error',
      'no-useless-rename': 'error',
      'prefer-const': 'error',
      'symbol-description': 'error'
    }
  }

  const ignoreFile = '.lyntignore'

  if (existsSync(ignoreFile)) {
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
