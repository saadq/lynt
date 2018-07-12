import { join, dirname } from 'path'
import eslint from '../../src/eslint'
import { errResultsToHaveRuleName } from '../fixtures'

describe('eslint', () => {
  it('can lint js files with base config', () => {
    const filesToLint = join(__dirname, 'files-to-lint', 'no-unused-vars.js')
    const options = {}
    const results = eslint([filesToLint], options)
    expect(results.length).toBe(1)
    expect(results[0].errorCount).toBe(1)
    expect(errResultsToHaveRuleName(results, 'no-unused-vars')).toBe(true)
  })

  it('can lint files with additional react rules', () => {
    const filesToLint = join(
      __dirname,
      'files-to-lint',
      'react-require-render-return.js'
    )
    const options = { react: true }
    const results = eslint([filesToLint], options)
    expect(results.length).toBe(1)
    expect(results[0].errorCount).toBe(1)
    expect(
      errResultsToHaveRuleName(results, 'react/require-render-return')
    ).toBe(true)
  })

  it('can lint files with additional flow rules', () => {
    const filesToLint = join(
      __dirname,
      'files-to-lint',
      'flowtype-no-types-missing-file-annotation.js'
    )
    const options = { flow: true }
    const results = eslint([filesToLint], options)
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
      'files-to-lint',
      'react-flow-combination.js'
    )
    const options = { flow: true, react: true }
    const results = eslint([filesToLint], options)
    expect(results.length).toBe(1)
    expect(errResultsToHaveRuleName(results, 'flowtype/no-dupe-keys')).toBe(
      true
    )
    expect(errResultsToHaveRuleName(results, 'react/no-string-refs')).toBe(true)
  })

  it('can ignore files', () => {
    const filesToLint = join(
      __dirname,
      'files-to-lint',
      'react-flow-combination.js'
    )
    const options = {
      flow: true,
      react: true,
      ignore: 'react-flow-combination.js'
    }
    const results = eslint([filesToLint], options)
    expect(results.length).toBe(0)
  })
})
