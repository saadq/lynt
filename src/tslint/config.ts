import { LyntOptions, TSLintConfig } from '../types'

function getReactConfig(config: TSLintConfig): TSLintConfig {
  return {
    ...config,
    rules: {
      ...config.rules,
      'jsx-key': true,
      'jsx-no-string-ref': true,
      'react-anchor-blank-noopener': true,
      'react-iframe-missing-sandbox': true
    }
  }
}

function getConfig(options: LyntOptions) {
  let config: TSLintConfig = {
    defaultSeverity: 'error',
    rulesDirectory: ['tslint-microsoft-contrib'],
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
      'no-unnecessary-type-assertion': true,
      'no-var-requires': true,
      'only-arrow-functions': [true, 'allow-named-functions'],
      'prefer-for-of': true,

      // Functionality
      'await-promise': true,
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
      'no-floating-promises': true,
      'no-for-in-array': true,
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
      'no-unused-variable': true,
      'no-use-before-declare': true,
      'no-var-keyword': true,
      'prefer-object-spread': true,
      radix: true,
      'restrict-plus-operands': true,
      'strict-type-predicates': true,
      'switch-default': true,
      'triple-equals': true,
      'use-default-type-parameter': true,
      'use-isnan': true,

      // Maintainability
      deprecation: true,
      eofline: true,
      'no-duplicate-imports': true,
      'no-require-imports': true,
      'prefer-const': true,
      'prefer-readonly': true,

      // Style (no aesthetic-only rules however)
      'no-irregular-whitespace': true,
      encoding: true,
      'interface-over-type-literal': true,
      'switch-final-break': true
    }
  }

  if (options.react) {
    config = getReactConfig(config)
  }

  return config
}

export default getConfig
