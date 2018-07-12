import { join } from 'path'
import lynt, { format } from '../src'
import { errResultsToHaveRuleName } from './fixtures'

describe('lynt', () => {
  it('can lint itself', () => {
    const options = {
      typescript: true,
      project: join(__dirname, '..')
    }

    const results = lynt([], options)

    console.log(`Linting source code... ${format(results)}`)
    expect(results.length).toBe(0)
  })

  describe('eslint', () => {
    it('can lint js files with base config', () => {
      const filesToLint = join(
        __dirname,
        'eslint',
        'files-to-lint',
        'no-unused-vars.js'
      )
      const results = lynt([filesToLint])
      expect(results.length).toBe(1)
      expect(results[0].errorCount).toBe(1)
      expect(errResultsToHaveRuleName(results, 'no-unused-vars')).toBe(true)
    })

    it('can lint files with additional react rules', () => {
      const filesToLint = join(
        __dirname,
        'eslint',
        'files-to-lint',
        'react-require-render-return.js'
      )
      const options = { react: true }
      const results = lynt([filesToLint], options)
      expect(results.length).toBe(1)
      expect(results[0].errorCount).toBe(1)
      expect(
        errResultsToHaveRuleName(results, 'react/require-render-return')
      ).toBe(true)
    })

    it('can lint files with additional flow rules', () => {
      const filesToLint = join(
        __dirname,
        'eslint',
        'files-to-lint',
        'flowtype-no-types-missing-file-annotation.js'
      )
      const options = { flow: true }
      const results = lynt([filesToLint], options)
      expect(results.length).toBe(1)
      expect(results[0].errorCount).toBe(2)
      expect(
        errResultsToHaveRuleName(
          results,
          'flowtype/no-types-missing-file-annotation'
        )
      )
    })

    it('can lint files with additional react and flow rules', () => {
      const filesToLint = join(
        __dirname,
        'eslint',
        'files-to-lint',
        'react-flow-combination.js'
      )
      const options = { flow: true, react: true }
      const results = lynt([filesToLint], options)
      expect(results.length).toBe(1)
      expect(errResultsToHaveRuleName(results, 'flowtype/no-dupe-keys')).toBe(
        true
      )
      expect(errResultsToHaveRuleName(results, 'react/no-string-refs')).toBe(
        true
      )
    })

    it('can ignore files', () => {
      const filesToLint = join(
        __dirname,
        'eslint',
        'files-to-lint',
        'react-flow-combination.js'
      )
      const options = {
        flow: true,
        react: true,
        ignore: 'react-flow-combination.js'
      }
      const results = lynt([filesToLint], options)
      expect(results.length).toBe(0)
    })
  })

  describe('tslint', () => {
    it('can lint ts files with base config', () => {
      const fileToLint = join(__dirname, 'tslint', 'files-to-lint', 'curly.ts')
      const options = { typescript: true }
      const results = lynt([fileToLint], options)
      expect(results.length).toBe(1)
      expect(results[0].errorCount).toBe(1)
      expect(errResultsToHaveRuleName(results, 'curly')).toBe(true)
    })

    it('can lint files with react rules', () => {
      const fileToLint = join(
        __dirname,
        'tslint',
        'files-to-lint',
        'jsx-no-string-ref.tsx'
      )
      const options = { typescript: true, react: true }
      const results = lynt([fileToLint], options)
      expect(results.length).toBe(1)
      expect(results[0].errorCount).toBe(1)
      expect(errResultsToHaveRuleName(results, 'jsx-no-string-ref')).toBe(true)
    })

    it('can lint files with additional typechecking rules', () => {
      const project = join(__dirname, 'tslint', 'files-to-lint', 'project')
      const options = { typescript: true, project }
      const results = lynt([], options)
      expect(errResultsToHaveRuleName(results, 'curly')).toBe(true)
      expect(errResultsToHaveRuleName(results, 'no-unused-variable')).toBe(true)
    })

    it('can lint files with additional typechecking react rules', () => {
      const project = join(
        __dirname,
        'tslint',
        'files-to-lint',
        'react-project'
      )
      const options = { typescript: true, react: true, project }
      const results = lynt([], options)
      expect(errResultsToHaveRuleName(results, 'curly')).toBe(true)
      expect(errResultsToHaveRuleName(results, 'jsx-no-string-ref')).toBe(true)
      expect(errResultsToHaveRuleName(results, 'no-unused-variable')).toBe(true)
      expect(
        errResultsToHaveRuleName(results, 'react-anchor-blank-noopener')
      ).toBe(true)
    })

    it('can ignore files', () => {
      const project = join(
        __dirname,
        'tslint',
        'files-to-lint',
        'react-project'
      )
      const options = {
        typescript: true,
        react: true,
        project,
        ignore: '**/curly.ts'
      }
      const results = lynt([], options)
      expect(errResultsToHaveRuleName(results, 'curly')).toBe(false)
      expect(errResultsToHaveRuleName(results, 'jsx-no-string-ref')).toBe(true)
      expect(errResultsToHaveRuleName(results, 'no-unused-variable')).toBe(true)
      expect(
        errResultsToHaveRuleName(results, 'react-anchor-blank-noopener')
      ).toBe(true)
    })
  })
})
