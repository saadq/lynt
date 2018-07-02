import { CLIEngine } from 'eslint'
import { readdirSync } from 'fs'
import { join } from 'path'
import eslint from '../../src/eslint'

describe('eslint', () => {
  it('can lint js files with base config', () => {
    const filesToLint = join(__dirname, 'files-to-lint', 'no-unused-vars.js')
    const options = {}
    const results = eslint([filesToLint], options)
    expect(results.length).toBe(1)
    expect(results[0].errorCount).toBe(1)
    expect(results[0].errors[0].ruleName).toBe('no-unused-vars')
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
    expect(results[0].errors[0].ruleName).toBe('react/require-render-return')
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
    expect(results[0].errors[0].ruleName).toBe(
      'flowtype/no-types-missing-file-annotation'
    )
    expect(results[0].errors[1].ruleName).toBe(
      'flowtype/no-types-missing-file-annotation'
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
    expect(results[0].errorCount).toBe(2)
    expect(results[0].errors[0].ruleName).toBe('flowtype/no-dupe-keys')
    expect(results[0].errors[1].ruleName).toBe('react/no-string-refs')
  })
})
