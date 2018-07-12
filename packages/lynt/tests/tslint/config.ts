import { getTSLintConfig, getTSLintIgnores } from '../../src/tslint/config'

const defaultIgnores = [
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

describe('getTSLintConfig()', () => {
  it('has a base config by default', () => {
    const options = { typescript: true }
    const config = getTSLintConfig(options)
    expect(config).toEqual({
      extends: ['tslint-config-lynt'],
      linterOptions: {
        exclude: defaultIgnores
      }
    })
  })

  it('can add on typechecking config', () => {
    const options = { typescript: true, project: '.' }
    const config = getTSLintConfig(options)
    expect(config).toEqual({
      extends: ['tslint-config-lynt', 'tslint-config-lynt-typed'],
      linterOptions: {
        exclude: defaultIgnores
      }
    })
  })

  it('can add on react config', () => {
    const options = { typescript: true, react: true }
    const config = getTSLintConfig(options)
    expect(config).toEqual({
      extends: ['tslint-config-lynt', 'tslint-config-lynt-react'],
      linterOptions: {
        exclude: defaultIgnores
      }
    })
  })

  it('can add on typechecking and react config', () => {
    const options = { typescript: true, project: '.', react: true }
    const config = getTSLintConfig(options)
    expect(config).toEqual({
      extends: [
        'tslint-config-lynt',
        'tslint-config-lynt-typed',
        'tslint-config-lynt-react',
        'tslint-config-lynt-react-typed'
      ],
      linterOptions: {
        exclude: defaultIgnores
      }
    })
  })

  it('can have additional custom rules added to the config', () => {
    const options = {
      typescript: true,
      rules: {
        'no-console': 'on'
      }
    }
    const config = getTSLintConfig(options)
    expect(config).toEqual({
      extends: ['tslint-config-lynt'],
      linterOptions: {
        exclude: defaultIgnores
      },
      rules: {
        'no-console': true
      }
    })
  })

  it('can have default rules removed from the config', () => {
    const options = {
      typescript: true,
      rules: { 'prefer-const': 'off' }
    }
    const config = getTSLintConfig(options)
    expect(config).toEqual({
      extends: ['tslint-config-lynt'],
      linterOptions: {
        exclude: defaultIgnores
      },
      rules: {
        'prefer-const': false
      }
    })
  })

  it('ignores style rules that the user tries to add to the config', () => {
    const options = {
      typescript: true,
      rules: {
        semicolon: 'on',
        'no-console': 'on'
      }
    }
    const config = getTSLintConfig(options)
    expect(config).toEqual({
      extends: ['tslint-config-lynt'],
      linterOptions: {
        exclude: defaultIgnores
      },
      rules: {
        'no-console': true
      }
    })
  })

  it('can have additional ignores added to the config', () => {
    const options = {
      typescript: true,
      ignore: ['**/blah/**']
    }
    const config = getTSLintConfig(options)
    expect(config).toEqual({
      extends: ['tslint-config-lynt'],
      linterOptions: {
        exclude: [...defaultIgnores, '**/blah/**']
      }
    })
  })
})

describe('getTSLintIgnores()', () => {
  it('has base ignores by default', () => {
    const ignores = getTSLintIgnores()
    expect(ignores).toEqual([
      '**/node_modules/**',
      '**/bower_components/**',
      '{tmp,temp}/**',
      '{test,tests,spec,__tests__}/fixture{s,}/**',
      'fixture{-*,}.{js,jsx,ts,tsx}',
      'fixture{s,}/**',
      'vendor/**',
      'dist/**',
      'coverage/**',
    ])
  })

  it('can add additional ignores', () => {
    const ignores = getTSLintIgnores(['blah/**', 'foo.ts'])
    expect(ignores).toEqual([
      '**/node_modules/**',
      '**/bower_components/**',
      '{tmp,temp}/**',
      '{test,tests,spec,__tests__}/fixture{s,}/**',
      'fixture{-*,}.{js,jsx,ts,tsx}',
      'fixture{s,}/**',
      'vendor/**',
      'dist/**',
      'coverage/**',
      'blah/**',
      'foo.ts'
    ])
  })
})
