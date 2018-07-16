import { spawnSync } from 'child_process'
import { chmodSync, existsSync, unlinkSync, readFileSync } from 'fs'
import { join } from 'path'

describe('cli', () => {
  const CMD = join(__dirname, '..', 'lib', 'cli.js')

  beforeAll(() => {
    const READ_WRITE_EXECUTE = 0o777
    chmodSync(CMD, READ_WRITE_EXECUTE)
  })

  it('can print a help message', () => {
    const args = ['--help']
    const results = spawnSync(CMD, args).stdout.toString()
    expect(results).toContain('A zero config JavaScript linter')
    expect(results).toContain('Usage')
    expect(results).toContain('Options')
    expect(results).toContain('JavaScript Examples')
    expect(results).toContain('TypeScript Examples')
  })

  describe('eslint', () => {
    const configFile = 'eslintrc.json'
    const ignoreFile = '.eslintignore'
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

    afterEach(() => {
      if (existsSync(configFile)) {
        unlinkSync(configFile)
      }

      if (existsSync(ignoreFile)) {
        unlinkSync(ignoreFile)
      }
    })

    it('can create a config file and ignore file with --exportConfig', () => {
      const args = ['--exportConfig']
      const results = spawnSync(CMD, args).stdout.toString()

      expect(results).toContain('✔ eslintrc.json generated')
      expect(results).toContain('✔ .eslintignore generated')
      expect(existsSync(configFile)).toBe(true)
      expect(existsSync(ignoreFile)).toBe(true)

      const eslintConfig = JSON.parse(readFileSync(configFile, 'utf8'))
      expect(eslintConfig.extends).toEqual(['lynt'])

      const eslintIgnores = readFileSync(ignoreFile, 'utf8')
      expect(eslintIgnores.split('\n')).toEqual(defaultIgnores)
    })

    it('can add additional options and ignores to --exportConfig', () => {
      const args = ['--react', '--ignore', '**/1.js', '--exportConfig']
      const results = spawnSync(CMD, args).stdout.toString()

      expect(results).toContain('✔ eslintrc.json generated')
      expect(results).toContain('✔ .eslintignore generated')
      expect(existsSync(configFile)).toBe(true)
      expect(existsSync(ignoreFile)).toBe(true)

      const eslintConfig = JSON.parse(readFileSync(configFile, 'utf8'))
      expect(eslintConfig).toEqual({ extends: ['lynt', 'lynt-react'] })

      const eslintIgnores = readFileSync(ignoreFile, 'utf8')
      expect(eslintIgnores.split('\n')).toEqual([...defaultIgnores, '**/1.js'])
    })
  })

  describe('tslint', () => {
    const configFile = 'tslint.json'
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

    afterEach(() => {
      if (existsSync(configFile)) {
        unlinkSync(configFile)
      }
    })

    it('can create a config file with --exportConfig', () => {
      const args = ['--typescript', '--exportConfig']
      const results = spawnSync(CMD, args).stdout.toString()

      expect(results).toContain('✔ tslint.json generated')
      expect(existsSync(configFile)).toBe(true)

      const tslintConfig = JSON.parse(readFileSync(configFile, 'utf8'))
      expect(tslintConfig).toEqual({
        extends: ['tslint-config-lynt'],
        linterOptions: { exclude: defaultIgnores }
      })
    })

    it('can add additional options and ignores to --exportConfig', () => {
      const args = [
        '--typescript',
        '--project',
        '.',
        '--ignore',
        '**/1.js',
        '--exportConfig'
      ]
      const results = spawnSync(CMD, args).stdout.toString()

      expect(results).toContain('✔ tslint.json generated')
      expect(existsSync(configFile)).toBe(true)

      const tslintConfig = JSON.parse(readFileSync(configFile, 'utf8'))
      expect(tslintConfig).toEqual({
        extends: ['tslint-config-lynt', 'tslint-config-lynt-typed'],
        linterOptions: {
          exclude: [...defaultIgnores, '**/1.js']
        }
      })
    })
  })
})
