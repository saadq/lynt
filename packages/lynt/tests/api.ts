import lynt, { format } from '../src'
import { join } from 'path'

describe('api', () => {
  it('should be able to lint this source code', () => {
    const options = {
      typescript: true,
      project: join(__dirname, '..')
    }

    const results = lynt([], options)

    console.log(`Linting source code... ${format(results)}`)
    expect(results.length).toBe(0)
  })

  it('should be able to lint typescript files', () => {
    const options = {
      typescript: true
    }

    const files = join(__dirname, 'ts-files', 'prefer-const.ts')
    const results = lynt(files, options)
    const result = results[0]

    expect(results.length).toBe(1)
    expect(result.errorCount).toBe(1)
    expect(result.errors[0].ruleName).toBe('prefer-const')
  })

  it('should be able to lint typescript/react files', () => {
    const options = {
      typescript: true,
      react: true
    }

    const files = join(__dirname, 'ts-files', 'react.tsx')
    const results = lynt(files, options)
    const result = results[0]
    const [typescriptErr, reactErr] = result.errors

    expect(results.length).toBe(1)
    expect(result.errorCount).toBe(2)
    expect(typescriptErr.ruleName).toBe('ban-types')
    expect(reactErr.ruleName).toBe('jsx-no-string-ref')
  })

  it('should be able to lint javascript files', () => {
    const files = join(__dirname, 'js-files', 'prefer-const.js')
    const results = lynt(files)
    const result = results[0]

    expect(results.length).toBe(1)
    expect(result.errorCount).toBe(1)
    expect(result.errors[0].ruleName).toBe('prefer-const')
  })

  it('should be able to lint javascript/flow files', () => {
    const files = join(__dirname, 'js-files', 'flow.js')
    const options = {
      flow: true
    }

    const results = lynt(files, options)
    const result = results[0]

    expect(results.length).toBe(1)
    expect(result.errorCount).toBe(1)
    expect(result.errors[0].ruleName).toBe('flowtype/no-dupe-keys')
  })

  it('should be able to lint javascript/react files', () => {
    const files = join(__dirname, 'js-files', 'react.js')
    const options = {
      react: true
    }

    const results = lynt(files, { react: true })
    const result = results[0]

    expect(results.length).toBe(1)
    expect(result.errorCount).toBe(1)
    expect(result.errors[0].ruleName).toBe('react/react-in-jsx-scope')
  })

  it('should be able to lint javascript/flow/react files', () => {
    const files = join(__dirname, 'js-files', 'flow-react.js')
    const options = {
      flow: true,
      react: true
    }

    const results = lynt(files, options)
    const result = results[0]
    const [flowErr, reactErr] = result.errors

    expect(results.length).toBe(1)
    expect(result.errorCount).toBe(2)
    expect(flowErr.ruleName).toBe('flowtype/no-primitive-constructor-types')
    expect(reactErr.ruleName).toBe('react/no-string-refs')
  })
})
