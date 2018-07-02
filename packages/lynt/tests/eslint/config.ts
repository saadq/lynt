import getESLintOptions, {
  getESLintConfig,
  getESLintIgnores
} from '../../src/eslint/config'

const defaultIgnores = [
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

describe('getESLintOptions()', () => {
  it('has a options set by default', () => {
    const options = getESLintOptions({})
    expect(options).toEqual({
      useEslintrc: false,
      baseConfig: { extends: ['lynt'] },
      ignorePattern: defaultIgnores,
      parser: 'babel-eslint',
      fix: false
    })
  })

  it('can be set to fix mode', () => {
    const options = getESLintOptions({ fix: true })
    expect(options).toEqual({
      useEslintrc: false,
      baseConfig: { extends: ['lynt'] },
      ignorePattern: defaultIgnores,
      parser: 'babel-eslint',
      fix: true
    })
  })

  it('can have global variables added', () => {
    const options = getESLintOptions({ global: ['atom', 'chrome'] })
    expect(options).toEqual({
      useEslintrc: false,
      baseConfig: { extends: ['lynt'] },
      ignorePattern: defaultIgnores,
      parser: 'babel-eslint',
      fix: false,
      globals: ['atom', 'chrome']
    })
  })

  it('can have envs added', () => {
    const options = getESLintOptions({ env: 'jest' })
    expect(options).toEqual({
      useEslintrc: false,
      baseConfig: { extends: ['lynt'] },
      ignorePattern: defaultIgnores,
      parser: 'babel-eslint',
      fix: false,
      envs: ['jest']
    })
  })

  it('can have additional rules added to the config', () => {
    const options = getESLintOptions({
      rules: {
        'no-console': 'on'
      }
    })
    expect(options).toEqual({
      useEslintrc: false,
      baseConfig: { extends: ['lynt'] },
      ignorePattern: defaultIgnores,
      parser: 'babel-eslint',
      fix: false,
      rules: {
        'no-console': 'error'
      }
    })
  })

  it('can have default rules removed from the config', () => {
    const options = getESLintOptions({
      rules: {
        'prefer-const': 'off'
      }
    })
    expect(options).toEqual({
      useEslintrc: false,
      baseConfig: { extends: ['lynt'] },
      ignorePattern: defaultIgnores,
      parser: 'babel-eslint',
      fix: false,
      rules: {
        'prefer-const': 'off'
      }
    })
  })

  it('ignores style rules that the user tries to add to the config', () => {
    const options = getESLintOptions({
      rules: {
        semi: 'on',
        'no-console': 'on'
      }
    })
    expect(options).toEqual({
      useEslintrc: false,
      baseConfig: { extends: ['lynt'] },
      ignorePattern: defaultIgnores,
      parser: 'babel-eslint',
      fix: false,
      rules: {
        'no-console': 'error'
      }
    })
  })
})

describe('getESLintConfig()', () => {
  it('has a base config by default', () => {
    const config = getESLintConfig({})
    expect(config).toEqual({ extends: ['lynt'] })
  })

  it('can add on a react config', () => {
    const config = getESLintConfig({ react: true })
    expect(config).toEqual({ extends: ['lynt', 'lynt-react'] })
  })

  it('can add on a flow config', () => {
    const config = getESLintConfig({ flow: true })
    expect(config).toEqual({ extends: ['lynt', 'lynt-flow'] })
  })

  it('can add on a react and flow config', () => {
    const config = getESLintConfig({ react: true, flow: true })
    expect(config).toEqual({ extends: ['lynt', 'lynt-react', 'lynt-flow'] })
  })
})

describe('getESLintIgnores()', () => {
  it('has base ignores by default', () => {
    const ignores = getESLintIgnores()
    expect(ignores).toEqual([
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
    ])
  })

  it('can add additional ignores', () => {
    const ignores = getESLintIgnores(['assets/**', 'media/**'])
    expect(ignores).toEqual([
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
      'coverage/**',
      'assets/**',
      'media/**'
    ])
  })
})
