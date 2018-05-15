import getESLintConfig from '../src/eslint/config'
import getTSLintConfig from '../src/tslint/config'

const baseESLintConfig = {
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
    'prefer-const': 'error',
    'symbol-description': 'error'
  }
}

const baseTSLintConfig = {
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
    'no-import-side-effect': true,
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
    eofline: true,
    'no-duplicate-imports': true,
    'prefer-const': true,
    'no-irregular-whitespace': true,
    encoding: true,
    'interface-over-type-literal': true,
    'switch-final-break': true
  }
}

describe('eslint config', () => {
  it('should have a base config by default', () => {
    const options = {}
    const expected = baseESLintConfig
    const actual = getESLintConfig(options)

    expect(actual).toEqual(expected)
  })

  it('can optionally add react support', () => {
    const options = {
      react: true
    }

    const expected = {
      ...baseESLintConfig,
      parser: 'babel-eslint',
      parserOptions: {
        ...baseESLintConfig.parserOptions,
        ecmaFeatures: {
          ...baseESLintConfig.parserOptions.ecmaFeatures,
          jsx: true
        }
      },
      plugins: ['react'],
      rules: {
        ...baseESLintConfig.rules,
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

    const actual = getESLintConfig(options)

    expect(actual).toEqual(expected)
  })

  it('can optionally add flow support', () => {
    const options = {
      flow: true
    }

    const expected = {
      ...baseESLintConfig,
      parser: 'babel-eslint',
      plugins: ['flowtype'],
      rules: {
        ...baseESLintConfig.rules,
        'flowtype/define-flow-type': 'error',
        'flowtype/no-dupe-keys': 'error',
        'flowtype/no-primitive-constructor-types': 'error',
        'flowtype/no-types-missing-file-annotation': 'error',
        'flowtype/object-type-delimiter': ['error', 'comma'],
        'flowtype/use-flow-type': 'error'
      }
    }

    const actual = getESLintConfig(options)

    expect(actual).toEqual(expected)
  })
})

describe('tslint config', () => {
  it('should have a base config by default', () => {
    const options = {}
    const expected = baseTSLintConfig
    const actual = getTSLintConfig(options)

    expect(actual).toEqual(expected)
  })

  it('can add extra typechecking rules when a project path is given', () => {
    const options = {
      project: '.'
    }

    const expected = {
      ...baseTSLintConfig,
      rules: {
        ...baseTSLintConfig.rules,
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

    const actual = getTSLintConfig(options)

    expect(actual).toEqual(expected)
  })

  it('can optionally add react support', () => {
    const options = {
      react: true
    }

    const expected = {
      ...baseTSLintConfig,
      extends: ['tslint-react'],
      rules: {
        ...baseTSLintConfig.rules,
        'jsx-key': true,
        'jsx-no-string-ref': true,
        'react-anchor-blank-noopener': true,
        'react-iframe-missing-sandbox': true
      }
    }

    const actual = getTSLintConfig(options)

    expect(actual).toEqual(expected)
  })

  it('can have extra typechecking rules and react support', () => {
    const options = {
      project: '.',
      react: true
    }

    const expected = {
      ...baseTSLintConfig,
      extends: ['tslint-react'],
      rules: {
        ...baseTSLintConfig.rules,
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
        'prefer-readonly': true,
        'jsx-key': true,
        'jsx-no-string-ref': true,
        'react-anchor-blank-noopener': true,
        'react-iframe-missing-sandbox': true
      }
    }

    const actual = getTSLintConfig(options)

    expect(actual).toEqual(expected)
  })
})
