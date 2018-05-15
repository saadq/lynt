import lynt, { format } from '../src'
import { join } from 'path'

describe('api', () => {
  it('should be able to lint this source code', () => {
    const options = {
      typescript: true,
      project: join(__dirname, '..')
    }

    const results = lynt([], options)

    expect(results.length).toBe(0)
    console.log(`Linting source code... ${format(results)}`)
  })

  it('should be able to lint typescript files', () => {
    const options = {
      typescript: true
    }

    const files = join(__dirname, 'ts-files', 'prefer-const.ts')
    const results = lynt(files, options)
    const error = results[0]

    expect(results.length).toBe(1)
    expect(error.errorCount).toBe(1)
    expect(error.errors[0].ruleName).toBe('prefer-const')
  })

  it('should be able to lint javascript files', () => {
    const files = join(__dirname, 'js-files', 'prefer-const.js')
    const results = lynt(files)
    const error = results[0]

    expect(results.length).toBe(1)
    expect(error.errorCount).toBe(1)
    expect(error.errors[0].ruleName).toBe('prefer-const')
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

  it('should be able to lint javascript/react/flow files', () => {
    const files = join(__dirname, 'js-files', 'react-flow.js')
    const options = {
      react: true,
      flow: true
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
