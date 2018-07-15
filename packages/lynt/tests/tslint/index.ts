import { join } from 'path'
import tslint from '../../src/tslint'
import { errResultsHaveRuleName } from '../fixtures'

describe('tslint', () => {
  it('can lint ts files with base config', () => {
    const fileToLint = join(__dirname, 'files-to-lint', 'curly.ts')
    const options = { typescript: true }
    const results = tslint([fileToLint], options)
    expect(results.length).toBe(1)
    expect(results[0].errorCount).toBe(1)
    expect(errResultsHaveRuleName(results, 'curly')).toBe(true)
  })

  it('can lint files with react rules', () => {
    const fileToLint = join(__dirname, 'files-to-lint', 'jsx-no-string-ref.tsx')
    const options = { typescript: true, react: true }
    const results = tslint([fileToLint], options)
    expect(results.length).toBe(1)
    expect(results[0].errorCount).toBe(1)
    expect(errResultsHaveRuleName(results, 'jsx-no-string-ref')).toBe(true)
  })

  it('can lint files with additional typechecking rules', () => {
    const project = join(__dirname, 'files-to-lint', 'project')
    const options = { typescript: true, project }
    const results = tslint([], options)
    expect(errResultsHaveRuleName(results, 'curly')).toBe(true)
    expect(errResultsHaveRuleName(results, 'no-unused-variable')).toBe(true)
  })

  it('can lint files with additional typechecking react rules', () => {
    const project = join(__dirname, 'files-to-lint', 'react-project')
    const options = { typescript: true, react: true, project }
    const results = tslint([], options)
    expect(errResultsHaveRuleName(results, 'curly')).toBe(true)
    expect(errResultsHaveRuleName(results, 'jsx-no-string-ref')).toBe(true)
    expect(errResultsHaveRuleName(results, 'no-unused-variable')).toBe(true)
    expect(errResultsHaveRuleName(results, 'react-anchor-blank-noopener')).toBe(
      true
    )
  })

  it('can ignore files', () => {
    const project = join(__dirname, 'files-to-lint', 'react-project')
    const options = {
      typescript: true,
      react: true,
      project,
      ignore: '**/curly.ts'
    }
    const results = tslint([], options)
    expect(errResultsHaveRuleName(results, 'curly')).toBe(false)
    expect(errResultsHaveRuleName(results, 'jsx-no-string-ref')).toBe(true)
    expect(errResultsHaveRuleName(results, 'no-unused-variable')).toBe(true)
    expect(errResultsHaveRuleName(results, 'react-anchor-blank-noopener')).toBe(
      true
    )
  })
})
