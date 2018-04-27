import { existsSync } from 'fs'
import { LyntOptions, ESLintConfig } from './types'

const baseConfig: ESLintConfig = {
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    },
    sourceType: 'module'
  },
  plugins: [],
  envs: ['es6', 'node', 'browser'],
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
    yoda: 'error',
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
    'prefer-const': 'error',
    'symbol-description': 'error'
  }
}

function getReactConfig(config: ESLintConfig): ESLintConfig {
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
      'react/prop-types': 'error',
      'react/react-in-jsx-scope': 'error',
      'react/require-render-return': 'error'
    }
  }
}

function getFlowConfig(config: ESLintConfig): ESLintConfig {
  return {
    ...config,
    parser: 'babel-eslint',
    plugins: [...config.plugins!, 'flowtype'],
    rules: {
      ...config.rules,
      'flowtype/define-flow-type': 'error',
      'flowtype/delimiter-dangle': ['error', 'never'],
      'flowtype/no-dupe-keys': 'error',
      'flowtype/no-primitive-constructor-types': 'error',
      'flowtype/no-types-missing-file-annotation': 'error',
      'flowtype/object-type-delimiter': ['error', 'comma'],
      'flowtype/use-flow-type': 'error'
    }
  }
}

function getJestConfig(config: ESLintConfig): ESLintConfig {
  return {
    ...config,
    envs: [...config.envs!, 'jest']
  }
}

function getESLintConfig(options: LyntOptions): ESLintConfig {
  let config: ESLintConfig = {
    ...baseConfig,
    useEslintrc: false
  }

  if (options.react) {
    config = getReactConfig(config)
  }

  if (options.flow) {
    config = getFlowConfig(config)
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
  }

  if (options.ignore) {
    config = {
      ...config,
      ignorePattern: options.ignore
    }
  }

  return config
}

function getTSLintConfig(options: LyntOptions) {
  const config = {
    defaultSeverity: 'error',
    jsRules: {},
    rules: {
      semicolon: [true, 'never']
    }
  }

  return config
}

export { getESLintConfig, getTSLintConfig }
