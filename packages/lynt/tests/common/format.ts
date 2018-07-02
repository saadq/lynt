import stripAnsi from 'strip-ansi'
import { format } from '../../src'

describe('format', () => {
  it('should print a message on success', () => {
    const lyntResults = []
    const output = stripAnsi(format(lyntResults))
    const expected = `
✔ No lynt errors
`
    expect(output).toBe(expected)
  })

  it('should print a table on errors', () => {
    const lyntResults = [
      {
        filePath: 'foo.js',
        errors: [
          {
            ruleName: 'no-undef',
            message: "'foo' is not defined.",
            line: 346,
            endLine: 346,
            column: 4,
            endColumn: 13
          }
        ],
        errorCount: 1,
        fixCount: 0
      },
      {
        filePath: 'bar.js',
        errors: [
          {
            ruleName: 'no-unused-vars',
            message: "'bar' is assigned a value but never used.",
            line: 5,
            endLine: 5,
            column: 5,
            endColumn: 14
          },
          {
            ruleName: 'radix',
            message: 'Missing radix parameter.',
            line: 15,
            endLine: 15,
            column: 22,
            endColumn: 49
          }
        ],
        errorCount: 2,
        fixCount: 0
      }
    ]

    const output = stripAnsi(format(lyntResults))

    const expected = `
foo.js
  346:4  'foo' is not defined.  no-undef

bar.js
  5:5    'bar' is assigned a value but never used.  no-unused-vars
  15:22  Missing radix parameter.                   radix

✖ 3 lynt errors
`

    expect(output).toBe(expected)
  })
})
